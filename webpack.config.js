const path = require("path");
module.exports = {
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: "ts-loader",
        exclude: [/node_modules/, /dist/],
      },
      {
        test: /\.css$/,
        use: ["css-loader", "style-loader"],
        exclude: [/node_modules/, /dist/],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "development",
};
