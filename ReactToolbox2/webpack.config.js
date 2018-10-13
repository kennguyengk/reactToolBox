var webpack = require('webpack');

module.exports = {
    entry: ['core-js/fn/promise', 'whatwg-fetch', "./Scripts/App.tsx"],
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader" },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.(otf|eot|svg|ttf|woff|woff2)$/, loader: 'url-loader?limit=8192' },
            { test: /\.(jpg|png)$/, loader: "url-loader" }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            "React": "react",
            $: 'jquery',
            'window.$': 'jquery'
        })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }
};