
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
