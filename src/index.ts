import * as codebuild from '@aws-cdk/aws-codebuild';
import * as iam from '@aws-cdk/aws-iam';
import { Construct, Fn } from '@aws-cdk/core';
import * as cr from '@aws-cdk/custom-resources';

/**
 * Construct properties for CodeBuildProject
 */
export interface CodeBuildProjectProps {
  /**
   * e.g. pahud/aws-cdk-serverless-sample
   */
  readonly github: string;
  /**
   * custom stack name for the cdk stack to deploy
   */
  readonly customStackName?: string;
  /**
   * IAM role for the project
   * @default - create a new role
   */
  readonly role?: iam.IRole;
  /**
   * whether to start the build immediately
   * @default true
   */
  readonly starBuild?: boolean;
}


/**
 * CodeBuid Project
 */
export class CodeBuildProject extends Construct {
  readonly project: codebuild.IProject;
  private githubRepo: string;
  constructor(scope: Construct, id: string, props: CodeBuildProjectProps) {
    super(scope, id);

    this.githubRepo = props.github;
    this.project = new codebuild.Project(this, 'Project', {
      source: this._addGitHubSource(),
      environment: {
        buildImage: codebuild.LinuxBuildImage.STANDARD_4_0,
        privileged: true,
        environmentVariables: {
          CUSTOM_STACK_NAME: {
            value: props.customStackName,
            type: codebuild.BuildEnvironmentVariableType.PLAINTEXT,
          },
        },
      },
      buildSpec: this._addBuildSpec(),
      role: props.role ?? this._addIamRole(),
    });

    if (props.starBuild !== false) {
      // start the build immediately
      new StartBuild(this, `StartBuild${id}`, {
        project: this.project,
      });
    }
  }
  private _addGitHubSource(): codebuild.ISource {
    return codebuild.Source.gitHub({
      owner: Fn.select(0, Fn.split('/', this.githubRepo)),
      repo: Fn.select(1, Fn.split('/', this.githubRepo)),
    });
  }

  private _addIamRole(): iam.Role {
    return new iam.Role(this, 'CodeBuildProjectRole', {
      assumedBy: new iam.ServicePrincipal('codebuild.amazonaws.com'),
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess')],
    });
  }

  private _addBuildSpec(): codebuild.BuildSpec {
    return codebuild.BuildSpec.fromObject({
      version: '0.2',
      phases: {
        install: {
          commands: [
            'yarn install',
          ],
        },
        build: {
          commands: [
            // if CUSTOM_STACK_NAME
            'if [ -n $CUSTOM_STACK_NAME ]; then npx cdk diff -c stackName="${CUSTOM_STACK_NAME}" || return 0; fi',
            'if [ -n $CUSTOM_STACK_NAME ]; then npx cdk deploy -c stackName="${CUSTOM_STACK_NAME}" --require-approval=never; fi',
            // if not CUSTOM_STACK_NAME
            'if [ -z $CUSTOM_STACK_NAME ]; then npx cdk diff || return 0; fi',
            'if [ -z $CUSTOM_STACK_NAME ]; then npx cdk deploy --require-approval=never; fi',
          ],
        },
      },
    });
  }
}

/**
 * Construct properties for StartBuild
 */
export interface StartBuildProps {
  /**
   * The codebuild project to start
   */
  readonly project: codebuild.IProject;
}

/**
 * Custom resource to start the CodeBuild project
 */
export class StartBuild extends Construct {
  constructor(scope: Construct, id: string, props: StartBuildProps) {
    super(scope, id);

    new cr.AwsCustomResource(this, 'Starter', {
      onCreate: {
        service: 'CodeBuild',
        action: 'startBuild',
        parameters: {
          projectName: props.project.projectName,
        },
        physicalResourceId: cr.PhysicalResourceId.of(props.project.projectName),
      },
      onUpdate: {
        service: 'CodeBuild',
        action: 'startBuild',
        parameters: {
          projectName: props.project.projectName,
        },
        physicalResourceId: cr.PhysicalResourceId.of(props.project.projectName),
      },
      policy: cr.AwsCustomResourcePolicy.fromSdkCalls({ resources: cr.AwsCustomResourcePolicy.ANY_RESOURCE }),
    });
  }
}
