# Deep Learning
Deep learning is an advanced form of machine learning that tries to emulate the way the human brain learns. The key to deep learning is the creation of an artificial neural network that simulates electrochemical activity in biological neurons by using mathematical functions.

Deep Learning is a subset of machine learning that involves algorithms inspired by the structure and function of the brain called artificial neural networks.
## Key Concepts
- Neural Networks: Deep learning models are based on neural networks, which consist of layers of interconnected nodes (neurons). Each node processes input data and passes it to the next layer.
- Layers: Deep learning models typically have multiple layers, including input, hidden, and output layers. The term "deep" refers to the number of hidden layers in the network.
- Training: Deep learning models are trained using large datasets. During training, the model adjusts its weights and biases to minimize the error in its predictions.
- Activation Functions: These functions determine whether a neuron should be activated or not. Common activation functions include ReLU (Rectified Linear Unit), sigmoid, and tanh.
- Backpropagation: This is a method used to update the weights of the neural network by propagating the error backward through the network.
- Applications: Deep learning is used in various applications such as image and speech recognition, natural language processing, autonomous vehicles, and more.

## Advantages
- High Accuracy: Deep learning models can achieve high accuracy in tasks such as image and speech recognition.
- Feature Learning: These models can automatically learn features from raw data, reducing the need for manual feature extraction.

## Challenges
- Data Requirements: Deep learning models require large amounts of data to perform well.
- Computational Resources: Training deep learning models can be computationally intensive and require powerful hardware.

## Popular Frameworks
- TensorFlow: An open-source library developed by Google for deep learning.
- PyTorch: An open-source library developed by Facebook's AI Research lab.
- Keras: A high-level neural networks API, written in Python and capable of running on top of TensorFlow, CNTK, or Theano.

# Artificial Neural Network
Artificial Neural Networks (ANNs) are a cornerstone of modern machine learning and artificial intelligence. They are inspired by the structure and function of the human brain and are used to model complex patterns and relationships in data.
## Layers in ANN 
An ANN is a computational model consisting of interconnected nodes (neurons) organized in layers. These layers include:
- Input Layer: Receives the input data.
- Hidden Layers: Intermediate layers that process the input data through weighted connections.
- Output Layer: Produces the final output.
## Structure of an ANN
- Neurons: Basic units of computation in the network. Each neuron receives input, processes it, and passes it to the next layer.
- Weights: Parameters that adjust the strength of connections between neurons.
- Activation Function: A function applied to the output of each neuron to introduce non-linearity, enabling the network to learn complex patterns.
## Types
- Feedforward Neural Networks: Information flows in one direction from input to output.
- Convolutional Neural Networks (CNNs): Specialized for processing structured grid data like images.
- Recurrent Neural Networks (RNNs): Designed for sequential data, such as time series or natural language.

# Perceptron
A Perceptron is a type of artificial neural network that is the simplest form of a neural network model. It consists of a single layer of neurons and is used for binary classification tasks.
## Structure of a Perceptron
- Input Layer: The perceptron receives input features, which are typically represented as a vector X = [x1,x2,x3,...,xn]
- Weights: Each input feature is associated with a weight W = [w1,w2,w3,...,wn]. These weights are adjusted during training to minimize classification errors.
- Bias: A bias term b is added to the weighted sum of inputs to allow the activation function to shift.
- Activation Function: The perceptron uses an activation function to determine the output. The most common activation function for a perceptron is the step function, which outputs 1 if the weighted sum of inputs exceeds a certain threshold, and 0 otherwise.
## Mathematical Representation
The output y of a perceptron can be represented as:
```
y = 1 if W.X + b > 0 else 0
where W.X is the dot product of the weight vector and the input vector.
```
## How It Works:
- Weighted Sum: The perceptron calculates the weighted sum of the inputs plus the bias.
- Activation: The weighted sum is passed through the activation function to produce the final output.
## Limitations
- Linearly Separable Data: The perceptron can only solve problems where the data is linearly separable. It cannot solve problems where the classes are not linearly separable.
- Single Layer: The single-layer perceptron is limited in its ability to model complex relationships in data.
## Example
- Binary Classification: Consider a simple binary classification problem where we want to classify points in a 2D space. The perceptron will learn a linear boundary that separates the two classes.
- Building Blocks: They serve as the basic units in more complex neural networks, including multi-layer perceptrons (MLPs).

# Forward Propogation
Forward propagation is a key process in multi-layered neural networks where input data is passed through the network to generate an output. 
## Steps in Forward Propagation:
- Input Layer: The input data is fed into the network.
- Weighted Sum: Each neuron in the first hidden layer calculates a weighted sum of the inputs plus a bias.
- Activation Function: The weighted sum is passed through an activation function (e.g., ReLU, sigmoid) to introduce non-linearity.
- Hidden Layers: The output from the first hidden layer becomes the input for the next layer. This process repeats for all hidden layers.
- Output Layer: The final layer produces the network's output, which could be a classification label, a regression value, etc.
## Purpose
- Prediction: Generating outputs based on input data.
- Training: Calculating the loss during training, which is then used for backpropagation to update weights.

# Backward Propogation
Backward propagation is a fundamental algorithm used to train artificial neural networks (ANNs). It’s how the network learns by adjusting its weights based on the error of its predictions.
## Steps in Backward Propagation:
- Forward Pass
    - Input data is passed through the network layer by layer.
    - Each neuron applies a weighted sum and an activation function.
    - The final output is compared to the actual target using a loss function (e.g., Mean Squared Error, Cross-Entropy).
- Backward Pass
    - Compute the Loss Gradient
        - Calculate how much the output error changes with respect to the output of each neuron.
        - This is done using the chain rule from calculus.
    - Propagate the Error Backward
        - Starting from the output layer, compute gradients of the loss with respect to each weight in the network.
        - This tells us how much each weight contributed to the error.
    - Update the Weights
        - Use gradient descent (or a variant like Adam) to update the weights.
        - `W(new) = W(old) - n*(dL/dW)` where:
            - n id the learning rate(curve), it decides the speed of convergence of W(new) to W(old)
            - dL is th derivative of Loss
            - dl/dW is the gradient of the loss with respect to the weight.
    - Update the Bias
        - `b(new) = b(old) - n*(dL/db(old))`
## Example
- Imagine a simple network with:
    - 1 input layer
    - 1 hidden layer
    - 1 output layer
- If the network predicts 0.8 but the true label is 1.0, backpropagation will:
    - Measure the error (e.g., 0.2).
    - Determine how much each neuron and weight contributed to that error.
    - Adjust the weights to reduce the error next time.
## Chain Rule of Derivative
The chain rule of derivatives is the mathematical foundation of backpropagation in neural networks. It allows us to compute how a change in the weights affects the final output error by breaking the computation into smaller, manageable parts.
- The chain rule allows us to compute gradients layer by layer.
- It’s essential for efficiently training deep networks.
## Vanishing Gradient Problem in Multilayered Neural Network
The Vanishing Gradient Problem is a major challenge in training deep neural networks, especially those with many layers. It occurs during backpropagation, when gradients (used to update weights) become very small as they are propagated backward through the network.
### What causes it?
During backpropagation, gradients are calculated using the chain rule. If the activation functions (like sigmoid or tanh) have derivatives less than 1, multiplying many of them together causes the gradient to shrink exponentially as it moves backward through layers.
### Consequences
- Early layers learn very slowly or not at all.
- Training becomes inefficient or fails entirely.
- Model accuracy suffers, especially on complex tasks.
### Solutions
- Use ReLU Activation: ReLU (Rectified Linear Unit) has a derivative of 1 for positive inputs, helping preserve gradients.
- Weight Initialization Techniques: Like Xavier or He initialization to maintain gradient scale.
- Batch Normalization: Normalizes layer inputs to stabilize and speed up training.
- Residual Connections: Used in ResNets to allow gradients to flow more directly.
- Gradient Clipping: Limits the size of gradients to prevent them from vanishing or exploding.
## Purpose
- Used to reduce the loss.
- Error Correction: It tells the network how wrong it was and how to fix it.
- Efficient Learning: Uses the chain rule to efficiently compute gradients for all weights.
- Foundation of Training: It's the core algorithm behind training deep learning models.