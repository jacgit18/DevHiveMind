---
tags:
  - web
  - frontend
  - library
  - redux
author:
  - jacgit18
  - chatgpt
Comments: This documentation is a code snippet showing a Redux action for buying ice cream.
Status: Done
Started: 
EditDate: 2024-02-08
Relates: 
Peer Reviewed: "1"
---
```jsx
export const BUY_ICECREAM = 'BUY_ICECREAM'

import { BUY_ICECREAM } from './iceCreamTypes';

export const buyIceCream = () => {
  return {
    type: BUY_ICECREAM
  };
};
```

