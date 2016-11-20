import path from 'path';

module.exports = {
    debug: true,
    devtool: '#inline-source-map',
    entry: {
        main: './dist/App.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '../dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        libraryTarget: 'var',
        library: 'PixiTestEntry'
    }
};