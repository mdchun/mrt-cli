const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const Webpack = require('webpack')
const { cwdPath } = require('../lib/util')

module.exports = {
	mode: 'development',
	entry: cwdPath('./src/index.js'),
	output: {
		path: cwdPath('./dist'),
		filename: 'bundle.js'
	},

	devtool: 'inline-source-map',

	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				loader: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							babelrc: false,
							configFile: false,
							cacheDirectory: true,
							presets: [
								[
									require.resolve('@babel/preset-env'),
									{
										modules: false
									}
								],
								require.resolve('@babel/preset-react')
							],
							plugins: [
								require.resolve('@babel/plugin-proposal-class-properties'),
								[
									require.resolve('@babel/plugin-transform-runtime'),
									{
										absoluteRuntime: false,
										corejs: false,
										helpers: true,
										regenerator: true,
										useESModules: false
									}
								]
							]
						}
					},
					{
						loader: require.resolve('ts-loader')
					}
				],
				exclude: /node_modules/
			},

			{
				test: /\.less$/,
				exclude: [/node_modules/],
				loaders: [
					require.resolve('style-loader'),
					{
						loader: require.resolve('ts-css-modules-webpack-loader'),
						options: {
							banner:
								'//This file is automatically generated, please do not change this file!',
							dest: './definitions',
							root: './components'
						}
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 2,
							modules: {
								mode: 'local',
								localIdentName: '[path][name]__[local]--[hash:base64:5]'
							}
						}
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							ident: 'postcss',
							plugins: [require('autoprefixer'), require('postcss-plugin')]
						}
					},
					{
						loader: require.resolve('less-loader'),
						options: {
							importLoaders: 2,
							modules: true
						}
					}
				]
			},
			{
				test: /\.less$/, // 配置除src外的less文件不打开cssModule
				exclude: [/src/],
				use: [
					{ loader: require.resolve('style-loader') },
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 2
						}
					},
					{
						loader: require.resolve('postcss-loader'),
						options: {
							ident: 'postcss',
							plugins: [require('autoprefixer'), require('postcss-plugin')]
						}
					},
					{
						loader: require.resolve('less-loader'),
						options: {
							modules: true,
							// modifyVars: { '@primary-color': '#1DA57A' },
							javascriptEnabled: true
						}
					}
				]
			},
			// {
			// 	test: /\.css$/,
			// 	// exclude: /node_modules/,
			// 	loaders: [
			// 		'style-loader',
			// 		{
			// 			loader: 'css-loader',
			// 			options: {
			// 				modules: true
			// 			}
			// 		}
			// 	]
			// },
			{
				//CSS处理
				test: /\.css$/,
				loaders: [
					{
						loader: require.resolve('style-loader')
					},
					{
						loader: require.resolve('css-loader'),
						options: {
							modules: true
						}
					}
				],
				exclude: /node_modules/
			},

			{
				//antd样式处理
				test: /\.css$/,
				exclude: /src/,
				use: [
					{ loader: require.resolve('style-loader') },
					{
						loader: require.resolve('css-loader'),
						options: {
							importLoaders: 1
						}
					}
				]
			}
		]
	},

	// 摇树
	// optimization: {
	// 	useExports: true
	// },

	resolve: {
		extensions: ['.tsx', '.js', '.jsx', '.css', '.less'],
		modules: ['node_modules']
	},

	plugins: [
		new CleanWebpackPlugin(),

		new HtmlWebpackPlugin({
			title: 'Development',
			template: cwdPath('./public/index.html')
		}),

		new Webpack.HotModuleReplacementPlugin()
	]
}
