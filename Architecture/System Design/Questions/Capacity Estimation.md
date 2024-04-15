---
tags: 
author:
  - gitUserNamePlaceHolder
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: 
Started: 2024-04-14
EditDate: 
Relates: 
Peer Reviewed: 0
dg-publish:
---
Ask about or come up with DAU(Daily Active User) use a easy consistent value that's easy to calculate also consider ratios.

Active Userbase of 200,000,000

#### Storage
You should be concerned with writes here only because we need to know how much data we need to store.

| Unit       | Equivalent in Bytes                           | Place       |       |
| ---------- | --------------------------------------------- | ----------- | ----- |
| 1 Byte     | 1                                             | Hundred     | 10^2  |
| 1 Kilobyte | 1,024 Bytes                                   | Thousand    | 10^3  |
| 1 Megabyte | 1,024 Kilobytes = 1,048,576 Bytes             | Million     | 10^6  |
| 1 Gigabyte | 1,024 Megabytes = 1,073,741,824 Bytes         | Billion     | 10^9  |
| 1 Terabyte | 1,024 Gigabytes = 1,099,511,627,776 Bytes     | Trillion    | 10^12 |
| 1 Petabyte | 1,024 Terabytes = 1,125,899,906,842,624 Bytes | Quadrillion | 10^15 |

| Calculation              | Result                                    |         |
| ------------------------ | ----------------------------------------- | ------- |
| 60 seconds * 60 minutes  | 3,600 seconds per hour use 4,000          | Monthly |
| 3,600 seconds * 24 hours | 86,400 seconds per day use 80,000         | Daily   |
| 86,400 seconds * 30 days | 2,592,000 seconds per month use 2,400,000 | Seconds |
##### Writes per Day
> POST, PUT, DELETE
- Post Comment
- Post Like
- Not in scope for storage estimation
	- Post unlike
	- Update Comment 
	- Delete Comment

Monthly total storage size needed  = average size of comments + average size of likes = 10KB  

Average user Post about 20 comments and 10 likes = 30 Post 

Write per Month = Active Userbase of 200,000,000M * 30 avg user post = 6,000,000,000B 

Write per day = Write per Month/ 30 = 200,000,000M 

write per sec = 200M/ 4000 * 20(secs in day est) = 200M/ 80K = 200M /100k = 2,000 writes a sec


Daily storage for writes = Monthly total storage size needed * Write per day 
10KB * 200M = 10(10^3) * 200(10^6) = 200,000,000M = 2TB

Retention Period = 5 years  
  
5 Year Storage =  5 * 400(Rounded year day) * 2TB(new data per day) = 2K(10^3) * 2,000,000,000 GB(10^9) = 20(10^12) = 4PB
  
Data replication which is typically done 3 to 5 times  

Data replication = 4PB * 3 = 12TB

Yearly storage:(12TB* 400 days) = 4800 TB = 4.8 PB 

Side Note
**Language approximations**
You have 500K words in English language  
A line of text contains 10 words  
A word contains 5 characters which is 5 bytes  
  
**Media approximation**
HD image 3MB  intstagram or facebook post
Size of image = height x width x bit depth
1280 x 720 x 24bits or 3 Bytes
1k * 1K * 3 = 3,000,000 = 3MB

Profile image(300x300) 300KB  
1 Min HD Video = 50MB

Video size is calculated by
FrameSize x FrameRate(FPS) x Compression Ratio x Video Duration(# Sec)

3MB * 30FPS * 1/100 * 60(sec) = 90MB * 1/100 * 60 = 90MB *  60 /100 = 5,400MB/ 100 = 54MB = 50MB

  
For something like YouTube you would probably use other resolutions like: 480p, 360P, 240P, 144P
#### Network Traffic



#### Memory Caching


#### Bandwidth


### App Server Estimations