# **Beer Production Analysis**

## Objective

In this case study you’ll be learning Exploratory Data Analytics (EDA) with the help of a dataset on beer production statistics in the US. This will enable you to understand why EDA is an important step in the process of Machine Learning.

## Tasks

You need to perform the following steps for successfully completing this assignment.
1. Data Loading
2. Data Cleaning
3. Exploratory Analysis: Bivariate and Multivariate
4. Creating Visualisations to Support the Analysis
5. Deriving Insights and Stating Conclusions

## Data Understanding

The data comes from the Alcohol and Tobacco Tax and Trade Bureau of USA(TTB). You can find the source to the repository containing the data here: [Beer Production GitHub](https://github.com/rfordatascience/tidytuesday/tree/master/data/2020/2020-03-31)

<br>
The dataset contains three tables, in which you can find these details:

* `beer_states.csv` State-level beer production by year (2008-2019)
* `brewer_size.csv` Number of brewers by production size by year (2008-2019)
* `brewing_materials.csv` Monthly beer stats aggregated across the US (2008-2017)


Some considerations:
* A barrel of beer for this data is 31 gallons
* Removals = "Total barrels removed subject to tax by the breweries comprising the named strata of data", essentially how much was produced and removed for consumption.

### Data Description

`brewing_materials.csv`

|variable         |class     |description |
|:----------------|:---------|:-----------|
|data_type        |character | Pounds of Material|
|material_type    |character | Grain product, Totals, Non-Grain Product (basically hops vs grains)|
|year             |double    | Year |
|month            |integer   | Month |
|type             |character | Actual line-item from material type |
|month_current    |double    | Current number of barrels for this year/month |
|month_prior_year |double    | Prior year number of barrels for same month |
|ytd_current      |double    | Cumulative year to date of current year |
|ytd_prior_year   |double    | Cumulative year to date for prior year |

<br>

`beer_states.csv`

|variable |class     |description |
|:--------|:---------|:-----------|
|state    |character | State abbreviated |
|year     |integer   | Year |
|barrels  |double    | Barrels produced within each type |
|type     |character | Type of production/use (On premise, Bottles/Cans, Kegs/Barrels) |

<br>

`brewer_size.csv`

|variable         |class     |description |
|:----------------|:---------|:-----------|
|year             |integer   | Year  |
|brewer_size      |character | Range of production for brewer size, number of barrels produced |
|n_of_brewers     |double    | Number of brewers at that brewer size |
|total_barrels    |double    | Total barrels of beer produced at that brewer size |
|taxable_removals |double    | Taxable barrels for removals - removals for consumption under taxation |
|total_shipped    |double    | Total barrels shipped - produced beer that is not taxed |

**NOTE**: The marks given along with headings and sub-headings are cumulative marks for those particular headings/sub-headings.<br>
The actual marks for each task are specified within the tasks themselves.

For example, marks given with heading *2* or sub-heading *2.1* are the cumulative marks, for your reference only. <br>

The marks you will receive for completing tasks are given with the tasks. Suppose the marks for two tasks are as follows:
* 2.1.1 [3 marks]
* 3.2.2 [2 marks]

You will earn 3 marks for completing task 2.1.1 and 2 marks for completing task 3.2.2.