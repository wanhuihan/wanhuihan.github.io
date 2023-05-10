
## 基于react使用acro.design按需加载的问题
官方文档给出按需加载使用如下配置
```js
plugins: [
  [
    'babel-plugin-import',
    {
      libraryName: '@arco-design/web-react',
      libraryDirectory: 'es',
      camel2DashComponentName: false,
      style: true, // 样式按需加载
    },
  ],
];
```
但是不生效，需要将style设置为css，才会生效

## nginx配置https证书
