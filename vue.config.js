const webpack = require('webpack')
const path = require('path')
const os = require('os')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

const isBuild = process.argv[2] === 'build'

// 根据不同环境返回代理的接口域名
const returnProxyUrl = () => {
  if (isBuild) {
    process.env.NODE_ENV = 'production'
  }
  let runEnv = ''
  if (process.env.VUE_APP_ENV !== 'prod') {
    runEnv = `-${process.env.VUE_APP_ENV}`
  }
  return `https://www${runEnv}.shiguangkey.com`
}

module.exports = {
  publicPath: '/', // 基本路径
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'static', // 静态文件目录
  productionSourceMap: false, // 生产环境不生成sourse map
  chainWebpack: config => {
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.fix = true
        return options
      })
      .end()
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, 'src/svgs'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/svgs'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'z-icon-[name]',
      })
      .end()
    if (isBuild) {
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')
    }
  },
  css: {
    loaderOptions: {
      // 供全局可以使用sass配置
      sass: {
        // 旧版使用data，新版使用prependData
        prependData: `
          @import "@/styles/_var.scss";
          @import "@/styles/_mixin.scss";
        `,
      },
    },
  },
  devServer: {
    port: 9001,
    host: '0.0.0.0',
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      '/api': {
        target: returnProxyUrl(),
        changeOrigin: true,
      },
    },
    before: () => {},
    after: () => {},
  },
  configureWebpack: config => {
    const plugins = [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendorvue-manifest.json'),
      }),
      // 将 dll 注入到 生成的 html 模板中
      new AddAssetHtmlPlugin({
        // dll文件位置
        filepath: path.resolve(__dirname, './public/vendor/*.js'),
        // dll 引用路径
        publicPath: './vendor',
        // dll最终输出的目录
        outputPath: './vendor',
      }),
    ]
    if (isBuild) {
      config.plugins = [...config.plugins, ...plugins]
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
    config.devtool = !isBuild ? 'cheap-module-eval-source-map' : false
  },
  parallel: os.cpus().length > 1, // 构建时开启多进程处理babel编译
}
