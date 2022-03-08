> https://github.com/xiatiancheng/vue3-Ts-Pinia

Vue3 + Ts + Vite + Pinias


npm i vite-plugin-vue-setup-extend -D

>借助插件vite-plugin-vue-setup-extend不用写两个script标签，可以直接在script标签上定义name

npm i unplugin-auto-import -D

>我们可以通过unplugin-auto-import实现自动导入，无需import即可在文件里使用Vue的API。

npm i vue-global-api -D
>在没有import的情况下使用会导致eslint提示报错，可以通过在eslintrc.js安装插件**vue-global-api**解决。

// eslintrc.js
module.exports = {
  extends: [
    'vue-global-api'
  ]
}