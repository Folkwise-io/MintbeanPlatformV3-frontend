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

/*TODO: figure out a better dynamic env setup for frontend liek backend*/
const MUST_HAVE_KEYS = ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_UPLOAD_PRESET"];
const getEnvKeys = (envKeys) => Object.keys(envKeys).map((k) => k.replace(/process\.env\./, ""));
const checkForMissingKeys = (keys) => {
  const presentKeys = getEnvKeys(keys);
  MUST_HAVE_KEYS.forEach((k) => !presentKeys.includes(k) && console.error(`Missing env var ${k}`));
};

module.exports = () => {
  const envKeys = configEnvVariables();
  checkForMissingKeys(envKeys);

  return {
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
          { name: "title", content: "Mintbean - Coding Fairs for JavaScript Developers" },
          {
            name: "description",
            content:
              "Calling JavaScript developers from all levels! Attend our coding fairs. Grow your skills. Build a portfolio. Get job-ready. Make new friends. All at Mintbean.",
          },
          { property: "twitter:card", content: "summary_large_image" },
          { property: "twitter:url", content: "https://mintbean.io/" },
          { property: "twitter:title", content: "Mintbean - Coding Fairs for JavaScript Developers" },
          {
            property: "twitter:description",
            content:
              "Calling JavaScript developers from all levels! Attend our coding fairs. Grow your skills. Build a portfolio. Get job-ready. Make new friends. All at Mintbean.",
          },
          { property: "twitter:image", content: "src/assets/images/banners/meta-banner.png" },
          { property: "og:type", content: "website" },
          { property: "og:url", content: "https://mintbean.io/" },
          { property: "og:title", content: "Mintbean - Coding Fairs for JavaScript Developers" },
          {
            property: "og:description",
            content:
              "Calling JavaScript developers from all levels! Attend our coding fairs. Grow your skills. Build a portfolio. Get job-ready. Make new friends. All at Mintbean.",
          },
          { property: "og:image", content: "src/assets/images/banners/meta-banner.png" },
          { property: "og:site_name", content: "Mintbean" },
        ],
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
