const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// JS file handler
const javascript = {
  test: /\.(js)$/,
  exclude: /fullcalendar/,
  use: [{
    loader: 'babel-loader',
    options: { presets: ['env'] }
  }],
};

// postCSS loader
const postcss = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: (loader) => [
      require('autoprefixer')({ browsers: 'last 3 versions' })
    ]
  }
};

// sass/css loader
const loadSass = ({ include, exclude, minimize } = {}) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    filename: "[name].css"
  });

  return {
    module: {
      rules: [
        {
          test: /\.(scss)$/,
          include,
          exclude,
          use: plugin.extract({
            use: [
              `css-loader?sourceMap${minimize ? '&minimize=true' : ''}`,
              postcss,
              `sass-loader?sourceMap${minimize ? '&minimize=true' : ''}`
            ],
            fallback: "style-loader"
          }),
        }
      ]
    },
    plugins: [plugin]
  }
}

// font awesome
const fontAwesome =        {
  test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'fonts/',    // where the fonts will go
    }
  }]
};

// Expose jQuery to the global window object
const expose = {
  test: require.resolve('jquery'),
  use: [
    {
      loader: 'expose-loader',
      options: 'jQuery'
    },
    {
      loader: 'expose-loader',
      options: '$'
    }
  ]
};

// JavaScript optimization
const optimization = (optimize) => {
  return {
    optimization: {
      minimize: (optimize === true) ? true : false
    }
  }
}

// all environment config
const commonConfig = merge([
  {
    entry: {
      index: './public/javascript/main.js',
      admin: './public/javascript/admin/main.js',
      dashboard: './public/javascript/admin/dashboard.js'
    },
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'public', 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [expose, javascript, fontAwesome]
    },
    plugins: [
    ]
  }
]);

const productionConfig = merge([
  optimization(true),
  loadSass({ minimize: true })
]);

const developmentConfig = merge([
  optimization(false),
  loadSass()
]);

//process.noDeprecation = true;

module.exports = mode => {
  if (mode === "production") {
    return merge(commonConfig, productionConfig, { mode });
  }

  return merge(commonConfig, developmentConfig, { mode });
};
