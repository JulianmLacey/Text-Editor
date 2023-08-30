const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = () => {
	return {
		mode: "development",
		entry: {
			main: "./src/js/index.js",
			install: "./src/js/install.js",
			database: "./src/js/database.js",
			editor: "./src/js/editor.js",
			header: "./src/js/header.js",
		},
		output: {
			filename: "[name].bundle.js",
			path: path.resolve(__dirname, "dist"),
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: "./index.html",
				title: "JATE",
			}),
			new InjectManifest({
				swSrc: "./src-sw.js",
				swDest: "src-sw.js",
			}),
			new WebpackPwaManifest({
				fingerprints: false,
				inject: true,
				name: "JATE",
				short_name: "JATE",
				description: "Online text editor",
				background_color: "#225ca3",
				theme_color: "#225ca3",
				start_url: "./",
				publicPath: "./",
				icons: [
					{
						src: path.resolve("src/images/logo.png"),
						sizes: [16, 96, 128, 192, 256, 384, 512],
						destination: path.join("assets", "icons"),
					},
				],
			}),

			new WorkboxPlugin.GenerateSW({
				exclude: [/\.(?:png|jpg|jpeg|svg)$/],

				runtimeCaching: [
					{
						urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
						handler: "CacheFirst",
						options: {
							cacheName: "images",
							expiration: {
								maxEntries: 2,
							},
						},
					},
				],
			}),
		],
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: "asset/resource",
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: ["@babel/plugin-proposal-object-rest-spread", "@babel/transform-runtime"],
						},
					},
				},
			],
		},
	};
};
