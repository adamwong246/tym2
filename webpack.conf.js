const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: '/',
		filename: 'bundle.js',
		publicPath: 'http://localhost:8080/'
	},
	//devtool: 'source-map',
	module: {
		rules: [
      {
        test: /\.js|\.jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
		// {
  //       test: /.jsx?$/,
  //       loader: 'babel-loader',
  //       exclude: /node_modules/,
  //       query: {
  //         presets: ['es2015', 'react']
  //       }
  //     },
      { 
        test: /\.css$/, 
        use: ["style-loader", "css-loader"]
      },
      { 
        test: /\.png$/, 
        use: "url-loader?limit=100000" 
      },
      { 
        test: /\.jpg$/, 
        use: "file-loader" 
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        use: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        use: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        use: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
      ]
	},
	devServer: {
		contentBase: './',
		port: 8080,
		noInfo: false,
		hot: true,
		inline: true,
		proxy: {
			'/': {
				bypass: function (req, res, proxyOptions) {
					return '/public/index.html';
				}
			}
		}
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
  new webpack.ProvidePlugin({"React": "react",}),
	]
};
