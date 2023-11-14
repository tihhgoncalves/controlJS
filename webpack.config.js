const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = [
  {
    // Configuração para o arquivo normal
    mode: "development",
    entry: "./src/rhino.js",
    output: {
      filename: "rhino.js",
      path: path.resolve(__dirname, "public"),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  },
  {
    // Configuração para o arquivo minificado
    mode: "production",
    entry: "./src/rhino.js",
    output: {
      filename: "rhino.min.js",
      path: path.resolve(__dirname, "public"),
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  },
];
