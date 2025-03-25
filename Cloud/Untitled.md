---
tags: 
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---
Amazon Web Services (AWS) offers a comprehensive suite of cloud services that can be categorized into various cloud computing models: Infrastructure as a Service (IaaS), Platform as a Service (PaaS), Software as a Service (SaaS), and Function as a Service (FaaS). Here's a breakdown of AWS services under each category:

## **1. Infrastructure as a Service (IaaS)**

IaaS provides virtualized computing resources over the internet, allowing users to rent infrastructure components such as servers, storage, and networking. Key AWS IaaS offerings include:

- **Amazon Elastic Compute Cloud (EC2)**: Provides scalable virtual servers for running applications.
- **Amazon Simple Storage Service (S3)**: Offers object storage with high availability and scalability.
- **Amazon Elastic Block Store (EBS)**: Provides block-level storage volumes for use with EC2 instances.
- **AWS Virtual Private Cloud (VPC)**: Allows users to provision logically isolated sections of the AWS cloud for their resources.


### **Management & Governance**

**AWS CloudFormation** → **IaaS / PaaS**
- It automates infrastructure provisioning, making it infrastructure-as-code (IaaS).

- However, it also abstracts some management, pushing it into PaaS territory.

### **Security, Identity, & Compliance**

**AWS CloudHSM** → **IaaS / PaaS**
- Provides dedicated hardware for key management (leaning toward IaaS), but AWS handles some management aspects, making it partially PaaS.


## **2. Platform as a Service (PaaS)**

PaaS offers a platform allowing customers to develop, run, and manage applications without dealing with the underlying infrastructure. AWS PaaS services include:

- **AWS Elastic Beanstalk**: Facilitates quick deployment and management of applications in various languages.
- **AWS Lambda**: Enables running code without provisioning or managing servers, automatically scaling with demand.
- **Amazon Relational Database Service (RDS)**: Simplifies setting up, operating, and scaling relational databases.

### **Management & Governance**



## **3. Software as a Service (SaaS)**

SaaS delivers software applications over the internet on a subscription basis. AWS's SaaS offerings include:

- **Amazon WorkSpaces**: Provides managed, secure Desktop-as-a-Service (DaaS) solutions.
- **Amazon Chime**: Offers communications services including voice, video, and chat.
- **Amazon QuickSight**: Delivers business intelligence (BI) services with data visualization capabilities.


### **Management & Governance**

**AWS CloudTrail** → **SaaS**
- It provides logging and auditing as a managed service with no underlying infrastructure to manage.

## **4. Function as a Service (FaaS)**

FaaS is a subset of serverless computing that allows users to execute code in response to events without managing servers. In AWS, the primary FaaS offering is:

- **AWS Lambda**: Allows running code in response to events such as changes in data or system state, automatically managing the compute fleet.



It's important to note that some AWS services can span multiple categories. For instance, **AWS Lambda** is primarily considered a FaaS offering but also fits within the broader PaaS category due to its platform capabilities.

Understanding these categories helps in selecting the appropriate AWS services to meet specific business and technical requirements.



