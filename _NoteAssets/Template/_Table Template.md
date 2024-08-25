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
Key: 
TableName: 
Type:
---


```dataview
table UserID, UserName, PhoneNum
from [[Data]]
sort UserID

```



```dataview
table without id File as RegionTable, RegionID, UserID as ForeignUserID, RegionName
from [[Region]]
sort RegionID
```
