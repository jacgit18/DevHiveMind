
```javascript
let userInput = prompt("Please enter something:");  

console.log("User input:", userInput);
```



```javascript
let userInput = "Please enter something:";  

console.log("User input:", userInput);
```
```handwritten-ink
{
	"versionAtEmbed": "0.3.3",
	"filepath": "_NoteAssets/Images To Move/Ink/Writing/2025.2.2 - 8.42am.writing"
}
```



Abstracting out LLD for better business audience understand then create other diagrams that are more for devs that goes more into technical details

EventBridge is like the air traffic controller for events in AWS.  
It makes sure the right events go to the right place, at the right time, without you having to write glue code.


Pager duty alerts to phone etc on failure  
Publish message to pager duty in the future

When using sns in localstack with sns it wont send an actual email




Iteration are repetitions where you are modifying the repetition with error correction and continuing to do it over and over again modifying for error correction that is where you make a lot of improvement  
  
If you fail its just a iteration that you can pivot from in terms of cutting losses when it makes sense to to continue to iterate and get where you want to be



[The heart of architecture: cohesers and decouplers \| ITNEXT](https://itnext.io/cohesers-and-decouplers-ecac2964081a)

[The heart of architecture: deconstructing patterns \| ITNEXT](https://itnext.io/deconstructing-patterns-a605967e2da6)


[Choose your own architecture \| ITNEXT](https://itnext.io/choose-your-own-architecture-92c56b12f7b0)





[Smart Contract Mechanics + AI Sneak Peek w/ kalepail - YouTube](https://www.youtube.com/watch?v=vi_jgvOKsl8)



[30+ MCP Ideas with Complete Source Code - DEV Community](https://dev.to/copilotkit/30-mcp-ideas-with-complete-source-code-d8e)


[Model Context Protocol (MCP): 8 MCP Servers Every Developer Should Try! - DEV Community](https://dev.to/pavanbelagatti/model-context-protocol-mcp-8-mcp-servers-every-developer-should-try-5hm2)


[Setting Up the Official GitHub MCP Server: A simple Guide - DEV Community](https://dev.to/debs_obrien/setting-up-the-official-github-mcp-server-a-simple-guide-707)


Avoid premature optimization 

Add a part in system design doc about building own tools instead of using someones library

When doing migration you want monitoring before doing anything manager 



https://chatgpt.com/share/67f6ff55-c0a8-800d-8673-1d9137b6a27d


[How AI Agents Are Quietly Transforming Frontend Development - The New Stack](https://thenewstack.io/how-ai-agents-are-quietly-transforming-frontend-development/)



Lensa lets you visualize and monitor live data in Kafka streams—like credit card transactions—in real-time.  
  
Kafka is commonly used in systems that require high-throughput, real-time data processing, such as fraud detection systems, recommendation engines, or payment processing pipelines. Lensa (assuming this refers to an internal tool or a real-time data visualization platform) sits on top of Kafka to give engineers, analysts, and product teams a clear window into what’s happening across their data streams as it happens.  
  
Use Case: Credit Card Transaction Monitoring  
  
Imagine you're working at a financial company that handles millions of credit card transactions per day. These transactions are flowing through Kafka topics. Lensa allows you to do things like:  
  
Monitor anomalies: See spikes or unusual patterns in transaction amounts or volume that could signal fraud.  
  
Segment data: Filter by merchant category, location, card type, or customer segment in real-time.  
  
Audit flows: Trace the lifecycle of a transaction across various Kafka topics and services.  
  
Debug issues: Catch failed transactions or processing errors as they happen, without digging through log files.  
  
  
In short, Lensa acts like a real-time dashboard and debugger for your Kafka-based systems—making abstract streams of data more human-friendly and actionable.



## work convo 

Showing up in a meeting say that you know you're interrupting but and continue with your point  
  
Detach like one critiquing something like oh this resume needs a little bit of clarity in this area instead of mentioning the word you in your criticism  
  
Im curious if you were me what would you do reframe things when asking for people's opinions

Don't have virtual backgrounds have stuff in the background that bring up conversation during Zoom






Use operator for anything stateful in python



### Deployment strategies

With Lambda traffic shifting, you can send a small subset of traffic to your newest function version while keeping the majority of incoming production traffic to your old, stable version. Some of the following deployment strategies use traffic shifting. Traffic shifting helps you validate that your new Lambda version works as expected, before sending all production traffic to it.

To learn more, expand each of the following three categories.





relates to aws 
## 

**The three pillars of observability**

When you’re operating your serverless applications at scale, you can’t afford to fly blind. You need to be able to answer important operational and business questions including the following:

- Is my decoupled service up or down?
    
- Is one of my services causing a performance bottleneck?
    
- Is my application fast or slow, as experienced by my end users?

-  What key performance indicators (KPIs) and service level agreements (SLAs) should we establish, and how do we know if they’re being met?


| Deployment                  | Consumer Impact                                  | Rollback                                      | Event Model Factors                     | Deployment Speed |
| --------------------------- | ------------------------------------------------ | --------------------------------------------- | --------------------------------------- | ---------------- |
| **All-at-once**             | All at once                                      | Redeploy older version                        | Any event model at low concurrency rate | Immediate        |
| **Canary/**  <br>**Linear** | 1-10% typical initial traffic shift, then phased | Revert 100% of traffic to previous deployment | Better for high-concurrency workloads   | Minutes to hours |


  

| Deployment Preferences Type   | Description                                                                                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Canary10Percent30Minutes      | Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed 30 minutes later. |
| Canary10Percent5Minutes       | Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed 5 minutes later.  |
| Canary10Percent10Minutes      | Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed 10 minutes later. |
| Canary10Percent15Minutes      | Shifts 10 percent of traffic in the first increment. The remaining 90 percent is deployed 15 minutes later. |
| Linear10PercentEvery10Minutes | Shifts 10 percent of traffic every 10 minutes until all traffic is shifted.                                 |
| Linear10PercentEvery1Minute   | Shifts 10 percent of traffic every minute until all traffic is shifted.                                     |
| Linear10PercentEvery2Minutes  | Shifts 10 percent of traffic every 2 minutes until all traffic is shifted.                                  |
| Linear10PercentEvery3Minutes  | Shifts 10 percent of traffic every 3 minutes until all traffic is shifted.                                  |
| AllAtOnce                     | Shifts all traffic to the updated Lambda functions at one time.                                             |



## Email To Send
Subject: Interest in Auto Loan Team Opportunities at Capital One  
  
Hi [Vendor Contact's Name],  
  
I hope you're doing well. As we approach the end of my current contract in June, I wanted to check in and mention something I’ve been thinking about. I’m not sure how much sway or visibility you have when it comes to which teams I might be placed on if the contract gets extended, but I wanted to express my interest in Capital One’s auto loan line of business.  
  
It’s a space I’d be excited to support and grow in, and I’d love to be considered if there are any contractor needs in that area. Please let me know if that’s something worth exploring or if there’s anything I should keep in mind moving forward.  
  
Thanks again for your continued support—I really appreciate it.  
  
Best,  
[Your Full Name]


## Resume Placeholder Experience
Here’s a polished placeholder job description for your resume:  
  
  
---  
  
Business Process Automation Engineer  
Credit Card Collections | AWS Serverless Architecture  
Contract | [Company Name], [Location or Remote]  
Dates of Employment  
  
- Led automation initiatives in the credit card collections space, streamlining manual workflows and reducing operational overhead.
    
- Built event-driven workflows using AWS Lambda, Step Functions, and EventBridge to automate key processes across the collections lifecycle.
    
- Developed Python scripts to integrate with third-party services, implement business rules, and manage async task coordination.
    
- Utilized LocalStack to simulate AWS services for efficient local development and testing of cloud resources.
    
- Collaborated with compliance, product, and engineering teams to translate business logic into scalable automation solutions.
    
- Improved communication and escalation handling by embedding custom triggers and decision points into automated workflows.




“I work on **automating the collections process**—essentially making sure the system knows when and how to reach out to customers, what options they have, and how we scale that across millions of accounts.”

“I work on business automation for collections, where we design systems that scale across millions of accounts while staying compliant with financial regulations.”


“The work I do ensures that collections are handled efficiently and fairly, using automation to reduce errors, personalize outreach, and optimize recovery processes.”



- _“Ever wonder how a bank decides when to remind you about a missed payment? I build the backend automation that figures out when and how those decisions happen.”_
    
- _“I work on the behind-the-scenes tech that makes collections smarter, more scalable, and automated—so a system, not a person, is making decisions.”_