---
tags:
  - CapitalOne
  - career
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 
EditDate: 
Relates: "[[OneStream]]"
Peer Reviewed: 0
dg-publish:
---
Qsink not lambda


KT Knowledge Transfer  
  
  
5 bpa workflows





Lambda subscribe to things like sns when it comes to asynchronous process but there are more options now Like sqs  
  
  
  
A high level pattern that typically happens now is you have a publisher who sends things to SNS which can connect to multiple things and then that connects to a sqs  
  
  
Another common use case with aws lambda is glue Logic for step function workflows  
  
  
Running lambdas locally



They need a way to automate to publish data to onestream




ByteMorphers team creates DMN,s using Rules lab that ends up getting used by AWS step functions

how is DMN,s accessed by AWS Step function

DMN Domain Model & Notation


Agent or customer enters empath or ease(maybe cap one mobile app) starts process with an event through the exchange