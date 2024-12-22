---
excalidraw-plugin: parsed
tags:
  - favorite
  - finance
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
Salary: 62400
IdealSalary: 130000
CurrentTaxRate: 23.4
IdealSalaryTaxRate: 30.6
Days: 7
TotalWeeks: 52
WorkDays: 5
AnnualHSA: 4300
MonthlyHSA: 165.38
HDHP: 218.99
monthlyPreTaxIncome: 4800
---
### **Rough Financial Breakdown
#todo/purchases/assets
- [ ] Get a **Margin Account:** Minimum deposit required: $2,000 if you want to short stocks (not part of the budget at the moment).

- You can allocate a maximum of **$1,800** for meal prep, assuming bills are deferred until after June.

```dataviewjs
const { IdealSalary, Days, TotalWeeks, Salary, WorkDays } = dv.current();
const { AnnualHSA, MonthlyHSA, HDHP, monthlyPreTaxIncome } = dv.current();
const [monthlyHSA, hdhp] = [MonthlyHSA, HDHP].map(n => Number(n) || 0);

const postDeductionIncome = monthlyPreTaxIncome - hdhp - monthlyHSA 
// Format salary with commas for better readability
const formatCurrency = amount => `$${parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;


dv.paragraph(`Want to be at **${formatCurrency(IdealSalary)}** in a year, currently at **${formatCurrency(Salary)}**:`);
dv.list([
  `**$50** per hour, working **${Days}** days a week for **${TotalWeeks}** weeks.`,
  `**$62.50 to $64** per hour, working **${WorkDays}** days a week for **${TotalWeeks}** weeks.`
]);


// Display the payment breakdown
dv.header(3, "Payment Breakdown for Employment");
dv.list([
	`**Annual HSA Limit:** ${formatCurrency(AnnualHSA)}`,
	`**Monthly HSA Contribution:** ${formatCurrency(monthlyHSA)}`,
	`**HDHP (Health Insurance):** ${formatCurrency(hdhp)}`,
	`**Total Pre-tax Money:** ${formatCurrency(hdhp + monthlyHSA)}`,
	`**Current Monthly Pre Tax Income:** ${formatCurrency(monthlyPreTaxIncome)}`,
	`**Monthly Income After Pre Tax Deduction:** ${formatCurrency(postDeductionIncome)}`,

	`**Annual Salary After Pre Tax Deduction:** ${formatCurrency(postDeductionIncome  * 12)}`,
	
	`**Monthly Income After Taxes:** ${formatCurrency()}`,
	`**Annual Income After Taxes:** ${formatCurrency()}`,

]);

```

Average median net worth for 30-year-old is $30,000  
75% tile is about above 90,000 to 120,000  
The 90% tile is 250,000

after spending for necessary things like housing will be at average if you get apartment before end of 2025




- **Monthly Income After Insurance/Savings (Before Taxes):** $4,405.40
- **After Taxes (Net):** $3,600.38 Update later


To calculate the difference in taxes between being taxed on $62,400 and $53,000, let's break it down step by step. We'll assume you're filing as a single taxpayer and use the 2024 U.S. federal tax brackets:  
  
2024 Federal Tax Brackets for Single Filers:  
  
10%: $0 – $11,000  
  
12%: $11,001 – $44,725  
  
22%: $44,726 – $95,375  
  
  
  
---  
  
Step 1: Taxes on $62,400  
  
1. First $11,000 → Taxed at 10% = $1,100  
  
  
2. Next $33,725 ($44,725 - $11,000) → Taxed at 12% = $4,047  
  
  
3. Remaining $17,675 ($62,400 - $44,725) → Taxed at 22% = $3,888.50  
  
  
  
Total taxes on $62,400 = $1,100 + $4,047 + $3,888.50 = $9,035.50  
  
  
---  
  
Step 2: Taxes on $53,000  
  
1. First $11,000 → Taxed at 10% = $1,100  
  
  
2. Next $33,725 ($44,725 - $11,000) → Taxed at 12% = $4,047  
  
  
3. Remaining $8,275 ($53,000 - $44,725) → Taxed at 22% = $1,820.50  
  
  
  
Total taxes on $53,000 = $1,100 + $4,047 + $1,820.50 = $6,967.50  
  
  
---  
  
Step 3: Difference in Taxes  
  
$9,035.50 (taxes on $62,400) - $6,967.50 (taxes on $53,000) = $2,068  
  
By reducing your taxable income from $62,400 to $53,000 (due to the $400 monthly pre-tax deduction), you save $2,068 in federal taxes annually.  
  
  
---  
  
Effective Tax Rates  
  
On $62,400: $9,035.50 ÷ $62,400 = 14.5%  
  
On $53,000: $6,967.50 ÷ $53,000 = 13.1%  
  
  
This means your effective tax rate drops by 1.4% with the pre-tax deduction.




---

### **Current Monthly Expenses**
1. **Funeral  Plot Payment:** $45 (Payment pulled from Chase, then Cap to show on statements)
2. **Gym:** $180
3. **Food:** $150
4. Health insurance $218.99

---

### **Current Monthly Investment**

#### **Roth IRA Contributions**
- **Automated Roth IRA:**
    - $250 sent each quarter ($1,000 annually).
    - Accounts for ~16% of the $7,000 max contribution.

- **Manual Roth IRA:**
    - $500 transferred monthly ($6,000 annually).

- **Total Roth IRA Contributions:**
    - **$7,000 annually** (max allowed).

#### **Brokerage Contributions**
- **Regular Brokerage:**
    - $50/month = **$600 annually**.
- **Robo Bond Portfolio:**
    - $100/month = **$1,200 annually**.
- **Note:** Consider lowering contributions for the robo and regular brokerage accounts. Bonds are a more stable asset class and can be used for loans, unlike Bond ETFs.

#### **HSA Contributions**
- **Health Savings Account (HSA):**
    - $4,300 annually = ~$358.33/month.

#### **Life Insurance Premium**
- **Current Life Insurance Policy:**
    - $304.44 annually = ~$76.11/quarter.

- **Ideal Life Insurance Policy (with added benefits):**
    - $8,492.59 annually = ~$2,123.14/quarter.

- **Current Cash Value of Life Insurance:** $1,507.41.
- With future contributions, the cash value could reach ~$10,000, making it eligible for a loan against the policy.

---

### **Annual Total Contributions**
#### Ideal Asset Breakdowm
Assuming higher budget
1. Real Estate (50%):
$$
\text{Real Estate Allocation} = 23,000 \times \frac{50}{100} = 11,500
$$

2. Company Stocks (30%):
$$
\text{Company Stock Allocation} = 23,000 \times \frac{30}{100} = 6,900
$$

3. Speculative Investments (18%):
$$
\text{Speculative Allocation} = 23,000 \times \frac{18}{100} = 4,140
$$

5. Gold (2%):
$$
\text{Gold Allocation} = 23,000 \times \frac{2}{100} = 460
$$

Verification:
$$
11,500 + 6,900 + 4,140 + 460 = 23,000
$$


#### Current 
$$\text{Stock Allocation} = 23,000 \times \frac{91.3}{100} = 23,000 \times 0.913 = 21,000$$

Breaking this down into specific allocations:

1. Individual Stocks (40%):
$$
\text{Individual Stocks} = 21,000 \times \frac{40}{100} = 8,400
$$

2. Stock ETFs (30%):
$$
\text{Stock ETFs} = 21,000 \times \frac{30}{100} = 6,300
$$

3. Bonds (15%):
$$
\text{Bonds} = 21,000 \times \frac{15}{100} = 3,150
$$


4. Bond ETFs (10%):
$$
\text{Bond ETFs} = 21,000 \times \frac{10}{100} = 2,100
$$

5. Other Assets (5%) - REITs, Commodities ETFs, etc.:
$$
\text{Other Assets} = 21,000 \times \frac{5}{100} = 1,050
$$

Verification:
$$
8,400 + 6,300 + 3,150 + 2,100 + 1,050 = 21,000
$$

## Non Stock Asset

Crypto, buying buisness or startup investment
$$\text{Speculative Allocation} = 23,000 \times \frac{6.1}{100} = 23,000 \times 0.061 = 1,403$$
Rounded down to **$1,400** for simplicity.

$$\text{Gold Allocation} = 23,000 \times \frac{2.6}{100} = 23,000 \times 0.026 = 598$$
Rounded up to **$600**.


- **Roth IRA:** $7,000
	- 500 a month manual
	- 250 a quarter robo
- **HSA:** $4,300
	- monthly 
- Current **Brokerage:** $1,800 ($600 regular + $1,200 robo) probably lower 
	- adjust once hsa 
- Speculative $1,400
- Gold $600
- **Total Contributions:** **$15,100 annually** (~$1,258.33/month) 


- **Roth IRA:** $7,000
- **HSA:** $4,300
- Ideal **Brokerage:** $9,700  ($4,850 regular + $4,850 robo) includes other assest and margin account
- Speculative $1,400
- Gold $600
- Ideal **Total Contributions:** **$23,000 annually** (~$1,916.66/month) 

---

### **Remaining After Contributions**
- **Annual After-Tax Income:** $62,400
    - **Monthly Income:** ~$4,800
    - **Total Annual Contributions:** $21,592.59
    - **Remaining After Contributions:**  
        $62,400 - $21,592.59 = **$40,807.41** for the year.

- **If Only 6 Months of Work:**
    - $25,000 income - contributions = **$3,407.41 remaining** after contributions.

---

### **Stocks Percentage Calculation**
  $$ \text{Stocks Percentage} = \frac{21,592.59}{23,000} \times 100 \approx 91.3\% $$

If you're making **$60,000 per year** and working for **20 years**, here's the breakdown:

### **Total Income Over 20 Years:**

- **Annual Salary**: $60,000
- **Years Worked**: 20

Total Income = $60,000 × 20 = **$1,200,000** over 20 years.

---

### **Investment Breakdown (Assuming 10.83% Average Return)**

Let’s assume you’re able to invest a portion of your income each year, and your investment portfolio averages a **10.83% annual return**.

#### **Annual Contribution**:

Let’s say you manage to invest **15%** of your annual salary ($60,000), which is $9,000 per year.

#### **Investment Over 20 Years**:

We can calculate the future value of your investments using the formula for compound interest:

FV=P×(1+r)tFV = P \times \left(1 + r\right)^t

Where:

- PP = Annual investment ($9,000)
- rr = Average annual return (10.83%, or 0.1083)
- tt = Time in years (20)

FV=9,000×(1+0.1083)20FV = 9,000 \times \left(1 + 0.1083\right)^{20}

Calculating this gives:

FV=9,000×8.539=76,851FV = 9,000 \times 8.539 = 76,851

So, after **20 years**, if you invest **$9,000 per year** with an average annual return of **10.83%**, your total investment would grow to **$76,851**.

---

### **Total Earnings from Salary + Investment**

Your **total earnings** would consist of your **salary** ($1,200,000) plus the **investment growth** ($76,851):

Total Earnings=1,200,000+76,851=1,276,851\text{Total Earnings} = 1,200,000 + 76,851 = 1,276,851

---

### **Summary Breakdown**:

- **Total Salary**: $1,200,000 over 20 years
- **Investment Growth** (Assuming 10.83% return): $76,851
- **Total Earnings** after 20 years: $1,276,851




