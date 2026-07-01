# Machine Learning
Machine Learning (ML) is a branch of artificial intelligence (AI) that focuses on building systems that can learn from and make decisions based on data—without being explicitly programmed for every specific task.

## Detailed breakdown of Machine Learning

### What It Does
Machine learning enables computers to:
1. Recognize patterns in data
2. Make predictions or decisions
3. Improve performance over time with more data

### Types of Machine Learning
#### Supervised Learning 
Supervised machine learning is a general term for machine learning algorithms in which the training data includes both feature values and known label values. Supervised machine learning is used to train models by determining a relationship between the features and labels in past observations, so that unknown labels can be predicted for features in future cases.
- The model learns from labeled data (e.g., spam vs. not spam).
- Consists of a model that is prepared through training, a process that continues until  a desired level of accuracy is obtained on the training data. 
- The model works under supervision, where you already know what the target answer is, as it requires a label. 
- It works on given sample data or example. 
- Machine Learning Problems:
  - Regression: Regression is a form of supervised machine learning in which the label predicted by the model is a numeric value.
  - Classification: Classification is a form of supervised machine learning in which the label represents a categorization, or class.

#### Unsupervised Learning
Unsupervised machine learning involves training models using data that consists only of feature values without any known labels. Unsupervised machine learning algorithms determine relationships between the features of the observations in the training data.
- The model finds patterns in unlabeled data (e.g., customer segmentation).
- A process that involves learning data that is not labeled by understanding the underlying structure of the data.  
- Machine Learning Problems:
  - Clustering: Dividing objects into clusters that have similarity between them. 
  - Association: Discovering the probability of the co-occurrence of items in a collection. 
  - Dimensional Reduction: Removing redundant and irrelevant data. 
- Pitfalls 
  - Output validation by humans 
  - Computer complexity increases

#### Semi-supervised Learning 
- A process that involves both supervised and unsupervised learning. 
- Process that involves small volume labelled data and large volume of un-labelled data. 
- Machine Leaning Problems:
  - Search Engines 
  - Analysis of images and audio 
- Algorithms 
  - K-Means Clustering 
  - Decision Tree 

#### Reinforcement Learning
- The model learns by trial and error, receiving rewards or penalties (e.g., game-playing AI).
- An AI agent attempting to find the optimal way to accomplish a goal or improve the performance of a task. 
- It works on interacting with the environment. 
- Actors involved 
  - Environment 
  - Agent 
  - State 
  - Action 
  - Reward 
- Algorithms 
  - Markov Decision Process 
  - Q Learning 
- Challenges 
  - Too much reinforcement may lead to overload of states. 
  - Parameters may affect the speed of learning. 
- Uses 
  - Video Games 
  - Personalized Movies 
  - Self-Driving Cars 

### Machine Learning Algorithms

#### [Regression](https://github.com/akashanup/ai_ml/blob/main/MachineLearning/Regression/README.md)
Regression is a form of supervised machine learning in which the label predicted by the model is a numeric value.
- Numerical Outcome  
- Problems it solves: 
  - Salary Forecasting  
  - Insurance Claims  
- Algorithms: 
  - Linear Regression 
  - Logistic Regression 
  - Bayesian Linear Regression 

#### [Classification](https://github.com/akashanup/ai_ml/blob/main/MachineLearning/Classification/README.md)
Classification is a form of supervised machine learning in which the label represents a categorization, or class.
- Process of categorizing a given set of data into classes (target label). 
- It involves assigning a class label to input examples. 
- Categorize into Classes  
- Structured and Unstructured  
- Problems it solves: 
  - Spam Filtering  
  - Image Classification  
  - Web and Text  
- Types: 
  - Binary Classification – It is an apple or not an apple. 
  - Multi-Class Classification – A picture of a man may belong to class Human Beings as well as the class Male or Adult, etc. 
  - Multi-Label Classification – A picture has multiple classes like a study table may have Books, Lamp, Pens, etc. 
  - Imbalanced Classification – Outlier detection and Medical Diagnostic tests. 
- Algorithms: 
  - Logistic Regression 
  - K-Nearest Neighbour 
  - Decision Tree 
  - Random Forest 

#### Clustering
A clustering algorithm identifies similarities between observations based on their features, and groups them into discrete clusters.
- Taking unlabeled data and grouping the items in the data together based on similarity.  
- It is used to group unknown data into clusters. 
- Types: 
  - Exclusive clustering – One cluster 
  - Overlapping clustering – More than one cluster 
  - Hierarchal clustering: A hierarchy of clustered data items 
- Algorithms: 
  - K-Means 
  - Fuzzy K-Means 
  - Hierarchal Clustering Model 

#### Anomaly Detection 
- Looks at what is out of norm. 
- Looks at the deviation from an established normal pattern. 
- Used to detect: 
  - Anomaly in images 
  - Time series data 
- Techniques: 
  - Manual 
  - Automation 
  - Machine Learning 

### How It Works
Below is the simplified breakdown of Machine Learning process. Typically, the process is iterative and continuous. For example, when monitoring the model you may decide to go back and retrain the model.
1. Define the problem: Decide on what the model should predict and when it's successful.
2. Get the data: Find data sources and get access.
3. Prepare the data: Explore the data. Clean and transform the data based on the model's requirements.
4. Train the model: Choose an algorithm and hyperparameter values based on trial and error.
5. Integrate the model: Deploy the model to an endpoint to generate predictions.
6. Monitor the model: Track the model's performance.
