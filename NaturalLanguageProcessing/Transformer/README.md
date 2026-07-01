# Transformer
In Artificial Neural Networks (ANNs), a Transformer is a type of deep learning model architecture that has revolutionized natural language processing (NLP) and other sequence modeling tasks. It was introduced in the paper "Attention is All You Need" by Vaswani et al. in 2017.

## Attention Is All You Need
"Attention Is All You Need" by Vaswani et al., published in 2017. This paper introduced the Transformer architecture, which revolutionized natural language processing and laid the foundation for models like BERT, GPT, and many others.
### Core Concepts
- Self-Attention Mechanism: Allows the model to weigh the importance of different words in a sentence, regardless of their position.
- Positional Encoding: Since Transformers don’t use recurrence, positional encodings are added to input embeddings to retain the order of words.
- Encoder-Decoder Architecture: The model consists of stacked encoders and decoders, each built from layers of multi-head attention and feed-forward networks.
### Impact
- Eliminated the need for recurrent layers (like in RNNs or LSTMs).
- Enabled massive parallelization during training.
- Became the backbone of state-of-the-art models in NLP, vision, and even multimodal tasks.

## Key Concepts of Transformers
### Self-Attention Mechanism
Self-attention is the core mechanism behind the Transformer architecture. It allows the model to focus on different parts of the input sequence when encoding a particular word or token.
It allows the model to weigh the importance of different words in a sentence relative to each other.

Attention is a technique used to examine a sequence of text tokens and try to quantify the strength of the relationships between them. In particular, self-attention involves considering how other tokens around one particular token influence that token's meaning.

For example, in the sentence "The cat sat on the mat", the word "cat" might be more relevant to "sat" than "mat". Each word is first converted into a vector (embedding). Then, for each word, self-attention calculates how much attention it should pay to every other word in the sentence.

Given a sequence of words, self-attention computes a weighted sum of all words for each word in the sequence. The weights are determined by how relevant other words are to the current word.
Each word is transformed into three vectors:
- Query (Q)
- Key (K)
- Value (V)
The attention score between two words is computed as:
```
Attention(Q,K,V) = softmax((Q*(K^T)) / ((dk)^0.5))*V
Where:
- Q*(K^T) gives a similarity score.
- (dk)^0.5 is a scaling factor.
- Softmax normalizes the scores.
- The result is a weighted sum of the values.
```
### Positional Encoding
Since Transformers don’t process data sequentially (like RNNs), positional encoding is added to input embeddings to retain the order of words.
### Encoder-Decoder Architecture
#### Encoder
An encoder block that creates semantic representations of the training vocabulary.

Encoder processes the input sequence and generates a representation. It is repeated N times. 

In an encoder block, each token is carefully examined in context, and an appropriate encoding is determined for its vector embedding. The vector values are based on the relationship between the token and other tokens with which it frequently appears. This contextualized approach means that the same word might have multiple embeddings depending on the context in which it's used - for example "the bark of a tree" means something different to "I heard a dog bark".

Each Encoder block contains:
- Multi-head self-attention
- Feed-forward neural network
- Layer normalization and residual connections
#### Decoder
A decoder block that generates new language sequences.

In a decoder block, attention layers are used to predict the next token in a sequence. For each token generated, the model has an attention layer that takes into account the sequence of tokens up to that point. The model considers which of the tokens are the most influential when considering what the next token should be. For example, given the sequence "I heard a dog", the attention layer might assign greater weight to the tokens "heard" and "dog" when considering the next word in the sequence:
`I *heard* a *dog* {*bark*}`

Decoder uses this representation to produce the output sequence (e.g., translated text). It is repeated N times. 
 
 Each Encoder block contains:
- Masked multi-head self-attention (prevents attending to future tokens)
- Multi-head attention over encoder output
- Feed-forward neural network
- Layer normalization and residual connections
### Multi-Head Attention
Multiple attention mechanisms run in parallel to capture different types of relationships between words.

Instead of computing a single attention function, the Transformer uses multiple attention heads to capture different types of relationships.

Each head performs its own self-attention operation, and the results are concatenated and linearly transformed:
```
MultiHead(Q,K,V) = CONCAT(head1,....headN)*W
```
### Feedforward Neural Networks
Each position in the sequence is processed independently through a fully connected feedforward network.
### Layer Normalization and Residual Connections
Help stabilize training and improve gradient flow.
### Why Transformers Matter
- Scalability: They can be trained on massive datasets efficiently.
- Parallelization: Unlike RNNs, Transformers process all tokens simultaneously, speeding up training.
- Versatility: Used in NLP, computer vision (Vision Transformers), audio processing, and more.
### Applications
- Language translation (e.g., Google Translate)
- Text generation (e.g., ChatGPT)
- Sentiment analysis
- Image classification (Vision Transformers)

## Miscellaneous
### Recurrent Neural Network (RNN)
RNNs are designed to handle sequential data by maintaining a memory of previous inputs using hidden states. They process one element of the sequence at a time and update their hidden state accordingly.
#### Use case
Language modeling, speech recognition, time series prediction.
#### Limitation
Struggles with long-term dependencies due to vanishing gradients during training.

### Long Short-Term Memory (LSTM)
LSTMs are a special kind of RNN capable of learning long-term dependencies. They use a more complex architecture with gates to control the flow of information:
- Forget gate: Decides what information to discard.
- Input gate: Decides what new information to store.
- Output gate: Decides what to output.
#### Advantages
- Better at capturing long-range dependencies.
- More stable during training.

### Gated Recurrent Unit (GRU)
GRUs are similar to LSTMs but with a simpler structure. They combine the forget and input gates into a single update gate, and use a reset gate to control memory.
#### Advantages:
- Faster to train than LSTMs.
- Often performs comparably with fewer parameters.
