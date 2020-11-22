import * as cdk from '@aws-cdk/core';
import * as cdkrun from './index';


export class IntegTesting {
  readonly stack: cdk.Stack[];
  constructor() {
    const app = new cdk.App();

    const env = {
      region: process.env.CDK_DEFAULT_REGION,
      account: process.env.CDK_DEFAULT_ACCOUNT,
    };

    const stack = new cdk.Stack(app, 'cdk-run-demo-stack', { env });

    const repoName = new cdk.CfnParameter(stack, 'githubRepoName', {
      type: 'String',
      description: 'The name github repo e.g. pahud/aws-cdk-serverless-sample',
      default: 'pahud/aws-cdk-serverless-sample',
    });

    const customStackName = new cdk.CfnParameter(stack, 'stackName', {
      type: 'String',
      description: 'Custom stack name for the CDK stack to deploy',
      default: '',
    });

    new cdkrun.CodeBuildProject(stack, 'CDKRunDemoProject', {
      github: repoName.valueAsString,
      customStackName: customStackName.valueAsString,
    });

    this.stack = [stack];

  }
}


new IntegTesting();


