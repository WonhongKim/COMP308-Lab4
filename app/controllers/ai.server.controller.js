const config = require("../../config/config");

exports.train = function (req, res) {
  const tf = require("@tensorflow/tfjs");
  require("@tensorflow/tfjs-node");
  //load iris training and testing data
  const iris = require("../../iris.json");
  const irisTesting = [
    {
      sepal_length: req.body.sepal_length,
      sepal_width: req.body.sepal_width,
      petal_length: req.body.petal_length,
      petal_width: req.body.petal_width,
      species: req.body.species,
    },
  ];
  const epochsAmount = req.body.epochs;

  //
  // convert/setup our data for tensorflow.js
  //
  //tensor of features for training data
  const trainingData = tf.tensor2d(
    iris.map((item) => [
      item.sepal_length,
      item.sepal_width,
      item.petal_length,
      item.petal_width,
    ])
  );
  //tensor of output for training data
  const outputData = tf.tensor2d(
    iris.map((item) => [
      item.species === "setosa" ? 1 : 0,
      item.species === "virginica" ? 1 : 0,
      item.species === "versicolor" ? 1 : 0,
    ])
  );
  //
  //tensor of features for testing data
  const testingData = tf.tensor2d(
    irisTesting.map((item) => [
      item.sepal_length,
      item.sepal_width,
      item.petal_length,
      item.petal_width,
    ])
  );

  // build neural network using a sequential model
  const model = tf.sequential();
  //add the first layer
  model.add(
    tf.layers.dense({
      inputShape: [4], // four input neurons
      activation: "sigmoid",
      units: 5, //dimension of output space (first hidden layer)
    })
  );
  //add the hidden layer
  model.add(
    tf.layers.dense({
      inputShape: [5], //dimension of hidden layer
      activation: "sigmoid",
      units: 3, //dimension of final output
    })
  );
  //add output layer
  model.add(
    tf.layers.dense({
      activation: "sigmoid",
      units: 3, //dimension of final output
    })
  );
  //compile the model with an MSE loss function and Adam algorithm
  model.compile({
    loss: "meanSquaredError",
    optimizer: tf.train.adam(0.06),
  });
  // train/fit the model for the fixed number of epochs
  const startTime = Date.now();
  model
    .fit(trainingData, outputData, { epochs: epochsAmount })
    .then((history) => {
      //console.log(history);
      //display prediction results for the inpud samples
      const results = model.predict(testingData);
      //model.predict(testingData).print();
      elapsedTime = Date.now() - startTime;
      results.array().then((array) => {
        const resultForTest1 = array[0];
        res
          .status(200)
          .send({
            Status: "traind",
            resultForTest1: resultForTest1,
          })
          .end();
      });
    });
};
