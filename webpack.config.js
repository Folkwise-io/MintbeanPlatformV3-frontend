const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  // webpack will take the files from ./src/index
  entry: "./src/index",
  devtool: "source-map",

  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "bundle.js",
    publicPath: "/",
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
      { test: /\.md$/, loader: "raw-loader" },
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
      favicon: "./src/assets/images/favicon.png",
      inject: true,
      meta: [
        { charset: "UTF-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { "http-equiv": "X-UA-Compatible", content: "ie=edge" },
        { name: "title", content: "Mintbean - Immersive Learning Programs for Web Developers" },
        {
          name: "description",
          content:
            "Calling all web developers! Get job-ready. Get mentorship. Grow your skills. Network. Build a portfolio. All at Mintbean!",
        },
        // og image tags moved to index.html
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:url", content: "https://mintbean.io/" },
        { property: "twitter:title", content: "Mintbean - Immersive Learning Programs for Web Developers" },
        {
          property: "twitter:description",
          content:
            "Calling all web developers! Get job-ready. Get mentorship. Grow your skills. Network. Build a portfolio. All at Mintbean!",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://mintbean.io/" },
        { property: "og:title", content: "Mintbean - Immersive Learning Programs for Web Developers" },
        {
          property: "og:description",
          content:
            "Calling all web developers! Get job-ready. Get mentorship. Grow your skills. Network. Build a portfolio. All at Mintbean!",
        },
        { property: "og:site_name", content: "Mintbean" },
      ],
    }),
    new Dotenv({ safe: true }),
  ],
};
