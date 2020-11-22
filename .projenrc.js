const { AwsCdkConstructLibrary } = require('projen');

const project = new AwsCdkConstructLibrary({
  authorAddress: "pahudnet@gmail.com",
  authorName: "Pahud",
  cdkVersion: "1.73.0",
  name: "awscdk-run",
  repository: "https://github.com/pahud/awscdk-run.git",
  cdkDependencies: [
    '@aws-cdk/core',
    '@aws-cdk/aws-codebuild',
    '@aws-cdk/aws-iam',
    '@aws-cdk/custom-resources',
  ],
  dependabot: false,
  releaseBranches: ['main'],
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'images', 'yarn-error.log'];
project.npmignore.exclude(...common_exclude);
project.gitignore.exclude(...common_exclude);

project.synth();
