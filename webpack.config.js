module.exports = {
    entry: './tests/src/main.js',
    output: {
        filename: './tests/app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react', 'stage-0']
                }
            },
            {
                test: /\.(gif|woff)$/,
                loader: 'url-loader'
            }
        ]
    }
};
