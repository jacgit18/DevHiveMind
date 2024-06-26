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
In R, there are multiple ways to list and load available datasets, especially those that come with R packages. Below are some common methods:  
  
### Listing Available Datasets  
  
1. **Using `data()` Function**:  
The `data()` function can be used to list datasets available in currently loaded packages.  
  
```R  
data()  
```  
  
This will display a list of datasets that you can use.  
  
2. **Using `datasets` Package**:  
The `datasets` package in R comes with a variety of built-in datasets. You can list them using:  
  
```R  
library(help = "datasets")  
```  
  
This will show all datasets available in the `datasets` package.  
  
3. **Using `data(package = "packageName")`**:  
To list datasets from a specific package, use the `data()` function with the `package` argument.  
  
```R  
data(package = "datasets")  
```  
  
Replace `"datasets"` with any other package name to see datasets specific to that package.  
  
4. **Using `dplyr` and `tibble` Packages**:  
You can use `dplyr` and `tibble` packages to get a nicely formatted list of datasets.  
  
```R  
library(dplyr)  
library(tibble)  
as_tibble(data(package = .packages(all.available = TRUE))$results)  
```  
  
### Loading Datasets  
  
1. **Using `data()` Function**:  
Once you know the dataset name, you can load it using the `data()` function.  
  
```R  
data(mtcars) # Loads the 'mtcars' dataset  
```  
  
This will load the dataset into the current R environment.  
  
2. **Loading from a Specific Package**:  
If you want to load a dataset from a specific package that is not currently loaded, you need to load the package first and then use the `data()` function.  
  
```R  
library(MASS)  
data(Boston) # Loads the 'Boston' dataset from the 'MASS' package  
```  
  
3. **Using the `datasets` Package**:  
The `datasets` package is loaded by default in R. You can directly load datasets from this package.  
  
```R  
data(iris) # Loads the 'iris' dataset  
```  
  
4. **Reading External Datasets**:  
For datasets not included in R, you can use functions like `read.csv()`, `read.table()`, `readRDS()`, etc., to load datasets from external files.  
  
```R  
mydata <- read.csv("path/to/your/file.csv")  
```  
  
These methods should help you to list and load various datasets in R.