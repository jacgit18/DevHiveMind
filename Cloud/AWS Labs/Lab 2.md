Lab 2: Building your Amazon VPC Infrastructure 
© 2025 Amazon Web Services, Inc. or its affiliates. All rights reserved. This work may not be reproduced or redistributed, in whole or in part, without prior written permission from Amazon Web Services, Inc. Commercial copying, lending, or selling is prohibited. All trademarks are the property of their owners. 
Note: Do not include any personal, identifying, or confidential information into the lab environment. Information entered may be visible to others. 
Corrections, feedback, or other questions? Contact us at AWS Training and Certification. 
Lab overview 
As an AWS solutions architect, it is important that you understand the overall functionality and capabilities of Amazon Web Service (AWS) and the relationship between the AWS networking components. In this lab, you create an Amazon Virtual Private Cloud (Amazon VPC), a public and a private subnet in a single Availability Zone, public and private routes, a NAT gateway, and an internet gateway. These services are the foundation of networking architecture inside of AWS. This architecture design covers concepts of infrastructure, design, routing, and security. 
The following image shows the final architecture for this lab environment: 

![[2025-03-15 14.39.09 online.vitalsource.com 6cf82326d082.png]]

Objectives 
After completing this lab, you should know how to do the following:

•
 Create an Amazon VPC. 
•
 Create public and private subnets. 
•
 Create an internet gateway. 
•
 Configure a route table and associate it to a subnet. 
•
 Create an Amazon Elastic Compute Cloud (Amazon EC2) instance and make the instance publicly accessible. 
•
 Isolate an Amazon EC2 instance in a private subnet. 
•
 Create and assign security groups to Amazon EC2 instances. 
•
 Connect to Amazon EC2 instances using Session Manager, a capability of AWS Systems Manager. 

Task 1: Create an Amazon VPC in a Region 
In this task, you create a new Amazon VPC in the AWS Cloud. 
ⓘ Learn more: With Amazon VPC, you can provision a logically isolated section of the AWS Cloud where you can launch AWS resources in a virtual network that you define. You have complete control over your virtual networking environment, including selection of your own IP address ranges, creation of subnets, and configuration of route tables and network gateways. You can also use the enhanced security options in Amazon VPC to provide more granular access to and from the Amazon EC2 instances in your virtual network. 



3.
 At the top of the AWS Management Console, in the search bar, search for and choose VPC. 
! Caution: Verify that the Region displayed in the top-right corner of the console is the same as the Region value on the left side of this lab page. 
 Note: The VPC management console offers a VPC Wizard, which can automatically create several VPC architectures. However, in this lab you create the VPC components manually. 
4.
 In the left navigation pane, choose Your VPCs. 
The console displays a list of your currently available VPCs. A default VPC is provided so that you can launch resources as soon as you start using AWS. 
5.
 Choose Create VPC and configure the following: 
•
 Resources to create: Choose  VPC only. 
•
 Name tag - optional: Enter Lab VPC 
•
 IPv4 CIDR: Enter 10.0.0.0/16 
6.
 Choose Create VPC. 

A  You successfully created vpc-xxxxxxxxxx / Lab VPC message is displayed on top of the screen. 
The VPC Details page is displayed. 
7.
 Verify the state of the Lab VPC. 
 Expected output: It should display the following: 
•
 State:  Available 
ⓘ The lab VPC has a Classless Inter-Domain Routing (CIDR) range of 10.0.0.0/16, which includes all IP addresses that start with 10.0.x.x. This range contains over 65,000 addresses. You later divide the addresses into separate subnets. 
8.
 From the same page, choose Actions ▼ and choose Edit VPC settings. 
The Edit VPC settings page is displayed. 
9.
 From the DNS settings section, select ☑ Enable DNS hostnames. 
This option assigns a friendly Domain Name System (DNS) name to Amazon EC2 instances in the VPC, such as the following: 
ec2-52-42-133-255.us-west-2.compute.amazonaws.com 
10.
 Choose Save. 
A  You have successfully modified the settings for vpc-xxxxxxxxxx / Lab VPC. message is displayed on top of the screen. 
Any Amazon EC2 instances launched into this Amazon VPC now automatically receive a DNS hostname. You can also create a more meaningful DNS name (for example, app.company.com) using records in Amazon Route 53. 
 Congratulations! You have successfully created your own VPC and now you can launch the AWS resources in this defined virtual network. 
