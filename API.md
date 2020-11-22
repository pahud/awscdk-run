# API Reference

**Classes**

Name|Description
----|-----------
[CodeBuildProject](#awscdk-run-codebuildproject)|CodeBuid Project.
[StartBuild](#awscdk-run-startbuild)|Custom resource to start the CodeBuild project.


**Structs**

Name|Description
----|-----------
[CodeBuildProjectProps](#awscdk-run-codebuildprojectprops)|Construct properties for CodeBuildProject.
[StartBuildProps](#awscdk-run-startbuildprops)|Construct properties for StartBuild.



## class CodeBuildProject  <a id="awscdk-run-codebuildproject"></a>

CodeBuid Project.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new CodeBuildProject(scope: Construct, id: string, props: CodeBuildProjectProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[CodeBuildProjectProps](#awscdk-run-codebuildprojectprops)</code>)  *No description*
  * **github** (<code>string</code>)  e.g. pahud/aws-cdk-serverless-sample. 
  * **customStackName** (<code>string</code>)  custom stack name for the cdk stack to deploy. __*Optional*__
  * **role** (<code>[IRole](#aws-cdk-aws-iam-irole)</code>)  IAM role for the project. __*Default*__: create a new role
  * **starBuild** (<code>boolean</code>)  whether to start the build immediately. __*Default*__: true



### Properties


Name | Type | Description 
-----|------|-------------
**project** | <code>[IProject](#aws-cdk-aws-codebuild-iproject)</code> | <span></span>



## class StartBuild  <a id="awscdk-run-startbuild"></a>

Custom resource to start the CodeBuild project.

__Implements__: [IConstruct](#constructs-iconstruct), [IConstruct](#aws-cdk-core-iconstruct), [IConstruct](#constructs-iconstruct), [IDependable](#aws-cdk-core-idependable)
__Extends__: [Construct](#aws-cdk-core-construct)

### Initializer




```ts
new StartBuild(scope: Construct, id: string, props: StartBuildProps)
```

* **scope** (<code>[Construct](#aws-cdk-core-construct)</code>)  *No description*
* **id** (<code>string</code>)  *No description*
* **props** (<code>[StartBuildProps](#awscdk-run-startbuildprops)</code>)  *No description*
  * **project** (<code>[IProject](#aws-cdk-aws-codebuild-iproject)</code>)  The codebuild project to start. 




## struct CodeBuildProjectProps  <a id="awscdk-run-codebuildprojectprops"></a>


Construct properties for CodeBuildProject.



Name | Type | Description 
-----|------|-------------
**github** | <code>string</code> | e.g. pahud/aws-cdk-serverless-sample.
**customStackName**? | <code>string</code> | custom stack name for the cdk stack to deploy.<br/>__*Optional*__
**role**? | <code>[IRole](#aws-cdk-aws-iam-irole)</code> | IAM role for the project.<br/>__*Default*__: create a new role
**starBuild**? | <code>boolean</code> | whether to start the build immediately.<br/>__*Default*__: true



## struct StartBuildProps  <a id="awscdk-run-startbuildprops"></a>


Construct properties for StartBuild.



Name | Type | Description 
-----|------|-------------
**project** | <code>[IProject](#aws-cdk-aws-codebuild-iproject)</code> | The codebuild project to start.



