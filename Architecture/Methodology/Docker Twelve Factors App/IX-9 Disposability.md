---
tags: 
author:
  - jacgit18
Status: 
Started: 
EditDate: 
Relates:
---
Disposability: **The twelve-factor app’s processes are  _disposable_, meaning they can be started or stopped at a moment’s notice.** This facilitates fast elastic scaling, rapid deployment of code or config changes, and robustness of production deploys. Docker containers align with this factor very strongly especially when you have proper [[Process Isolation]] in your codebase disposibility is enhanced. If a container fails or needs to be replaced, it can be easily terminated and a new one can take its place, ensuring the overall system's availability and resilience.

![[Twelve Factor App Disposability]]