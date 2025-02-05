
```javascript
let userInput = prompt("Please enter something:");  

console.log("User input:", userInput);
```



[Redis Demystified: A Simple Introduction for System Design 🧩 - DEV Community](https://dev.to/priya01/redis-demystified-a-simple-introduction-for-system-design-56mb)



```handwritten-ink
{
	"versionAtEmbed": "0.3.3",
	"filepath": "_NoteAssets/Images To Move/Ink/Writing/2025.2.2 - 8.42am.writing"
}
```



AWS Lambda supports different **Invocation Models** for running functions, depending on how the function is triggered and how it handles responses. The three main invocation models are:

---

### **1. Synchronous Invocation**

The caller **waits** for the function to complete and receives the response.

- **Use Case:** API requests, interactive applications, or real-time processing.
- **Examples:**
    - Amazon API Gateway invoking a Lambda function to return HTTP responses.
    - AWS SDK calling Lambda and waiting for a result.
- **Error Handling:** Errors are returned directly to the caller. The caller decides whether to retry.

The following AWS services invoke Lambda synchronously:

- Amazon API Gateway
- Amazon Cognito
- AWS CloudFormation
- Amazon Alexa
- Amazon Lex
- Amazon CloudFront


**Execution Flow:**

1. Caller triggers Lambda.
2. Lambda executes the function.
3. The function returns a response to the caller.

---

### **2. Asynchronous Invocation**

The caller **does not wait** for the function to complete. The request is queued, and Lambda executes it **later**.

- **Use Case:** Event-driven processing where an immediate response isn't needed.
- **Examples:**
    - S3 triggering Lambda when an object is uploaded.
    - EventBridge triggering Lambda on a scheduled event.
- **Error Handling:** Lambda automatically retries the function twice (total of three attempts). Unsuccessful executions can be sent to a **dead-letter queue (DLQ)** or **failure destination** for debugging.

The following AWS services invoke Lambda asynchronously: 

- Amazon SNS 
- Amazon S3
- Amazon EventBridge

**Execution Flow:**

4. Caller triggers Lambda.
5. Lambda **queues** the event.
6. Lambda processes the event **asynchronously**.

---

### **3. Event Source Mapping (Poll-Based Invocation)**

Lambda **polls a data stream or queue** and processes events automatically.

- **Use Case:** Continuous event processing from queues or streams.
- **Examples:**
    - Lambda reading messages from an **SQS queue**.
    - Lambda processing records from **Kinesis** or **DynamoDB Streams**.
- **Error Handling:**
    - For SQS, messages are returned to the queue after retry attempts.
    - For Kinesis/DynamoDB, errors cause retries for up to 24 hours before skipping records.

The configuration of services as event triggers is known as event source mapping. This process occurs when you configure event sources to launch your Lambda functions and then grant theses sources IAM permissions to access the Lambda function. 

  

Lambda reads events from the following services:

- Amazon DynamoDB
- Amazon Kinesis
- Amazon MQ
- Amazon Managed Streaming for Apache Kafka (MSK)
- self-managed Apache Kafka
- Amazon SQS


**Execution Flow:**

7. Lambda automatically polls the source.
8. Lambda retrieves and batches events.
9. The function processes each batch.

---

### **Comparison Summary**

|Invocation Model|Caller Waits?|Retried Automatically?|Example Use Case|
|---|---|---|---|
|**Synchronous**|Yes|No|API responses, interactive apps|
|**Asynchronous**|No|Yes (2 retries)|S3 events, SNS triggers|
|**Event Source Mapping**|No (Auto-Triggered)|Depends on source|SQS, Kinesis, DynamoDB|

Would you like any specific details on configuration or best practices?


Resource Based policies
Lambda resource-based (function) policy

- Associated with a "push" event source such as Amazon API Gateway
- Created when you add a trigger to a Lambda function
- Allows the event source to take the _lambda:InvokeFunction_ action



IAM execution role

- Role selected or created when you create a Lambda function
- IAM policy includes actions you can take with the resource
- Trust policy that allows Lambda to _AssumeRole_
- Creator must have permission for _iam:PassRole_



AWS SAM
an application framework that simplifies creation and deployment of your serverless applications. it an extension of AWS Cloud Formation  

You can install the AWS SAM CLI locally to help test your serverless applications, validate your AWS SAM templates, and streamline your deployments.



 If you allocate 10 GB to a function and the function only uses 2 GB, you are charged for the 10 GB. This is another reason to test your functions using different memory allocations to determine which is the most beneficial for the function and your budget.

It is important to analyze how long your function runs. When you analyze the duration, you can better determine any problems that might increase the invocation of the function beyond your expected length. Load testing your Lambda function is the best way to determine the optimum timeout value.

Your Lambda function is billed based on runtime in 1-ms increments. Avoiding lengthy timeouts for functions can prevent you from being billed while a function is simply waiting to time out.


## **Testing concurrency**

The most important factor for your concurrency, memory, and timeout settings is to verify application testing against real-world conditions. To do this, follow these suggestions:

- Run performance tests that simulate peak levels of invocations.
    - View the metrics for the amount of throttling that occurs during performance peaks.
- Determine whether the existing backend can handle the speed of requests sent to it.
    - Don't test in isolation. If you’re connecting to Amazon Relational Database Service (Amazon RDS), ensure that you test that the concurrency levels for your function can be processed by the database.
- Does your error handling work as expected? 
    - Tests should include pushing the application beyond the concurrency settings to verify correct error handling.



**The AWS CloudFormation template is considered the _blueprint_ for the Lambda function.**

The CloudFormation template specifies every detail of the Lambda function and the environment required for the Lambda function to run. CloudFormation provides a common language and format that all parts of AWS can read and understand.



**CloudFormation is infrastructure as code.**

The entire infrastructure needed for your Lambda function is written to a text file. This file (template) then deploys your desired stack. A stack is a collection of AWS resources that you can manage as a single unit. The template becomes the single source of truth for deploying identical stacks into any AWS account. Each time the Lambda function is invoked, it runs by using information provided in the CloudFormation template.



AWS X-Ray records how the Lambda functions are running.  

You can use X-Ray for:

- Tuning performance
- Identifying the call flow of Lambda functions and API calls
- Tracing path and timing of an invocation to locate bottlenecks and failures


## Three patterns for communicating status updates

In an architecture in the previous lesson, the client service submitted an order, and the SQS queue gave a response to API Gateway with the message ID. Then Lambda pulled the message from the queue and handed it off to Step Functions to complete the order process and update the job status as it moved through the workflow.

The next thing you need to consider is how to provide the status to the calling client. The method you choose depends on your use case. The next set of videos looks at three potential approaches:

- bullet
    
    Client polling
    
- bullet
    
    Webhooks with Amazon Simple Notification Service (Amazon SNS)
    
- bullet
    
    WebSockets with AWS AppSync