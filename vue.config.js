module.exports = {
  devServer: {
    proxy: {
      /*
        key:value
        key--前缀,自己起的  /migu
        value--跟 http-proxy-middleware 相同的配置
        */
      '/migu': {
        target: 'https://api.asilu.com',
        changeOrigin: true,
        pathRewrite: {
          '^/migu': ''
        }
      },
      '/api': {
        target: 'http://mhd.zhuishushenqi.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
