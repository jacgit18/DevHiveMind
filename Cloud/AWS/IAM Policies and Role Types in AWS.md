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
### 1. **IAM Policies**

- **Permissions Policies**: These define what actions an IAM role can perform on which resources. These are the policies that grant permissions (e.g., `s3:GetObject` on a specific bucket).
    
- IAM policies can be **inline policies** (directly embedded within the role) or **managed policies** (either AWS managed or customer managed).


### 2. **Trust Policies**

- A **trust policy** is part of an IAM role and defines **who** can assume the role. It specifies the trusted entities (like an AWS service or another IAM role) that are allowed to assume the role and perform actions on your behalf.

- Example: The Lambda service is trusted to assume the role to invoke a Lambda function.


### 3. **Resource-Based Policies**

- These are typically applied to AWS resources like S3 buckets, SNS topics, or Lambda functions, **not IAM roles themselves**. These policies grant permissions to entities (users, services) to access the resource.
- For example, an S3 bucket can have a resource-based policy that allows a specific IAM role or user to access the objects in the bucket.


### 4. **Permissions Boundaries**

- A **permissions boundary** is an advanced feature used to limit the permissions that an IAM role or user can have. Even if an IAM policy grants a user or role wide permissions, the permissions boundary can restrict those permissions by setting the maximum allowable permissions.
- Example: You might have a permissions boundary that restricts the IAM role to only allow access to specific AWS services, regardless of the permissions defined in the role's policies.


### Hierarchy & Summary:

|Policy Type|Attached To|Defines|
|---|---|---|
|Identity-based (Permissions)|Users, Groups, Roles|What they can do with AWS resources|
|Resource-based|AWS Resources|Who can access the resource & what they can do|
|Permissions Boundary|Users, Roles|The **maximum permissions** they can have|
|Trust Policy|Roles|Who can assume the role|

- **IAM Role**: The entity that is assumed by trusted services or users.
    
    - **Trust Policy**: Defines who can assume the role.
    - **IAM Policies**: Define what actions can be performed on which resources (permissions).
    - **Permissions Boundaries**: Limit the permissions that the role can assume, even if broader permissions are granted by IAM policies.
    - **Resource-Based Policies**: These are applied to AWS resources (like S3, Lambda) and define permissions for **who** can access those resources. They aren't directly part of the role itself but work with the role's permissions.


### So in essence:

- **IAM Role = Trust Policy + IAM Policies** (with optional Permissions Boundaries).
- **Resource-Based Policies** are used on resources and are separate from IAM roles themselves but can grant permissions to those roles.




