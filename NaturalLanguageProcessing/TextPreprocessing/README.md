# Text Preprocessing
Text preprocessing in NLP (Natural Language Processing) involves a series of steps to clean and prepare raw text data for analysis and modeling. These steps are crucial for improving the performance and accuracy of NLP models. 

## Tokenization
Tokenization is a fundamental step in natural language processing (NLP) and word encodings. It involves breaking down text into smaller units called tokens, which can be words, subwords, or characters. These tokens are then used for further processing, such as word encodings, text analysis, and machine learning tasks.
- Word Tokenization: This involves splitting a text into individual words. For example, the sentence "Hello, world!" would be tokenized into ["Hello", ",", "world", "!"].
- Sentence Tokenization: This involves splitting a text into individual sentences. For example, the text "Hello, world! How are you?" would be tokenized into ["Hello, world!", "How are you?"].
- Subword Tokenization: This involves splitting words into smaller units, such as prefixes, suffixes, or even individual characters. This is particularly useful for handling out-of-vocabulary words and for languages with complex word structures.
- Why is Tokenization Important?
  - Text Analysis: Tokenization helps in analyzing the text by breaking it down into manageable pieces.
  - Feature Extraction: Tokens serve as features for machine learning models.
  - Handling Different Languages: Tokenization can be adapted to handle different languages and their unique characteristics.
  - Efficiency: It makes the processing of text data more efficient by reducing the complexity of the input.

## Stemming
Stemming is a text normalization technique used in natural language processing (NLP) to reduce words to their root or base form. Unlike lemmatization, which produces the canonical form of a word, stemming often results in a crude approximation of the root form by removing suffixes and prefixes. The resulting stem may not always be a valid word in the language.
- Example: Word Forms: Different forms of a word are reduced to a single stem.
    ```
    "running", "runner", "ran" → "run"
    "happiness", "happy" → "happi"
    "cars", "car" → "car"
    ```

## Lemmatization
Lemmatization is a text normalization technique used in natural language processing (NLP) to reduce words to their base or root form, known as the lemma. This process helps in standardizing words and improving the performance of various NLP tasks by ensuring that different forms of a word are treated as a single entity. It uses morphological analysis and dictionary lookup to produce valid words.
- Example 1: Word Forms: Different forms of a word are reduced to a single lemma.
    ```
    "running" → "run"
    "better" → "good"
    "cars" → "car"
    ```
- Example 2: Contextual Lemmatization: The context helps in determining the correct lemma.
    ```
    "The children are playing" → "The child is play"
    "He has better skills" → "He has good skills"
    ```


## Stop Words 
Stop words are common words that are often removed from text data during preprocessing in natural language processing (NLP) tasks. These words are typically filtered out because they do not carry significant meaning and can clutter the analysis. 
- Example: Stop words vary by language. Here are some examples of English stop words:
    ```
    Articles: "a", "an", "the"
    Conjunctions: "and", "or", "but"
    Prepositions: "in", "on", "at"
    Pronouns: "he", "she", "it"
    Auxiliary Verbs: "is", "are", "was"
    ```