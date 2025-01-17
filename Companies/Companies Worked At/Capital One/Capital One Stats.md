---
tags:
  - career
  - employment
  - CapitalOne
  - favorite
author:
  - jacgit18
Purpose: This documentation discusses work done at current company.
Status: Perpetual
Started: 2023-12-14
EditDate: 
Relates: 
dg-publish:
---
## Experience
#todo/BAU/Career/Doc
- [ ] Document things done in job along with lesson learned
- [ ] Add info from [[Job Search Cycle]] and clean up


## Current 
Worked under Card tech for both teams at capital one. The first being in QA for PainKillers under **Empath** platform which deals with customer relations using streams in terms of data sources collection.  
  
**Stream** data sources encapsulates platforms and systems that produce data or change oriented events of interest to collections business processes. Stream data is exclusively published And subscribed to use the OneStream platform  

Now on Real-time intelligence Collection(RTIC) surge team who align with SOC - System and organization controls.

This team focus on [[Credit Card Collections]], delinquency, and stuff like payment plans. The focus of the work will center around maintaining and up-scaling process and services for capital one and future discovery customers as part of the Capital One Discovery merger.

We're building Arctic offers out for the next 6 month i may be working with AWS while   

Cloud orchestration processes from hooks to step functions

Arctic uses DynamoDB and utilizes AWS server-less architecture focusing on things like lambda and Step-Up which is no code.

Credit card collection the main mission is to help customers who are off track get back on track of their payments the way this happens is through offers or specifically rtic offers  
  
this includes payment plans maybe reducing apy or other different plans etc..  
  
  
Splunk  
  
Talk about learning about splunk and some best practice and managing technical debt

Ease and empath are clients and offers enrollment LLD  
  
  
  
Decisioning act as a recommendation agent to ensure proper treatment and surface at any given time

Arctic decisioning generates contract  
  
  
Were focus on enrollment


Alot of the work centered around contract related stuff


ASV application service version  
  
  
Rules lab is basically a internal tool that is used by business analyst to update credit policy without having to have software engineers mess around with codebases to do this just in terms of Simple Rules that you see on a website specifically for a credit card terms and policies and many other things around credit cards


## Old


Worked on Painkiller under mojitos on a vertical team which could be mentioned if you work with more teams

Performed integration testing in a micro frontend architecture using the Vue.js testing library and internal tools, ensuring seamless front-end functionality and an optimal user experience for Capital One agents using the Empath application.  
  
Executed thorough testing across high-priority credit card types (Primary Consumer, CreditWise, Small Business) to validate complex workflows involving account managers and authorized users, ensuring accuracy across all user interactions.  
  


Conducted integration testing in a micro frontend architecture with Vue.js and internal tools for the Empath application, used by Capital One agents to resolve credit card customer cases. Performed comprehensive testing across high-priority credit card types (Primary Consumer, CreditWise, Small Business) to validate complex workflows involving account managers and authorized users, ensuring accurate and consistent user interactions and enhancing the overall user experience.


Enhanced test coverage for the "Update Citizenship" workflow across various account types, achieving a 73.51% increase in function coverage and a 14.46% increase in statement and line coverage.


## Stabilizing build


In our integration testing, we encountered timeout issues when running tests in parallel, likely due to resource contention or network latency. To address this, we switched to running the tests sequentially, which allowed us to isolate potential bottlenecks and reduce the chance of timeouts caused by concurrent processes.

We also experimented with implementing retry mechanisms, which helped mitigate intermittent failures, especially when external services were involved. Additionally, we played around with different timeout configurations, adjusting them based on the complexity and expected runtime of each test. By balancing the number of retries and fine-tuning timeout settings, we were able to stabilize the tests without excessively delaying the feedback loop.


## Other Stuff
  
80 to 85 test is testing standards  
  
Raise issues to painkillers when necessary  
  
Use status and stuff to check if stuff exists  
  
  
  
Three types of teams, vertical, horizontal, and platform, which one are you?  
might be platform or vertical  
  
  
  
nativeSomething.Element.SomeAction  
  
To be visible can be a false positive  
  
Check status when checking things like to be visible  
  
  
  
  
Write down code notes and attempts  
  
Take screenshot  
  
Flag and comment for blockers since no status on jira for blockers  
  
  
This is all being built on Vue 3.  
  
Leverage an internal component library called Connects.  
  
We'll be dealing with workflow components and three separate UI apps which consist of the snapshot, manage, personal, info, and login-related stuff. Also, the digital profile falls under our Scope of work.  
  
  
  
At 10 to 11 Tuesday and Thursday certain workflows are down which will affect testing for internal tools.  
  
  
  
Functional tests are very high-level, end-to-end.  
  
You won't need negative tests properly for functional tests.  
  
  
  
  
Etilement tab has specific Etilement  
  
Kohls is an external add to the empath