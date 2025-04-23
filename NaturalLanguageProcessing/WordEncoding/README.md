# Word Encodings
Word Encoding refers to methods that convert words into numerical representations without capturing semantic relationships between words.

## One-Hot Encoding
One-Hot Encoding is a technique used to convert categorical data into a format that can be provided to machine learning algorithms to improve predictions. It is particularly useful when dealing with categorical variables that have no ordinal relationship.
- Description: Each word is represented as a binary vector where only one element is 1 (indicating the presence of the word) and all other elements are 0.
- Example: For a vocabulary of three words ["cat", "dog", "mouse"], the one-hot encodings would be:
    ```
    "cat": [1, 0, 0]
    "dog": [0, 1, 0]
    "mouse": [0, 0, 1]
    ```
- Limitations: 
  - Inefficient for large vocabularies, as it results in sparse vectors with many zeros.
  - Cannot capture meaning

## Bag of Words (BoW)
The Bag of Words (BoW) model is a simple and widely used method for text representation in Natural Language Processing (NLP). It involves converting text data into numerical vectors based on the frequency of words within the text.
- Binary Bag of Words (BBoW): The Binary Bag of Words model represents text data by indicating the presence or absence of each word in the document, rather than counting the frequency. Each document is converted into a binary vector where each element is either 0 (word is absent) or 1 (word is present).
- How Bag of Words Works:
  - Vocabulary Creation: The first step is to create a vocabulary of all unique words present in the corpus (the collection of text documents).
  - Word Frequency: For each document, count the number of occurrences of each word from the vocabulary.
  - Vector Representation: Each document is then represented as a vector of word frequencies. The length of the vector is equal to the size of the vocabulary, and each element in the vector corresponds to the frequency of a word in the document.
- Example:
    ```
    Sentence 1: "He is good in Mathematics but bad in Physics."
    Sentence 2: "He is good in Mathematics and good in Physics."

    Create Vocabulary:
    Vocabulary: ["and", "bad", "but", "good", "he", "in", "is", "mathematics", "physics"]
    
    Step 2: Bag of Words
    [
        [0, 1, 1, 1, 1, 2, 1, 1, 1],  # Sentence 1
        [1, 0, 0, 2, 1, 2, 1, 1, 1]   # Sentence 2
    ]

    
    Step 3: Binary Bag of Words
    [
        [0, 1, 1, 1, 1, 1, 1, 1, 1],  # Sentence 1
        [1, 0, 0, 1, 1, 1, 1, 1, 1]   # Sentence 2
    ]
    ```

## N-grams
N-grams are contiguous sequences of n items (words, characters, etc.) from a given text or speech. They are used in various Natural Language Processing (NLP) tasks to analyze and model language patterns. The "n" in n-grams represents the number of items in each sequence.
- Types of N-grams
  - Unigrams (1-grams): Single items (words or characters).
    - Example: "He is good in Mathematics."
      - Unigrams: ["He", "is", "good", "in", "Mathematics"]
  - Bigrams (2-grams): Pairs of consecutive items.
    - Example: "He is good in Mathematics."
      - Bigrams: ["He is", "is good", "good in", "in Mathematics"]
  - Trigrams (3-grams): Triplets of consecutive items.
    - Example: "He is good in Mathematics."
      - Trigrams: ["He is good", "is good in", "good in Mathematics"]
  - Higher-order N-grams: Sequences of four or more items.
    - Example: "He is good in Mathematics."
      - 4-grams: ["He is good in", "is good in Mathematics"]

## Term Frequency-Inverse Document Frequency (TF-IDF)
TF-IDF (Term Frequency-Inverse Document Frequency) is a statistical measure used in text mining and information retrieval to evaluate the importance of a word in a document relative to a collection of documents (corpus). It combines two metrics: Term Frequency (TF) and Inverse Document Frequency (IDF).
- Components of TF-IDF
  - Term Frequency (TF):
    - TF measures how frequently a term appears in a document.
    - It is calculated as the number of times a term appears in a document divided by the total number of terms in the document.
    - Formula: TF(t,d) = (Number of times term t appears in document d) / (Total number of terms in document d)
  - Inverse Document Frequency (IDF):
    - IDF measures how important a term is across the corpus.
    - It is calculated as the logarithm of the total number of documents divided by the number of documents containing the term.
    - Formula: Idf(t,D) =  log((total number of documents D) / (number of ducments containing term t))
  - TF-IDF Score:
    - The TF-IDF score is the product of TF and IDF.
    - Formula: TF-IDF(t,d,D) = TF(t,d) * Idf(t,D)
- Purpose of TF-IDF: TF-IDF helps in identifying words that are significant to a particular document but not common across the corpus. This is useful for tasks such as:
  - Text Classification: Enhancing the features used for classification.
  - Information Retrieval: Improving search results by ranking documents based on relevance.
  - Keyword Extraction: Identifying important keywords in a document.
  - Document Similarity: Measuring the similarity between documents.

