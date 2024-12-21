---
excalidraw-plugin: parsed
tags:
  - distributedSystem
author:
  - jacgit18
Comments: Placeholder comment any thing else you want to mention about the document.
Purpose: This documentation discusses
Status: Refinement
Started: 2024-04-13T00:00:00.000Z
EditDate: 
Relates: 
excalidraw-open-md: true
dg-publish: 
Version: "1.0"
Salary: 62,400
IdealSalary: 130,000
CurrentTaxRate: 23.4
IdealSalaryTaxRate: "30.6"
Days: "7"
TotalWeeks: "52"
WorkDays: 5
AnnualHSA: 
MontltyHSA: 165.38
HDHP: 218.99
---
### **Rough Financial Breakdown**
- **Margin Account:** Minimum deposit required: $2,000 if you want to short stocks (not part of the budget at the moment).
- You can allocate a maximum of **$1,800** for meal prep, assuming bills are deferred until after June.

```dataviewjs
const { IdealSalary: IdealSalary, Days: Days, TotalWeeks: TotalWeeks, Salary: Salary, WorkDays: WorkDays  } = dv.current();



dv.paragraph(`Want to be at **$${IdealSalary}** in a year currently at **$${Salary}**:`);

dv.paragraph(` - **$50** per hour, working **${Days}** days a week for **${TotalWeeks}** weeks. `);

dv.paragraph(`- **$62.50 to $64** per hour, working **${WorkDays}** days a week for **${TotalWeeks}** weeks. `);

dv.paragraph("<br>");
```
Average median net worth for 30-year-old is $30,000  
75% tile is about above 90,000 to 120,000  
The 90% tile is 250,000

after spending for necessary things like housing will be at average if you get apartment before end of 2025

### **Payment Breakdown for Employment**
- **HSA:** $165.38
- **Health Insurance:** $218.99
- HSA and HDHP $394.60
- **Monthly Income (Before Taxes):** $4,800

- **Annual Pre-Tax Income:** $62,400 - 4,735.20 = $57,664.80
- **Annual After-Tax Income:** 57,664.80 update later 

- **Monthly Income After Insurance/Savings (Before Taxes):** $4,405.40
- **After Taxes (Net):** $3,600.38 Update later

```dataviewjs
const { IdealSalary: IdealSalary, Days: Days, TotalWeeks: TotalWeeks, Salary: Salary, WorkDays: WorkDays  } = dv.current();



dv.paragraph(`Want to be at **$${IdealSalary}** in a year currently at **$${Salary}**:`);

dv.paragraph(` - **$50** per hour, working **${Days}** days a week for **${TotalWeeks}** weeks. `);

dv.paragraph(`- **$62.50 to $64** per hour, working **${WorkDays}** days a week for **${TotalWeeks}** weeks. `);

dv.paragraph("<br>");
```