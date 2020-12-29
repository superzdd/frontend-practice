# 在vue中使用Webpack Bundle Analyzer
使用Webpack Bundle Analyzer可以检查项目依赖了多少外部包，从而对外部包进行删减和合并版本的操作，减小整个项目的体积。

## 2020-12-29更新
vue-cli中不用配置vue.config.js就可以使用Webpack Bundle Analyzer的方法，原来vue-cli自带了这个工具，但是需要安装。使用说明如下：
### 1. 安装
```
vue add webpack-bundle-analyzer
```

### 2. 运行
查看开发时的依赖，analyzer将会默认运行在8888端口，原项目运行在8080端口
```
npm run serve
```

查看打包后的依赖
```
npm run build --report
```

这样的方式无疑更好，省去了反复修改vue.config.js带来的麻烦。

## ~使用说明~（推荐使用上方2020-12-29更新的做法，下面的方法稍微繁琐一些）
### 1. 安装
```
npm install --save-dev webpack-bundle-analyzer
```

### 2. 填写配置
> **特别注意**：Webpack Bundle Analyze在使用时要手动开启，不使用时需要**手动关闭**。如果不关闭，会影响到整个项目的打包和开发

开启 Webpack Bundle Analyzer 的 vue.config.js代码
```js

/** 
* 开启 Webpack Bundle Analyzer
*/
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    publicPath:
        process.env.NODE_ENV === "production"
            ? "http://proj.domain.com/proj/"
            : "./",
    productionSourceMap: false,
    filenameHashing: false,
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
    },
    devServer: {
        port: 8080,
        disableHostCheck: true,
    },
    configureWebpack: {
        plugins: [new BundleAnalyzerPlugin()],
    },
};

```

关闭 Webpack Bundle Analyzer 的 vue.config.js代码
```js
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    publicPath:
        process.env.NODE_ENV === "production"
            ? "http://proj.domain.com/proj/"
            : "./",
    productionSourceMap: false,
    filenameHashing: false,
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {},
    },
    devServer: {
        port: 8080,
        disableHostCheck: true,
    },
    configureWebpack: {
        // plugins: [new BundleAnalyzerPlugin()],
    },
};

```

### 3. 运行
查看开发时的依赖
```
npm run serve
```

查看打包后的依赖
```
npm run build --report
```