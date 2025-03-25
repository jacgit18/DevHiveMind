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
#### **What is AWS VPC?**








Amazon **Virtual Private Cloud (VPC)** is a logically isolated network within the AWS cloud that allows you to define,  isolate section of the AWS Cloud infrastructure


define and control your own **networking environment**. It enables you to create a secure, scalable, and customizable network infrastructure for running AWS resources like EC2 instances, RDS databases, and other services.



where you can launch AWS resources such as EC2 instances, RDS databases, and more. By default, resources within a VPC cannot communicate with the internet or other VPCs unless specifically configured to do so.  
  
An Internet Gateway(IGW) is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet. It serves as a target for routing traffic destined for the internet from your VPC's subnets.  
  
The relationship between a VPC and an Internet Gateway is as follows:  
  
1. **Connection:** An Internet Gateway serves as the entry and exit point for traffic between your VPC and the internet. It enables communication between resources within your VPC and resources outside of it, such as users accessing web applications hosted in your VPC or your VPC-based resources accessing services on the internet.  
  
2. **Routing:** To enable communication between resources in a VPC and the internet, you must configure route tables in your VPC to route internet-bound traffic to the Internet Gateway. Each subnet within the VPC must be associated with a route table that includes a route to the Internet Gateway.  
  
3. **Access Control:** Access to and from the internet is controlled through network access control lists (NACLs) and security groups. NACLs act as a firewall at the subnet level, while security groups act as a firewall at the instance level. You can configure these to allow or deny traffic based on specific rules.  
  
In summary, an Internet Gateway enables communication between resources in your VPC and the internet by serving as a gateway for internet-bound traffic, while a VPC provides the network isolation and configuration framework within which your AWS resources operate.