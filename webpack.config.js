
// webpack v4
const { join, resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin")
const WebpackMd5Hash = require("webpack-md5-hash");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");
const devMode = process.env.npm_lifecycle_event !== "build";

const CSSModuleLoader = {
	loader: "css-loader",
	options: {
		modules: true,
		localIdentName: "[local]_[hash:base64:5]",
		sourceMap: true,
		url: false
	}
};

const postCSSLoader = {
	loader: "postcss-loader",
	options: {
		ident: "postcss",
		sourceMap: true,
		plugins: () => [
			autoprefixer({
				browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]
			})
		]
	}
};

module.exports = env =>
{
	return {
		entry: join(__dirname, "src","index.js"),
		output: {
			filename: "bundle.js",
			path: resolve(__dirname,"dist")
		},
		module: {
			rules: [
				{
					test: /\.js|jsx$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader"
					}
				},
				{
					test: /\.(png|svg|jpg|gif)$/i,
					use: [
						{
							loader: "url-loader",
							options: {
								limit: 8192
							}
						}
					]
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use:  [devMode ? "style-loader" : MiniCssExtractPlugin.loader,
						CSSModuleLoader,   
						postCSSLoader,
						{loader: "sass-loader",
							options: {
								sourceMap: true
							}
						}
					]
				}
			]
		},
		plugins: [ 
			new CleanWebpackPlugin("dist", {} ),
			new MiniCssExtractPlugin({
				filename: "[name].[hash].css",
				chunkFilename: "[id].[hash].css"
			}),
			new HtmlWebpackPlugin({
				inject: true,
				template: "./src/index.html",
				filename: "index.html",
				favicon: "./src/y18.gif"
			}),
			new WebpackMd5Hash()
		],
		devServer: {
			host: "localhost"
		},
		devtool: "sourcemap",
		resolve: {
			extensions: [".ts", ".tsx", ".js", ".scss",".css"]
		}
	};

};
