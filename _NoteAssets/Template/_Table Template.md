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
It seems there's still an issue with the parsing of the DataView query. Let's simplify the structure and try again:

```markdown
```dataview
table UserID, UserName, PhoneNum
from [[User]]
sort UserID

---

table RegionID, UserID as ForeignUserID, RegionName
from [[Region]]
sort RegionID
```
```