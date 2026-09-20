# Exploratory Data Analysis: Analysing Beer Production in the US

## Assignment Details

- **Assignment ID:** EDA/01
- **Total Marks:** 200
  - 130 for code notebook
  - 70 for report

## Problem Statement

### Objective

This assignment helps you apply Exploratory Data Analysis (EDA) in a real-world scenario. In addition to EDA techniques, you are expected to build an understanding of how analytics supports business narratives and actionable insights.

### Business Value

In this case study, you will analyze the US beer market. The goal is to identify trends in:

- Usage patterns of different brewing materials
- State-wise beer production
- Distribution across brewery sizes

Based on the analysis, you should infer:

- High-growth regions
- Suitable brewery size
- Preferred production types
- Recommendations on locations, production quantities, and success strategies

## Dataset Overview

### Context

The dataset is sourced from the Alcohol and Tobacco Tax and Trade Bureau (TTB), USA. It contains beer production data across states, production materials, and brewer-size categories.

### Content

The dataset has three tables:

- **beer_states.csv:** State-level beer production by year (2008-2019)
- **brewer_size.csv:** Number of brewers by production size by year (2008-2019)
- **brewing_materials.csv:** Monthly beer statistics aggregated across the US (2008-2017)

The data dictionary is available in the starter notebook.

### Acknowledgements

The dataset is publicly available on the TTB website and GitHub. For this assignment, download it only from the learning platform.

## Scoring and Penalty

- **Total Marks:** 200
- **Extension and penalty:** As per the learner handbook

## Instructions

1. Attempt this assignment individually.
2. Use **Python** for programming.
3. Perform all analysis in the provided starter notebook only.
4. Do not modify existing headings, subheadings, questions, or tasks in the notebook.
5. Use only the following libraries: **NumPy, Pandas, Matplotlib, Seaborn, Plotly**.
6. Handle inconsistencies and outliers as per your understanding, and mention your approach in the report.
7. You may use web/AI tools for conceptual learning, but plagiarized code is prohibited and purely AI-generated code is strongly discouraged.
8. Plagiarized or purely AI-generated submissions will attract significant penalties.
9. You are encouraged to add this assignment to your GitHub profile as portfolio work.

## Submission Guidelines

1. Upload solution files in the submission field.
2. Submit exactly two files:
   - An **Interactive Python Notebook** (`.ipynb`) containing your code
   - A **Report Document** (`.pdf`) containing visualizations, analysis, insights, and outcomes
3. Both files must be generated from the provided starter files.
4. Include your name and assignment title in both notebook and report in the format:

   `EDA_Beer_Production_Analysis_<your_name>`

5. Mention all assumptions in the report.
6. Ensure all tasks from the starter notebook are answered in the report.
7. Include the generated plots/graphs in the report.

## Results Expected from Learners

Present the overall approach of the analysis in a report document. Mention the problem statementand the analysis approach briefly.In the starter notebook, you will find headings, subheadings, and checkpoints stating the tasksyou need to perform.  The marks associated with each checkpoint will also be mentioned in thenotebook. Keep in mind not to edit the cells with marking schemes and questions. You can find abrief description of the tasks below.

## 1. Data Cleaning [20 Marks]

1. **Fixing Columns** [5 marks]
2. **Fixing Rows** [5 marks]
3. **Handling Missing Values** [5 marks]
4. **Handling Outliers and Standardisation** [5 marks]

### Hints
- Note that it is not necessary to replace the missing value in EDA, if you have to replaceit, what should be the approach? Mention the approach.
- Identify if there are outliers in the dataset. Also, mention why you think it is an outlier.Again, remember that for this exercise, it is not necessary to remove any data points.

## 2. Exploratory Data Analysis Tasks [100 Marks]

### a) `beer_states.csv` [40 marks]

1. Classify variables as categorical and numerical.
2. Calculate total production, average production, and state-wise percentage share across years.
3. Identify top five and bottom five states.
4. Visualize the proportion of different production types.
5. Describe and compare values across production types.
6. Create a heatmap of production by state across years.
7. Visualize production trends for different states.
8. Analyze average growth rates for these states.
9. Analyze trends in production types and identify growth/decline.
10. Identify growing and slowing production types in top states.
11. Conclude with key results.

### b) `brewing_materials.csv` [30 marks]

1. Classify variables as categorical and numerical.
2. Calculate year-wise production by broad material types.
3. Calculate year-wise production by individual materials.
4. Visualize proportion of usage of various materials.
5. Visualize monthly usage trends of various materials.
6. Compare trends with corresponding periods in prior years.
7. Draw insights for months with high production.
8. Conclude with key results.

### c) `brewer_size.csv` [30 marks]

1. Classify variables as categorical and numerical.
2. Analyze distribution of brewer sizes over time.
3. Analyze how brewer contribution changes over time.
4. Investigate correlation between brewer size and taxable volume.
5. Visualize shipped beer volume trends across different brewer sizes.
6. Conclude with key results.

## 3. Conclusion [10 marks]

Final insights and recommendations:

- Conclude the analysis, draw final insights and propose recommendations
- Explain the results of univariate, segmented univariate, bivariate analysis, etc. in businessterms.
- Include visualisations and summarise the most important results in the report. You arefree to choose the graphs which explain the numerical/categorical variables.  Insightsshould explain why the variable is important

## Evaluation Guidelines

The following rubric dimensions are used for evaluation.

### 1) Data Understanding

**Meets expectations**

- Data quality issues are correctly identified and reported.
- Variable meanings are correctly interpreted in comments or text.

**Does not meet expectations**

- Missing values, outliers, and other quality issues are overlooked or incorrectly identified.
- Variable meanings are incorrect or not explained.

### 2) Data Cleaning and Manipulation

**Meets expectations**

- Data quality issues are handled appropriately.
- Variables are converted into suitable formats where needed.
- String/date manipulation is performed correctly.

**Does not meet expectations**

- Quality issues are not handled correctly.
- Variables are not converted to analysis-friendly formats.
- String/date manipulations are incorrect or unnecessarily complex.

### 3) Data Analysis (EDA)

**Meets expectations**

- Analysis is aligned with business goals and follows a clear structure.
- Important driver variables are identified.
- Useful metrics are derived and well justified.
- Multivariate analysis identifies meaningful variable combinations.
- Insights are clearly explained.
- Appropriate and readable plots are used with proper labels.

**Does not meet expectations**

- Analysis is not aligned with business goals or lacks structure.
- Important drivers are missed due to shallow analysis.
- Derived metrics are missing, unjustified, or poorly used.
- Multivariate analysis is weak or incorrect.
- Key insights are missing.
- Relevant visualizations are missing or poorly chosen.

### 4) Conciseness and Readability of Code

**Meets expectations**

- Code is concise, correct, and uses built-in functions/libraries where appropriate.
- Repetitive tasks are handled via custom functions.
- Variable naming and comments are clear and helpful.

**Does not meet expectations**

- Code is unnecessarily long and complex.
- Repetitive logic is duplicated instead of abstracted.
- Readability is poor due to vague names or missing comments.
