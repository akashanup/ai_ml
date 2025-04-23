# Word Embedding
Word Embedding refers to techniques that convert words into dense vectors in a continuous vector space, capturing semantic relationships between words. 

## Word2Vec Embedding
Word2Vec is a popular word embedding technique developed by researchers at Google. It is used to transform words into continuous vector representations, capturing semantic relationships between words. Word2Vec embeddings are dense vectors that represent words in a way that words with similar meanings have similar vectors. Word2Vec embeddings are based on the idea that words appearing in similar contexts tend to have similar meanings. The technique uses neural networks to learn these representations from large corpora of text.
- Models: Word2Vec has two main models for generating embeddings:
  - Skip-gram Model: This model predicts the context words given a target word. It focuses on learning to predict surrounding words within a window size. This is mostly used with huge dataset.
  - Continuous Bag of Words (CBOW) Model: This model predicts the target word given the context words. It averages the context words to predict the target word. This is mostly used with small dataset.
- Training Process:
  - Context Window: Define a window size around each word to consider its context. For example, a window size of 2 means considering two words before and after the target word.
  - Neural Network: Use a shallow neural network with one hidden layer to learn the word vectors.
  - Optimization: Use techniques like negative sampling or hierarchical softmax to optimize the training process.
- Vector Representation: Each word is represented as a vector in a high-dimensional space. The vectors capture semantic relationships, such that:
  - Words with similar meanings have similar vectors.
  - Relationships between words can be captured through vector arithmetic (e.g., "king" - "man" + "woman" ≈ "queen").
- Applications: Word2Vec embeddings are used in various NLP tasks, including:
  - Text Classification: Representing text data for classification tasks.
  - Named Entity Recognition (NER): Identifying entities in text.
  - Machine Translation: Translating text between languages.
  - Sentiment Analysis: Analyzing the sentiment of text.
