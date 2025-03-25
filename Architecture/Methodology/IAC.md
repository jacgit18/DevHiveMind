---
tags:
  - cloud
  - methodology
author:
  - jacgit18
  - chatgpt
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: Done
Started: 2024-03-23
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---
# **Infrastructure as Code:**  
- IaC is a methodology within [[Cloud Service Model]] to manage and provisioning infrastructure resources using machine-readable configuration files or scripts, rather than manually configuring infrastructure components through graphical user interfaces (GUIs) or command-line interfaces (CLIs).  
- With IaC, infrastructure configurations are defined in code (e.g., YAML, JSON, or programming languages like Terraform, CloudFormation, or Ansible). These configuration files or scripts describe the desired state of the infrastructure, including servers, networks, storage, security policies, and dependencies.  
- IaC enables infrastructure to be treated as code, allowing for version control, code review, and automated testing of infrastructure changes. It also facilitates the automation of infrastructure provisioning and management, ensuring consistency, repeatability, and scalability.  
- By adopting IaC practices, organizations can achieve infrastructure agility, improve collaboration between development and operations teams (DevOps), and accelerate the deployment of applications and services in a cloud environment.  

**Infrastructure as Code (IaC)** is fundamentally about automation, but where it falls within the **IaaS vs. PaaS** spectrum depends on how it's used and the specific service involved.

- **IaC as IaaS**:
    - When using IaC to provision raw infrastructure (e.g., EC2 instances, VPCs, security groups, databases), it aligns with **Infrastructure as a Service (IaaS)**.
    - Example: AWS **CloudFormation**, Terraform, and Ansible, when used to manage VMs, networking, and storage.

- **IaC as PaaS** (Overlap):
    - If IaC is used to manage higher-level **platform services** (e.g., AWS Lambda, AppRunner, ECS Fargate), it starts to **bleed into PaaS** territory.
    - Example: Using CloudFormation or Terraform to **deploy serverless applications** on AWS Lambda or AWS Elastic Beanstalk.


### **Why Does It Overlap?**

The distinction between **IaaS** and **PaaS** isn’t always rigid. Many IaC tools can provision both raw infrastructure (IaaS) and managed services (PaaS). The boundary depends on **what is being automated**:

- **Provisioning virtual machines & networking → IaaS**
- **Deploying applications to a fully managed service → PaaS**

So, while **CloudFormation, Terraform, and similar IaC tools generally fall under IaaS**, they **can extend into PaaS when managing higher-level AWS services**.
  
In summary, while IaaS provides virtualized infrastructure resources as a service, IaC is a practice for managing and provisioning infrastructure resources using code-based configuration files or scripts. IaaS is a service model offered by cloud providers, while IaC is a methodology for automating and managing infrastructure deployments in a cloud-native or hybrid environment.