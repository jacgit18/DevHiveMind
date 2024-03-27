---
tags:
  - API
  - HTTP
  - business
  - techDebt
author:
  - jacgit18
  - chatgpt
Comments: This can be a system design question your asked.
Purpose: This documentation discusses rate limits.
Status: Done
Started: 
EditDate: 2024-03-03
Relates: "[[Client Vs Server side Rate Limiting]]"
Peer Reviewed: 0
dg-publish:
---
Rate limiters are essential for controlling the rate of requests or actions to prevent abuse, overuse, or misuse of resources. Here are some different types of rate limiters:  
  
1. **Fixed Window Rate Limiter**: In this approach, a fixed window of time is defined, such as one minute. The rate limiter counts the number of requests/actions within that window and enforces a limit. Once the window resets, the count is cleared.  
  
2. **Sliding Window Rate Limiter**: Unlike the fixed window approach, the sliding window rate limiter dynamically adjusts the window based on recent activity. It allows a smoother distribution of requests over time and prevents burst traffic from exceeding the limit.  
  
3. **Token Bucket Rate Limiter**: This rate limiter maintains a bucket of tokens, where each token represents permission to perform a single action/request. Tokens are added to the bucket at a fixed rate, and requests can only be made if tokens are available.  
  
4. **Leaky Bucket Rate Limiter**: Similar to the token bucket approach, the leaky bucket rate limiter regulates the rate of requests by allowing a fixed number of requests to leak out of the bucket per unit of time. Excess requests are either queued or discarded.  
  
5. **Distributed Rate Limiter**: In a distributed environment, a distributed rate limiter coordinates across multiple nodes or instances to enforce rate limits consistently. This ensures that rate limits are applied uniformly, regardless of the location of the requester.  
  
6. **Adaptive Rate Limiter**: Adaptive rate limiters dynamically adjust the rate limit based on various factors such as system load, user behavior, or traffic patterns. They provide flexibility to handle fluctuating loads effectively.  
  
7. **Custom Rate Limiters**: Depending on specific requirements, custom rate limiters can be designed and implemented. These may incorporate features such as dynamic adjustment based on user attributes, fine-grained control over limits, or integration with external systems for monitoring and management.  
  
Each type of rate limiter has its strengths and weaknesses, and the choice depends on factors such as the nature of the application, expected traffic patterns, scalability requirements, and desired level of control over rate limiting behavior.


### **Understanding Business-Level Rate Limits (Quotas)**

Rate limiting, a crucial traffic management tool for API owners, safeguards systems from overload and aligns API usage with business goals. A closer look at rate limits, particularly the subcategories, offers a comprehensive view of traffic management strategies.

### **Unveiling Quotas: Where Business Meets Design**

Quotas, a nuanced form of rate limit, intricately weave business outcomes into API transactions. Twitter, for instance, allows developers access between 150 and 350 times per hour, linking frequency to real-time infrastructure states. Quotas segment developers based on varying limits, offering distinct relationships with the API. Initial quotas are small, with higher rates for verified or paid plans.

### **Tailoring Quotas to Scale and Demand**

Quotas relevance mirrors scale and usage patterns. The key question is, "How crucial is my information, and what if the API attains unprecedented success?" Open content APIs, lacking authentication, must guard against excessive traffic. Twitter mandates limits due to potential user surges, preventing infrastructure strain.

### **Striking the Right Balance: Avoiding Quota Overreach**

While quotas are indispensable, excessive application can render a service unusable. Punitive quotas hinder service testing, pushing developers away. Flexibility acknowledges testing surges, while mechanisms to charge for elevated usage act as strategic tools for managing requests beyond normal rates.

### **Quotas Beyond External APIs: Reducing Risk in Private API Ventures**

Quotas extend beyond external APIs, finding utility within corporate firewalls. For organizations opening enterprise "crown jewels" as APIs, quotas mitigate risks. They enable critical content availability for internal innovation, minimizing operational hiccups. Quotas empower internal API teams, infusing agility into the enterprise landscape.

Unlocking API potential demands strategic orchestration aligning business objectives with data traffic nuances. Quotas emerge as linchpins, weaving business acumen and technical finesse in the dynamic realm of API management.


#todo/Personal/High/Dev 
- [ ] Look into https://blog.quastor.org/p/rate-limiting-stripe