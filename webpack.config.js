const webpack = require("webpack");
const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const configEnvVariables = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
  return envKeys;
};

module.exports = () => {
  const envKeys = configEnvVariables();
  return {
    // webpack will take the files from ./src/index
    entry: "./src/index",
    devtool: "source-map",

    // and output it into /dist as bundle.js
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "bundle.js",
    },

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    },

    module: {
      rules: [
        // we use babel-loader to load our jsx and tsx files
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: {
                        node: "12",
                      },
                    },
                  ],
                  "@babel/preset-react",
                ],
              },
            },
          ],
        },

        // asset loading
        {
          test: /\.(jpe?g|gif|png|svg)$/i,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 10000,
              },
            },
          ],
        },

        // css-loader to bundle all the css files into one file and style-loader to add all the styles  inside the style tag of the document
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        { test: /\.css$/, loader: "postcss-loader" },
      ],
    },
    devServer: {
      historyApiFallback: true,
      proxy: {
        "/graphql": {
          target: "http://localhost:4000",
        },
      },
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      // set up environment variables
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
