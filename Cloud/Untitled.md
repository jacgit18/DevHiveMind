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
### **Three Security Best Practices**

In this lesson, we will explore three essential security best practices that are crucial for maintaining a secure environment. These are:

- Follow the principle of least privilege.
    
- Protect data at rest and in transit.
    
- Regularly audit your system for changes, unauthorized access, unusual patterns, or errors.
    

**Follow the Principle of Least Privilege**

Amazon API Gateway serves as the entry point to your application, making it a critical area to secure and prevent unauthorized access to your APIs.

1. Leverage AWS managed services to minimize the complexity of security management.
    
2. Consider security across your entire system, evaluating each integration point in your distributed architecture.
    
3. Use narrowly scoped IAM roles and permissions to restrict access to Lambda functions and other AWS services.
    
4. Break down Lambda functions into smaller, focused tasks and avoid sharing IAM roles between functions.
    
5. For passing data between Lambda functions, utilize environment variables, AWS Systems Manager Parameter Store, or AWS Secrets Manager.