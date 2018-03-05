module.exports = {
    entry: './src/main.js',
    output: {
        filename: './release/app.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react', 'stage-0']
                }
            },
            {
                test: /\.gif$/,
                loader: 'url-loader'
            }
        ]
    }
};
