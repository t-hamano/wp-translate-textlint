const webpack = require( 'webpack' );
const path = require( 'path' );
const copyWebpackPlugin = require( 'copy-webpack-plugin' );

module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	output: {
		path: path.join( __dirname, 'build' ),
		filename: 'bundle.js',
	},
	devServer: {
		contentBase: path.join( __dirname, 'public' ),
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: [
					{
						loader: 'babel-loader',
						options: { presets: [ '@babel/preset-env', '@babel/react' ] },
					},
					{
						loader: 'ts-loader',
						options: {
							configFile: path.resolve( __dirname, 'tsconfig.json' ),
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ],
			},
		],
	},
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.json' ],
	},
	plugins: [
		// new copyWebpackPlugin( {
		// 	patterns: [ { from: 'public', to: '.' } ],
		// } ),
		new webpack.DefinePlugin( {
			'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
		} ),
	],
};
