
**Lets say we have 2:1 ratio of Likes to Comments**
Active Userbase size = 200,000,000
AVG likes per user in month = 100 posts  
AVG comments per user in month = 50 posts 
Post per user in month = 150

###### Data Size 
AVG likes size = 90 byte(adjusted for meta data)

AVG comments size = 
40(words) * 5(char) * 1byte = 
200 byte(adjusted for meta data)

Total post size per user = round to 300 bytes 

Total Monthly Post size = 150 Post per user in month * 300 bytes Total post size per user = 45,000 bytes = 43.95KB = 44KB

Monthly Post Storage Requirement = AU size 200M * Total post size 300 bytes * 150 monthly post = 9,000,000,000,000 bytes = 8.18TB = 8TB


Total writes per day = 200,000,000 AU * 45,000 bytes Total Monthly Post size / 30 = 300,000,000,000 bytes = 286.1MB = 300MB


Total write per sec = 300,000,000,000 bytes/ 4000 * 20(secs in day est) = 300,000,000,000 bytes/ 80K = 300,000,000,000 bytes /100k = 300GBps

> Data replication which is typically done 3 to 5 times  


Data replication =  Monthly Post Storage Requirement * 3 = 11.4TB


Year Storage =  1 * 400(Rounded year day) * 3.8 TB = 400 * 3.8 TB = 1520 TB

5 Year Storage = Year Storage * 5 = 7600TB

>When calculating storage for multiple years, it's essential to consider potential growth in data volume over time. A linear projection may not accurately reflect real-world growth patterns.