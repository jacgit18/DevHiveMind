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