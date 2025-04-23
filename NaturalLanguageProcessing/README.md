# Natural Language Processing
Natural Language Processing (NLP) is a field of artificial intelligence that focuses on the interaction between computers and humans through natural language. The goal of NLP is to enable computers to understand, interpret, and generate human language in a way that is both meaningful and useful.
## Detailed explanation of NLP
### Concept
NLP involves the application of computational techniques to analyze and synthesize natural language and speech. It encompasses a wide range of tasks, from simple ones like text classification to complex ones like machine translation and sentiment analysis.
### Key Components
NLP combines several disciplines, including linguistics, computer science, and artificial intelligence. The key components of NLP include:
- Text Processing
  - Tokenization: Splitting text into individual tokens (words, subwords, or characters).
  - Stop Word Removal: Filtering out common words that do not add significant meaning.
  - Stemming and Lemmatization: Reducing words to their base or root form.
  - Part-of-Speech Tagging: Identifying the grammatical parts of speech in a sentence.
- Syntax and Semantics
  - Parsing: Analyzing the grammatical structure of sentences.
  - Named Entity Recognition (NER): Identifying and classifying entities in text (e.g., names, dates, locations).
  - Semantic Analysis: Understanding the meaning and relationships between words.
- Machine Learning and Deep Learning
  - Text Classification: Categorizing text into predefined classes (e.g., spam detection).
  - Sentiment Analysis: Determining the sentiment expressed in text (e.g., positive, negative, neutral).
  - Machine Translation: Translating text from one language to another.
  - Text Generation: Generating coherent and contextually relevant text.

<br>

## [Text Preprocessing](https://github.com/akashanup/ai_ml/tree/main/NaturalLanguageProcessing/TextPreprocessing)

## [Word Encodings](https://github.com/akashanup/ai_ml/tree/main/NaturalLanguageProcessing/WordEncoding)

## [Word Embedding](https://github.com/akashanup/ai_ml/tree/main/NaturalLanguageProcessing/WordEmbedding)

## Miscellaneous
### Vectors 
In the context of word encodings, vectors are numerical representations of words that capture their meanings and relationships. These vectors are used in various natural language processing (NLP) tasks to enable algorithms to understand and manipulate text data.

### Corpus
A corpus is a large and structured set of texts used for linguistic research and NLP tasks. It serves as the primary source of data for training and evaluating models. Corpora can be general or domain-specific, depending on the application.
  - General Corpus: Wikipedia articles, news articles, books.
  - Domain-Specific Corpus: Medical records, legal documents, scientific papers.

### Vocabulary
Vocabulary refers to the set of unique words or tokens present in a corpus. It is the collection of all distinct words that the NLP model will encounter and process. Building a vocabulary involves identifying and storing these unique words.

### Cosine similarity
Cosine similarity in NLP (Natural Language Processing) is a measure used to determine the similarity between two text documents or sentences. It is based on the cosine of the angle between two vectors in a multi-dimensional space. These vectors represent the text documents, where each dimension corresponds to a term from the vocabulary.
  - Applications in NLP:
    - Document Similarity: Measuring the similarity between documents for clustering, classification, or retrieval.
    - Sentence Similarity: Comparing sentences for tasks like paraphrase detection, semantic similarity, and question answering.
    - Information Retrieval: Ranking documents based on their relevance to a query.
    - Recommendation Systems: Finding similar items or users based on textual descriptions.
  - Interpretation: Cosine Similarity Value: The value ranges from -1 to 1.
    - 1 indicates that the documents are identical.
    - 0 indicates that there is no similarity.
    - -1 indicates that the documents are completely dissimilar.

### Loss Functions
Loss functions are a critical component in training machine learning models, particularly in supervised learning. They measure how well the model's predictions match the actual data, guiding the optimization process to improve model performance. 
- Types of Loss Functions:
  - Mean Squared Error (MSE): Used primarily for regression tasks, MSE calculates the average squared difference between the predicted values and the actual values.
  - Mean Absolute Error (MAE): MAE measures the average absolute difference between the predicted values and the actual values.
  - Cross-Entropy Loss: Used for classification tasks, cross-entropy loss measures the difference between the predicted probability distribution and the actual distribution.
  - Huber Loss: Huber loss is used in regression tasks and is less sensitive to outliers than MSE. It combines MSE and MAE.
  - Kullback-Leibler Divergence (KL Divergence): KL Divergence measures how one probability distribution diverges from a second, expected probability distribution.
  - Log-Cosh Loss: Log-Cosh loss is used in regression tasks and is a smooth approximation of MAE.
- Choosing the Right Loss Function: The choice of loss function depends on the specific task and the nature of the data:
  - Regression: MSE, MAE, Huber Loss, Log-Cosh Loss
  - Classification: Binary Cross-Entropy, Categorical Cross-Entropy
  - Probability Distributions: KL Divergence

### Optimizers
Optimizers are algorithms or methods used to adjust the weights and biases of a neural network to minimize the loss function during training. They play a crucial role in the performance and efficiency of machine learning models. 
- Types of Optimizers:
  - Gradient Descent: Gradient Descent is the most basic optimization algorithm. It updates the weights by moving them in the direction of the negative gradient of the loss function.
  - Stochastic Gradient Descent (SGD): SGD updates the weights using the gradient of the loss function calculated from a single training example or a small batch. 
  - Mini-Batch Gradient Descent: Mini-Batch Gradient Descent updates the weights using the gradient of the loss function calculated from a small batch of training examples.
  - Momentum: Momentum helps accelerate SGD by adding a fraction of the previous update to the current update.
  - Nesterov Accelerated Gradient (NAG): NAG is a variant of momentum that looks ahead by calculating the gradient at the future position of the weights.
  - Adagrad: Adagrad adapts the learning rate for each parameter based on the historical gradients.
  - RMSprop: RMSprop is similar to Adagrad but uses a moving average of squared gradients to normalize the learning rate.
  - Adam: Adam combines the benefits of both momentum and RMSprop by using moving averages of both the gradients and the squared gradients.