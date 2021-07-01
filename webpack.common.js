const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: {
    app: './src/EditableList/index.vue',
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  output: {
    filename: 'vue-js-3-rails-restful-api-collection.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      // ... другие правила
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // убедитесь что подключили плагин!
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue'],
  },
};






// const webpack = require('webpack');
// const merge = require('webpack-merge');
// const path = require('path');

// var config = {
//   output: {
//     path: path.resolve(__dirname + '/dist/'),
//   },
//   module: {
//     : [
//       {
//         test: /\.js$/,
//         loader: 'babel',
//         include: __dirname,
//         exclude: /node_modules/
//       },
//       {
//         test: /\.vue$/,
//         loader: 'vue'
//       },
//       {
//         test: /\.css$/,
//         loader: 'style!less!css'
//       }
//     ]
//   }
//   // ,
//   // plugins: [
//   //   new webpack.optimize.minimize({
//   //     minimize : true,
//   //     sourceMap : false,
//   //     mangle: true,
//   //     compress: {
//   //       warnings: false
//   //     }
//   //   })
//   // ]
// };

// module.exports = [
//   // merge(config, {
//   //   entry: path.resolve(__dirname + '/src/plugin.js'),
//   //   output: {
//   //     filename: 'vue-js-3-rails-restful-api-collection.min.js',
//   //     libraryTarget: 'window',
//   //     library: 'VueJs3RailsRestfulApiCollection',
//   //   }
//   // }),
//   merge(config, {
//     entry: path.resolve(__dirname + '/src/EditableList/index.vue'),
//     output: {
//       filename: 'vue-js-3-rails-restful-api-collection.js',
//       libraryTarget: 'umd',
//       library: 'vue-js-3-rails-restful-api-collection',
//       umdNamedDefine: true
//     }
//   })
// ];