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
In AWS Identity and Access Management (IAM) policies, the **Principal** is the entity that is allowed or denied access to a resource. It defines **who** (user, role, account, or service) is making a request to AWS.  
  
### Types of Principals in AWS Policies:  
1. **AWS Account** – An entire AWS account (`arn:aws:iam::123456789012:root`).  
2. **IAM Users and Roles** – Specific IAM users or roles (`arn:aws:iam::123456789012:user/Alice`).  
3. **AWS Services** – AWS services acting on behalf of users (e.g., `[ec2.amazonaws.com](http://ec2.amazonaws.com/)`).  
4. **Federated Identities** – External users authenticated via Amazon Cognito or IAM federation.  
  
### Example 1: Principal as an AWS Account  
```json  
{  
"Effect": "Allow",  
"Principal": {  
"AWS": "arn:aws:iam::123456789012:root"  
},  
"Action": "s3:PutObject",  
"Resource": "arn:aws:s3:::my-bucket/*"  
}  
```  
This allows the entire AWS account `123456789012` to upload objects to `my-bucket`.  
  
### Example 2: Principal as a Specific IAM Role  
```json  
{  
"Effect": "Allow",  
"Principal": {  
"AWS": "arn:aws:iam::123456789012:role/MyRole"  
},  
"Action": "s3:GetObject",  
"Resource": "arn:aws:s3:::my-bucket/*"  
}  
```  
This allows only the IAM role `MyRole` to read objects from `my-bucket`.  
  
### Example 3: Principal as an AWS Service  
```json  
{  
"Effect": "Allow",  
"Principal": {  
"Service": "[lambda.amazonaws.com](http://lambda.amazonaws.com/)"  
},  
"Action": "sts:AssumeRole"  
}  
```  
This allows AWS Lambda to assume a role.  
  
### Where **Principal** is Used:  
- **Resource-based Policies** (S3, SNS, SQS, Lambda, etc.).  
- **Trust Policies** (IAM roles defining who can assume them).  
- **Service Control Policies (SCPs)** (when restricting permissions at the account or organizational level).  
  
### **When to Omit Principal**  
- **IAM Policies**: No need to specify `Principal` since they apply directly to the IAM user or role.  
- **Service Control Policies (SCPs)**: Apply to all entities in an AWS Organization by default.  
  
Let me know if you need further clarification!