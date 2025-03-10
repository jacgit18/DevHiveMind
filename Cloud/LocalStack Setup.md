---
tags:
  - cloud
  - CapitalOne
  - bestPractices
  - RTIC
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 2025-02-25
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---
  
Always Free Resources (No Expiration, Limited Usage)  
  
These services are free forever, as long as you stay within usage limits:  
  
✅ AWS Lambda – 1 million free requests per month  
✅ Amazon S3 (Storage) – 5GB Standard Storage  
✅ Amazon DynamoDB (NoSQL Database) – 25GB of storage, 25 read/write units  
✅ Amazon API Gateway – 1 million API calls per month  
✅ Amazon CloudWatch – 5GB logs, 1M API requests, basic monitoring  
✅ AWS IAM (Identity & Access Management) – Free for user roles and permissions  
✅ AWS SNS (Simple Notification Service) – 1M free push notifications  
✅ AWS SES (Simple Email Service) – 3,000 outbound emails per month  
✅ AWS CodeCommit – 5 active users, unlimited repositories  
✅ AWS Step Functions – 4,000 free state transitions per month

What You Can Build for Free  
- Static Website (S3 + CloudFront + Route 53 with Free DNS)  
- Small Web App (EC2 or Lambda + API Gateway + DynamoDB)  
- CI/CD Pipeline (CodeCommit + CodePipeline + CodeBuild)  
- Serverless API (Lambda + API Gateway + DynamoDB)


This document provides a step-by-step guide to setting up **AWS Lambda, IAM (Identity and Access Management), and Step Functions** using **LocalStack**, which is a local AWS cloud emulator. The setup is meant for running and testing AWS services locally without needing an actual AWS account.

When a agent or who ever initiate contract offer from Empath 

goes rules lab coming back with true or false 

Can only process one contract at a time which comes from a frontend through the exchange through the public API invoker getting things like contract id, contract info, and account id along with contract draft which gets sent to rules lab which determines contract eligibility if eligible we update the UCP(*Unified customer profile*) with the status to enroll and set the payments and publish to one stream for the eventual workflow and do a audit and send a response back to the client this is the immediate workflow. 

When comes to Payments still being decided were its being sent to.  

We just schedule when hooks fire

There is a list of actions associated with each contract which also has one offset we need to separate  those actions by the offset meaning immediate actions fired on the same day and eventual actions which are triggered by hooks based on offset date.

Data lambda => JSON => Enrollment Async Step Function

an offset is 


Does offset has to do with sending offers offers to people in delinquency depending on their level of delinquency


#todo/CapitalOne
- [ ] Need to mock payload based on schema provided from other team below is rough draft of how it should look may need to set hooks in the future for fulfillment lambda


Delete colima and reinstall for broken localstack

Fms fuffilment management service  
  
AMA auditability monitoring and Analytics

```json
{
  "List": [
    {
      "name": "rateChange",
      "offset": 16
      "otherData": ...
    },
    {
      "name": "action1",
      "offset": 3 // wait 3 days to execute action 
    },
    {
      "name": "action2", // imediate execute action
      "offset": 0
    },
    {
      "name": "action100",
      "offset": 1
    }
  ]
}
```


## 1. Create a Lambda Function  
- Packages a Python script (`lambda-function.py`) into a ZIP file.
- Uses the AWS CLI (configured to connect to LocalStack) to create a Lambda function named `VerifyCustomer`.
- The function is assigned a role (`lambda-role`), which is required for execution permissions.

```sh
zip -r function.zip lambda-function.py

aws --endpoint-url=http://localhost:4566 lambda create-function \
    --function-name VerifyCustomer \
    --runtime python3.12 \
    --handler lambda_function.lambda_handler \
    --zip-file fileb://function.zip \
    --role arn:aws:iam::000000000000:role/lambda-role
    --region us-east-1
```

## 2. Create IAM Role
- Creates an IAM role (`lambda-role`) with a trust policy (`trust-policy.json`) to allow Lambda execution.

```sh
aws --endpoint-url=http://localhost:4566 iam create-role \
    --role-name lambda-role \
    --assume-role-policy-document file://trust-policy.json
```

## 3. Attach Policy to IAM Role
- Attaches a policy (`policy.json`) to the IAM role.
- Ensures that Lambda has the necessary permissions.
```sh
aws --endpoint-url=http://localhost:4566 iam put-role-policy \
    --role-name lambda-role \
    --policy-name lambda-policy \
    --policy-document file://policy.json
```

```sh
aws --endpoint-url=http://localhost:4566 iam attach-role-policy \
    --role-name lambda-role \
    --policy-arn arn:aws:iam::000000000000:policy/lambda-policy
```

## 4. Verify Policy Attached to IAM Role
- Lists attached policies for the `lambda-role` to confirm that permissions are set correctly.

```sh
aws --endpoint-url=http://localhost:4566 iam list-attached-role-policies \
    --role-name lambda-role
```

## 5. Create a DynamoDB Table
- Sets up a local DynamoDB table (`Offers`) with `OfferId` as the primary key.
```sh
aws --endpoint-url=http://localhost:4566 dynamodb create-table \
    --table-name Offers \
    --attribute-definitions AttributeName=OfferId,AttributeType=S \
    --key-schema AttributeName=OfferId,KeyType=HASH \
    --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

## 6. Create and Update Data Lambda Function
- Packages and updates a second Lambda function (`DataLambda`) responsible for processing data.
```sh
cd /Users/cal141/rtjg/LocalStack/lambdas/DataLambda
zip -r DataLambda.zip data_lambda.py

aws --endpoint-url=http://localhost:4566 lambda update-function-code \
    --function-name DataLambda \
    --zip-file fileb://DataLambda.zip
```


## 7. Define Your State Machine

Create a **state machine definition file** (e.g., `collections-process-offers-enrollment.json`). This file defines the **workflow logic**, such as which Lambda functions are invoked, whether you have conditions, retries, or parallel states. Example structure (simplified):

```json
{
    "Comment": "Enrollment State Machine",
    "StartAt": "VerifyCustomer",
    "States": {
        "VerifyCustomer": {
            "Type": "Task",
            "Resource": "arn:aws:lambda:us-east-1:000000000000:function:VerifyCustomer",
            "Next": "ProcessData"
        },
        "ProcessData": {
            "Type": "Task",
            "Resource": "arn:aws:lambda:us-east-1:000000000000:function:DataLambda",
            "End": true
        }
    }
}
```
### Step 1: Deploy the Step Function to LocalStack

Run the following command to **update or create the state machine using LocalStack**.

```bash
aws --endpoint-url=http://localhost:4566 stepfunctions update-state-machine \
    --state-machine-arn arn:aws:states:us-east-1:000000000000:stateMachine:EnrollmentStateMachine \
    --definition file://collections-process-offers-enrollment.json
```

- This assumes you already have a state machine called `EnrollmentStateMachine`.
- If you're **creating it for the first time**, you'd run:

```bash
aws --endpoint-url=http://localhost:4566 stepfunctions create-state-machine \
    --name EnrollmentStateMachine \
    --definition file://collections-process-offers-enrollment.json \
    --role-arn arn:aws:iam::000000000000:role/lambda-role
```

The `role-arn` must match your LocalStack IAM role.



### Step 2: Test the Step Function

Once the state machine is updated/created, you can **trigger it with an input file** (like `input.json`).

```bash
aws --endpoint-url=http://localhost:4566 stepfunctions start-execution \
    --state-machine-arn arn:aws:states:us-east-1:000000000000:stateMachine:EnrollmentStateMachine \
    --input file://input.json
```



### Step 3: Monitor Execution

To check the execution status, you can list and describe executions.

```bash
aws --endpoint-url=http://localhost:4566 stepfunctions list-executions \
    --state-machine-arn arn:aws:states:us-east-1:000000000000:stateMachine:EnrollmentStateMachine
```

```bash
aws --endpoint-url=http://localhost:4566 stepfunctions describe-execution \
    --execution-arn <execution-arn>
```

---

### Summary of Components

|Component|Example|
|---|---|
|**Lambda Function 1**|`VerifyCustomer`|
|**Lambda Function 2**|`DataLambda`|
|**DynamoDB Table**|`Offers`|
|**IAM Role**|`lambda-role`|
|**Step Function**|`EnrollmentStateMachine`|
|**State Machine Definition**|`collections-process-offers-enrollment.json`|
|**Execution Input**|`input.json`|

---

### Overall Flow

1. `EnrollmentStateMachine` starts.
2. It invokes `VerifyCustomer`.
3. If successful, it invokes `DataLambda`.
4. `DataLambda` processes data, maybe interacts with DynamoDB (`Offers` table).
5. Execution completes.





## 8. Update Step Functions State Machine
- Updates an AWS Step Functions state machine (`EnrollmentStateMachine`) using a definition file (`collections-process-offers-enrollment.json`).

```sh
aws --endpoint-url=http://localhost:4566 stepfunctions update-state-machine \
    --state-machine-arn arn:aws:states:us-east-1:000000000000:stateMachine:EnrollmentStateMachine \
    --definition file://collections-process-offers-enrollment.json
```


## 9. Test Step Function Execution
- Starts an execution of the `EnrollmentStateMachine` with an input file (`input.json`). 

```sh
aws --endpoint-url=http://localhost:4566 stepfunctions start-execution \
    --state-machine-arn arn:aws:states:us-east-1:000000000000:stateMachine:EnrollmentStateMachine \
    --input file://input.json
```

### **Purpose of This Setup**

This setup is used to locally develop and test an AWS-based workflow involving:

- Lambda functions (for processing customer data).
- IAM roles and policies (for managing permissions).
- DynamoDB (as a database for storing offers).
- Step Functions (for orchestrating multi-step processes).

By using **LocalStack**, developers can simulate AWS services without incurring costs or requiring internet access.



In **LocalStack**, you should avoid setting **persistence to 0** for any service where you need data to persist between restarts. Here are some key services where persistence matters:

### **1. DynamoDB**

- **Avoid setting persistence to 0** if you're testing locally and want to keep your database records across LocalStack restarts.
- **Fix:** Enable persistence by using:
    
    ```bash
    export DATA_DIR=/tmp/localstack/data
    ```
    

### **2. S3**

- If persistence is disabled, uploaded files will be lost when LocalStack restarts.
- **Fix:** Use the `DATA_DIR` setting or mount a volume in Docker.

### **3. Step Functions**

- Without persistence, execution history and state machine definitions will be lost after restart.
- **Fix:** Set a **data directory** for LocalStack to store state machine data.

### **4. SQS & SNS**

- Messages in queues or topics will be wiped out if persistence is off.
- **Fix:** Store messages by enabling persistence.

### **How to Enable Persistence in LocalStack**

To keep data even after a restart, start LocalStack with:

```bash
export DATA_DIR=/tmp/localstack/data
```

or in **Docker Compose**:

```yaml
services:
  localstack:
    image: localstack/localstack
    environment:
      - DATA_DIR=/var/lib/localstack
    volumes:
      - "./localstack_data:/var/lib/localstack"
```

### **When Is It OK to Disable Persistence?**

- If you **only need ephemeral testing** (e.g., running tests in CI/CD).
- If data persistence isn't needed (e.g., temporary S3 file uploads).
- If you want to reset state easily between test runs.

Would you like help configuring persistence for a specific LocalStack service?



 