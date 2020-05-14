const path = require("path");
module.exports = {
    entry: [
        './public/javascripts/index.js'
    ],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: 'javascripts/bundle.js'
    },
    mode: "development",
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react', { 'plugins': ['@babel/plugin-proposal-class-properties'] }]
                    }
                }]
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [{
                    loader: 'url-loader'
                }]
            }
        ]
    }
}