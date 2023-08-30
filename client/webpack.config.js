const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

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

			// Injects our custom service worker
			new InjectManifest({
				swSrc: "./src-sw.js",
				swDest: "src-sw.js",
			}),
			// Creates a manifest.json file.
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
				// Do not precache images
				exclude: [/\.(?:png|jpg|jpeg|svg)$/],

				runtimeCaching: [
					{
						// Match any request that ends with .png, .jpg, .jpeg or .svg.
						urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

						// Apply a cache-first strategy.
						handler: "CacheFirst",

						options: {
							// Use a custom cache name.
							cacheName: "images",

							// Only cache 2 images.
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
					// We use babel-loader in order to use ES6.
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
