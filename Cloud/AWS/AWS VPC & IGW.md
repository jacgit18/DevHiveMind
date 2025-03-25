---
tags:
  - cloud
  - AWS
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

Amazon **Virtual Private Cloud (VPC)** is a logically isolated network within the AWS cloud that allows you to define,  isolate, and control sections your **networking environment** within the  AWS Cloud infrastructure. It enables you to create a secure, scalable, and customizable network infrastructure for running AWS resources like EC2 instances, RDS databases, and other services. By default, resources within a VPC cannot communicate with the internet or other VPCs unless specifically configured to do so.  

With VPC, you have full control over:

- **IP address ranges** (IPv4 and IPv6)
- **Subnet creation** (public and private subnets)
- **Route tables and network gateways**
- **Security settings** (security groups and network ACLs)
- **Connectivity** (internet access, VPNs, AWS Direct Connect)
    

> [!note]  **Side Note:** 
> AWS allows up to **5 VPCs per region**, and they are **region-locked**, meaning they cannot span multiple regions. However, you can request an increase in the VPC limit if needed.


##### **What Problem Does AWS VPC Solve?**
Before VPC, AWS resources were deployed in a **shared networking environment**, which had limited customization and security options. AWS VPC solves several critical problems:


##### **1. Network Isolation and Security**
- AWS VPC creates a **private network** where your resources are isolated from other AWS customers.
- It allows you to **segment resources** using **subnets** (e.g., public vs. private subnets).
- Security Groups and Network ACLs provide **firewall-level security** at both the instance and subnet levels.


**Problem Solved:** Protects your infrastructure from unauthorized access and external threats.


##### **2. Customizable IP Addressing and Network Configuration**
- With VPC, you define your own **IP address range** using **CIDR blocks**.
- You can configure **multiple subnets** across different availability zones.
- You control how traffic flows using **route tables** and **internet gateways**.

**Problem Solved:** Gives complete control over network architecture, allowing for customized configurations.


#### **3. Private and Secure Communication Between  Services**
- AWS VPC allows secure **private communication** between EC2 instances, RDS databases, Lambda functions, and other AWS services.
- Services like **VPC Peering, AWS PrivateLink, and AWS Transit Gateway** enable private communication across different VPCs or AWS accounts.

**Problem Solved:** Eliminates the need for exposing internal services to the public internet.





#### **What is AWS IGW?**
An Internet Gateway(IGW) is a horizontally scaled, redundant, and highly available VPC component that allows communication between instances in your VPC and the internet. It serves as a target for routing traffic destined for the internet from your VPC's subnets.  
  
The relationship between a VPC and an Internet Gateway is as follows:  
  
1. **Connection:** An Internet Gateway serves as the entry and exit point for traffic between your VPC and the internet. It enables communication between resources within your VPC and resources outside of it, such as users accessing web applications hosted in your VPC or your VPC-based resources accessing services on the internet.  
  
2. **Routing:** To enable communication between resources in a VPC and the internet, you must configure route tables in your VPC to route internet-bound traffic to the Internet Gateway. Each subnet within the VPC must be associated with a route table that includes a route to the Internet Gateway.  
  
3. **Access Control:** Access to and from the internet is controlled through network access control lists (NACLs) and security groups. NACLs act as a firewall at the subnet level, while security groups act as a firewall at the instance level. You can configure these to allow or deny traffic based on specific rules.  
  
In summary, an Internet Gateway enables communication between resources in your VPC and the internet by serving as a gateway for internet-bound traffic, while a VPC provides the network isolation and configuration framework within which your AWS resources operate.