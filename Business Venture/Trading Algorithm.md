---
tags:
  - eventNotes
  - finance
  - programming
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
# Personal Trading Algorithm Tech Stack

To build a personal trading algorithm on the side while keeping costs low, maintaining flexibility, and eventually scaling to other users, here’s a cost-effective and scalable tech stack using Python and open-source tools.

## 1. Language: Python
**Why?**
- Python is free, widely used in finance, and has a vast ecosystem of libraries for trading, data analysis, and machine learning.
- Popular libraries for trading:
  - Pandas (data manipulation)
  - NumPy (numerical computing)
  - TA-Lib (technical analysis)
  - Backtrader or Zipline (backtesting frameworks)

## 2. Cloud Computing: AWS/GCP/Azure (Free or Low-Tier Services)
- Host your algorithm using cloud services like AWS Lambda, Google Cloud Functions, or Azure Functions to handle tasks like data ingestion and trade execution.
- Use AWS Free Tier or Google Cloud Free Tier to keep hosting costs low.

## 3. Data Providers: Free and Low-Cost APIs
- Use free or low-cost market data APIs:
  - Alpha Vantage
  - Yahoo Finance
  - Polygon.io
- For scaling, consider more robust data providers like IEX Cloud or Quandl at a reasonable price.

## 4. Broker API Integration
- **Alpaca or Interactive Brokers**: Commission-free trading (depending on the region) and free APIs.
  - Alpaca is simple to use and commission-free.
  - Interactive Brokers has a more complex API but offers access to more markets.

## 5. Database: SQLite or PostgreSQL
- Use **SQLite** for a lightweight, free database to store historical data and track trades.
- **PostgreSQL** is more robust and scalable, offering a free tier on cloud platforms.

## 6. Backtesting: Backtrader or Zipline
- **Backtrader**: An open-source framework for developing and testing strategies with historical data.
- **Zipline**: A backtesting engine used by Quantopian (now defunct), focused on Python.

## 7. Deployment: Docker and GitHub Actions
- **Docker**: Package your app into containers for easy deployment across platforms.
- **GitHub Actions**: Automate tests and deployments using GitHub’s free CI/CD platform.

## 8. Visualization and Dashboards: Plotly or Streamlit
- **Plotly**: Create interactive charts.
- **Streamlit**: Build lightweight web apps or dashboards to monitor algorithm performance.

## 9. Message Alerts: Twilio/Telegram API
- Use **Twilio** or **Telegram** to send real-time trade alerts or notifications to your phone.

## 10. Security: Free SSL and Firewalls
- Use **Let’s Encrypt** for free SSL certificates.
- Leverage built-in firewalls and security tools from cloud providers to protect your infrastructure.

## Cost Management
- Stick to **free** or **freemium** tiers (AWS Free Tier, Alpha Vantage, GitHub, etc.).
- Pay only for minimal infrastructure as your user base grows or you need more features (premium APIs, more compute resources, etc.).

### Conclusion
By using Python, free or low-cost APIs, and cloud services with free tiers, you can start your trading algorithm with minimal costs and the flexibility to scale as needed. This tech stack allows you to begin quickly and expand without a large upfront investment.


## LumiWealth Notes

- **Backtesting:** A process used to evaluate the effectiveness of a trading strategy by running it against historical data.
- **Iron Condors:** An options strategy involving four different contracts, aiming to profit from low volatility in the underlying asset.

### Key Concepts
- **Foreign Crypto and Forex:**
    - Avoid Forex markets in **Australia** due to regulatory complexities.
    - The **Forex market** is the largest in the world, but trading profitably, especially through **shorts**, is challenging.
### Data and Platforms
- **Polygon:** A popular data source for market and cryptocurrency data.
- **Backtest Data Sources:** Consider using Polygon, Yahoo Finance, or Alpha Vantage for historical market data.
- **API Integration:** Directly connect to trading APIs to access real-time data and automate trades.

### Tools and Platforms
- **MQL5:** A programming language used for coding trading strategies and automating trades on the MetaTrader platform.

### Trading Floor and High-Level Strategies

- **Work on the Trading Floor:** Learning from real-world trading experiences can help elevate your skills.
- **Zero Commission Trading:** Look for platforms offering commission-free trading, like Tradear or Traderear, to reduce costs.