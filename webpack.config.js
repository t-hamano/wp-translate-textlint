const webpack = require( 'webpack' );
const path = require( 'path' );
const copyWebpackPlugin = require( 'copy-webpack-plugin' );
const bundleAnalyzerPlugin = require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

const mode = process.env.NODE_ENV !== 'production' ? 'development' : 'production';
const openAnalyzer = !! process.env.ANALIZE;

const plugins = [
	new copyWebpackPlugin( [
		{
			from: 'public',
			to: '.',
		},
	] ),
	new webpack.DefinePlugin( {
		'process.env.NODE_ENV': JSON.stringify( process.env.NODE_ENV ),
	} ),
];

if ( openAnalyzer ) {
	plugins.push( new bundleAnalyzerPlugin() );
}

module.exports = {
	mode,
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
	plugins,
	devtool: 'eval-source-map',
	performance: {
		hints: false,
	},
};
