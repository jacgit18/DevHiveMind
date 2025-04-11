
```javascript
let userInput = prompt("Please enter something:");  

console.log("User input:", userInput);
```


```handwritten-ink
{
	"versionAtEmbed": "0.3.3",
	"filepath": "_NoteAssets/Images To Move/Ink/Writing/2025.2.2 - 8.42am.writing"
}
```

Avoid premature optimization 

Add a part in system design doc about building own tools instead of using someones library

When doing migration you want monitoring before doing anything manager 



https://chatgpt.com/share/67f6ff55-c0a8-800d-8673-1d9137b6a27d


[How AI Agents Are Quietly Transforming Frontend Development - The New Stack](https://thenewstack.io/how-ai-agents-are-quietly-transforming-frontend-development/)




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
  
  
---  
  
Want a more casual or more technical version?