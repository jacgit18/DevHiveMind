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
total sums is calculate using array length

```javascript
var missingNumber = function(nums) {
    const n = nums.length;

    let totalSum = (n * (n + 1)) / 2;


    let arraySum = nums.reduce((acc, curr) => acc + curr, 0);


    return totalSum - arraySum; 
};
```

