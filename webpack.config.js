const path = require('path');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'build'),
		},
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: { presets: ['@babel/preset-env', '@babel/react'] },
					},
					{
						loader: 'ts-loader',
						options: {
							configFile: path.resolve(__dirname, 'tsconfig.json'),
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			// {
			// 	test: /node_modules\/vfile\/core\.js/,
			// 	use: [{
			// 		loader: 'imports-loader',
			// 		options: {
			// 			type: 'commonjs',
			// 			imports: ['single process/browser process'],
			// 		},
			// 	}],
			// },
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	plugins: [
		new copyWebpackPlugin({
			patterns: [
				{ from: 'public', to: '.' },
			],
		}),
	],
};
