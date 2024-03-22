---
tags:
  - devops
  - deployment
  - systemDesign
author:
  - jacgit18
  - chatgpt
Purpose: This documentation discusses Deployment Strategies.
Status: Done
Started: 
EditDate: 2024-03-22
Relates: 
Peer Reviewed: 0
dg-publish:
---
![[Deployment Patterns.jpeg]]

When deploying a codebase, selecting the appropriate deployment strategy hinges on factors such as the application's architecture, development practices, team requirements, and infrastructure capabilities. Deployment patterns automate the introduction of new features to users, influencing downtime and the ability to roll out additional functionality. Some patterns enable feature testing with a select user group before a broader release. Options for deployment patterns include:

1. **[[Continuous Integration]]**: CI focuses on automating the integration of code changes from multiple developers into a shared repository (e.g., Git) multiple times a day. Each code change triggers an automated build process, compiling the code, running automated tests, and generating build artifacts (e.g., binaries, Docker images). The primary goal is to detect integration errors and bugs early in development, enabling swift issue resolution and maintaining a stable codebase. CI relies on automation to streamline build, test, and validation processes, ensuring thorough testing and validation of code changes before integration.

2. **Continuous Deployment**: CD extends the CI process by automating the deployment of code changes to production environments after passing the CI process. CD aims to streamline the release process, allowing organizations to deliver new features and updates to users quickly and frequently. Continuous Deployment typically involves deploying changes to production environments automatically or with minimal manual intervention, reducing the time and effort required to release software.

3. **CI/CD**: CI/CD is the combining of continuous integration and deployment, where code changes are continuously integrated, tested, and deployed to production. It involves using automated build, test, and deployment pipelines to ensure that every code change is thoroughly validated before being deployed.

4. **Manual Deployment**: In a manual deployment process, code changes are deployed to the production environment manually by a developer or operations team member. This typically involves following a set of deployment instructions or running scripts to deploy the application.

5. **[[Staged Deployment]]**: Staged deployment involves deploying the codebase in multiple stages or environments, such as development, testing, staging, and production. Each stage serves a specific purpose, such as testing new features, validating performance, or simulating production conditions. Code changes are deployed to each stage sequentially, allowing for thorough testing and validation before reaching the production environment.

6. **𝗕𝗹𝘂𝗲/𝗴𝗿𝗲𝗲𝗻 𝗱𝗲𝗽𝗹𝗼𝘆𝗺𝗲𝗻𝘁𝘀**:  Here we have run two similar environments simultaneously lowering risk and downtime. These surroundings are referred to be blue and green. Only one of the environments is active at any given moment. A router or load balancer that aids in traffic control is used in a blue-green implementation. The blue-green deployment also provides a quick means of performing a rollback. We switch the router back to the blue environment if anything goes wrong in the green environment.  

7. **𝗖𝗮𝗻𝗮𝗿𝘆 𝗿𝗲𝗹𝗲𝗮𝘀𝗲𝘀**  A canary release is a method of spotting possible issues before they affect all consumers. Before making a new feature available to everyone, the plan is to only show it to a select group of users. In a canary release, we keep an eye on what transpires after the feature is made available. If there are issues with the release, we fix them. We transfer the canary release to the actual production environment once its stability has been established.  


8. **Canary Deployment**: Canary deployment is a strategy where a small percentage of the production traffic is routed to the new code changes or features while the majority of the traffic still goes to the existing stable version. This approach allows for gradual testing and validation of new changes in production and minimizes the impact in case of any issues.

9. **𝗙𝗲𝗮𝘁𝘂𝗿𝗲 𝘁𝗼𝗴𝗴𝗹𝗲𝘀**  Here we can turn a switch on/off with feature toggles at runtime. We may roll out new software without exposing our users to any other brand-new or modified functionality. When we build a new functionality we can use feature toggles to enable continuous deployments, by splitting releases from deployments.  

10. **𝗔/𝗕 𝘁𝗲𝘀𝘁𝗶𝗻𝗴**  Two versions of an app are compared using A/B testing to see which one performs better. An experiment is like A/B testing. In A/B testing, we present users with two or more page versions at random. Then, we use statistical analysis to determine which variant is more effective in achieving our objectives.  

11. **𝗗𝗮𝗿𝗸 𝗹𝗮𝘂𝗻𝗰𝗵𝗲𝘀**  In a "dark launch," we introduce a new feature to a select group of users rather than the general public. These users are unaware that they are helping us test the functionality. We don't even point out the new functionality to them. It is nicknamed a "dark launch" for this reason. Users are introduced to the program so that we can get feedback and test its effectiveness.


These deployment strategies can be combined or customized based on the specific needs and requirements of the project. It's important to consider factors such as scalability, performance, reliability, and risk management when selecting the appropriate deployment strategy for a codebase.


## Flashcard
#deploymentKnowledge
What the difference between Continuous Deployment and CI/CD;; automation