---
tags:
  - scaling
  - revist
  - review
  - systemDesign
author:
  - jacgit18
Status: refinement
Started: 
EditDate: 
Relates:
---
![[System Scaling.png]]
# Horizontal scaling  

Horizontal scaling (aka scaling out) refers to adding additional nodes or machines to your infrastructure to cope with new demands. If you are hosting an application on a server and find that it no longer has the capacity or capabilities to handle traffic, adding a server may be your solution. 

It is quite similar to delegating workload among several employees instead of one. However, the downside of this may be the added complexity of your operation. You must decide which machine does what and how your new machines work with your old machines.  

You can consider this the opposite of vertical scaling. 

## Advantages of horizontal scaling 

Scaling is easier from a hardware perspective - All horizontal scaling requires you to do is add additional machines to your current pool. It eliminates the need to analyze which system specifications you need to upgrade. 

Fewer periods of downtime - Because you’re adding a machine, you don’t have to switch the old machine off while scaling. If done effectively, there may never be a need for downtime and clients are less likely to be impacted. 

Increased resilience and fault tolerance - Relying on a single node for all your data and operations puts you at a high risk of losing it all when it fails. Distributing it among several nodes saves you from losing it all.  

Increased performance - If you are using horizontal scaling to manage your network traffic, it allows for more endpoints for connections, considering that the load will be delegated among multiple machines.    

## Disadvantages of horizontal scaling 

Increased complexity of maintenance and operation - Multiple servers are harder to maintain than a single server is. Additionally, you will need to add software for load balancing and possibly virtualization. Backing up your machines may also become a little more complex. You will need to ensure that nodes synchronize and communicate effectively.  

Increased Initial costs - Adding new servers is far more expensive than upgrading old ones.    

# Vertical scaling  

Vertical scaling (aka scaling up) describes adding additional resources to a system so that it meets demand. How is this different from horizontal scaling?  

While horizontal scaling refers to adding additional nodes, vertical scaling describes adding more power to your current machines. For instance, if your server requires more processing power, vertical scaling would mean upgrading the CPUs. You can also vertically scale the memory, storage, or network speed. 

Additionally, vertical scaling may also describe replacing a server entirely or moving a server’s workload to an upgraded one.  

## Advantages of vertical scaling 

Cost-effective - Upgrading a pre-existing server costs less than purchasing a new one. Additionally, you are less likely to add new backup and virtualization software when scaling vertically. Maintenance costs may potentially remain the same too. 

Less complex process communication - When a single node handles all the layers of your services, it will not have to synchronize and communicate with other machines to work. This may result in faster responses. 

Less complicated maintenance - Not only is maintenance cheaper but it is less complex because of the number of nodes you will need to manage.  

Less need for software changes - You are less likely to change how the software on a server works or how it is implemented.          

## Disadvantages of vertical scaling 

Cost-effective - Upgrading a pre-existing server costs less than purchasing a new one. Additionally, you are less likely to add new backup and virtualization software when scaling vertically. Maintenance costs may potentially remain the same too. 

Less complex process communication - When a single node handles all the layers of your services, it will not have to synchronize and communicate with other machines to work. This may result in faster responses. 

Less complicated maintenance - Not only is maintenance cheaper but it is less complex because of the number of nodes you will need to manage.  

Less need for software changes - You are less likely to change how the software on a server works or how it is implemented.



# Microservice Scaling
At a higher scope, in terms of microservices, you can apply both vertical and horizontal scaling as well. Vertical scaling might involve optimizing the performance of a single microservice, while horizontal scaling can involve deploying multiple instances of a microservice to handle increased loads. This is a common approach in microservices architectures to achieve scalability and fault tolerance.


## Horizontal Scaling (Microservices):
   - In microservices, horizontal scaling means adding more instances of the same service to distribute the load and improve redundancy.
   - Instead of making a single service more powerful, you add more identical instances of the service to handle more requests and increase fault tolerance.
   - Horizontal scaling is beneficial when the system needs to handle increased traffic and needs redundancy and high availability.


## Vertical Scaling (Microservices):
- In microservices architecture, vertical scaling involves increasing the resources (CPU, memory, etc.) of a single service or component to handle increased load or demand.
   - This means that you're making the existing service more powerful by adding more capacity to it.
   - Vertical scaling is suitable when a specific microservice is a performance bottleneck, and you want to optimize it by enhancing its capabilities.

