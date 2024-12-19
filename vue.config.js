const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/study-guide/' // Replace 'study-guide' with your actual repository name
    : '/'
});