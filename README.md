# awscdk-run

1-Click AWS CDK Deploy like CloudFormation.

# Click the button and try it

[![awscdk-run](https://img.shields.io/badge/Deploy%20with-AWSCDK.RUN-blue)](https://awscdk.run)


# Generate the Cloud Assembly

The following sample generates the cloud assembly for the cloudformation template of **AWSCDK.RUN**

```ts
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
```

# Deploy once

Run `yarn watch` in the 2nd terminal. This will generate `ROOT/lib/integ.default.js`.

Deploy it for the first time.

```sh
npx cdk --app lib/integ.default.js diff --parameters stackName=demo --parameters githubRepoName=pahud/aws-cdk-fargate-samplenpx cdk --app lib/integ.default.js deploy --parameters stackName=demo --parameters githubRepoName=pahud/aws-cdk-fargate-sample
```

Now the cloud assembly will be published in your private staging bucket defined in `CDKToolKit`.


# copy your assets and cloud assembly for public read

```sh
aws s3 cp cdk.out/cdk-run-demo-stack.template.json s3://{YOUR_AWSCDKRUN_BUCKET}/public/ --acl=public-read
aws s3 cp s3://{YOUR_PRIVATE_STAGING_BUCKET}/assets/xxxxxxx.zip s3://{YOUR_AWSCDKRUN_BUCKET}/public/assets/ --acl=public-read
```


# Update the cloud assembly

Update `cdk.out/cdk-run-demo-stack.template.json` with the following `Parameters`. Make sure 

1. all of them have the `Default` values.
2. replace `4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956` with yur asset hash 
3. replace `{YOUR_AWSCDKRUN_BUCKET}` with your bucket name(not your cdk staging bucket name)


```json
  "Parameters": {
    "githubRepoName": {
      "Type": "String",
      "Default": "pahud/aws-cdk-serverless-sample",
      "Description": "The name github repo e.g. pahud/aws-cdk-serverless-sample"
    },
    "stackName": {
      "Type": "String",
      "Default": "",
      "Description": "Custom stack name for the CDK stack to deploy"
    },
    "AssetParameters4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956S3Bucket72B03BC9": {
      "Type": "String",
      "Description": "S3 bucket for asset \"4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956\"",
      "Default": "{YOUR_AWSCDKRUN_BUCKET}"
    },
    "AssetParameters4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956S3VersionKey520B7554": {
      "Type": "String",
      "Description": "S3 key for asset version \"4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956\"",
      "Default": "public/assets/||4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956.zip"
    },
    "AssetParameters4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956ArtifactHashD15A2D11": {
      "Type": "String",
      "Description": "Artifact hash for asset \"4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956\"",
      "Default": "4a3609ad912843e581892f37ae9d6fb0fa1648b547693aaa562b0119452b8956"
    }
  },
```

# Prepare your cloudformation entry URL

Open AWS S3 console and copy the public URL of the `cdk-run-demo-stack.template.json` under `{YOUR_AWSCDKRUN_BUCKET}/public/assets/`, for example in my case the URL is


https://awscdkrun.s3-ap-northeast-1.amazonaws.com/public/cdk-run-demo-stack.template.json



And then your cloudformation entry URL would be

https://console.aws.amazon.com/cloudformation/home#/stacks/new?stackName=awscdk-run-stack&templateURL=https://awscdkrun.s3-ap-northeast-1.amazonaws.com/public/cdk-run-demo-stack.template.json
