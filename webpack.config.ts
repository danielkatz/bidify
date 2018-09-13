import path from 'path';
import webpack from 'webpack';
import CleanWebpackPlugin = require('clean-webpack-plugin');
import CopyWebpackPlugin = require('copy-webpack-plugin');

const config: webpack.Configuration = {
    entry: {
        background: './src/background/index.ts',
        inject: './src/inject/index.ts'
    },
    mode: "development",
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            from: '_locales/**/*',
            to: '',
            context: 'src/'
        },
        {
            from: 'manifest.json',
            to: '',
            context: 'src/'
        }
        ], {
                debug: 'warning'
            })
    ],
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
};

export default config;