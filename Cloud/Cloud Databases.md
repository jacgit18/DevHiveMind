---
tags:
  - databases
  - cloud
author:
  - jacgit18
  - chatgpt
Purpose: This documentation discusses cloud databases.
Status: Done
Started: 
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---
![[Aws DB services.png]]

When navigating the realm of databases in AWS, there exist various approaches. 

![[Purpose built DB.png]]
Cloud databases are categorized into different service models within cloud computing:

1. **[[Benefits of cloud#SAAS |SAAS]] (Software as a Service):** Cloud databases under SaaS typically provide storage and data analytical tools. Users access these services through a web interface, and the provider manages infrastructure, maintenance, and updates.

2. **[[Benefits of cloud#IAAS |IAAS]] (Infrastructure as a Service):** In the IaaS model, cloud databases offer storage without integrated data analytical tools. Users have more control over the infrastructure but are responsible for managing aspects like security and updates.

3. **[[Benefits of cloud#PAAS |PAAS]] (Platform as a Service):** Cloud databases under PaaS fall in between, providing storage along with additional functionality. The platform takes care of infrastructure management, and users focus more on application development.

The benefits of cloud databases include performance at scale, security, high availability, and full management by the cloud provider. Additionally, they grant access to other cloud services, such as AWS CloudTrail, which aids in governance, compliance, and auditing of AWS account activities, ensuring operational transparency and risk management.

When opting for the Infrastructure as a Service (IaaS) approach, you have the flexibility to utilize an EC2 instance and deploy your preferred database directly onto it. This grants you greater control over configuration and customization aspects.
![[DB premises.png]]

Alternatively, you can adopt more of a Software as a Service (SaaS) approach, where your focus shifts towards optimizing and configuring your application, rather than managing the underlying infrastructure. This can be achieved by leveraging managed services such as RDS or DynamoDB, allowing you to offload the operational overhead of database management to AWS.
![[Benefits of Managed DB.png]]


