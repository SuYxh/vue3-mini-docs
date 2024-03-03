## 10-配置 Rollup

[rollup](https://www.rollupjs.com/) 是一个模块打包器，和 [webpack](https://webpack.docschina.org/concepts/) 一样可以将 `JavaScript` 打包为指定的模块。

但不同的是，对于 `webpack` 而言，它在打包的时候会产生许多 **冗余的代码**，这样的一种情况在我们开发大型项目的时候没有什么影响，但是如果我们是开发一个 **库** 的时候，那么这些冗余的代码就会大大增加库体积，这就不好美好了。

所以说我们需要一个 **小而美** 的模块打包器，这就是 [rollup](https://www.rollupjs.com/)。

> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

### rollup

我们可以在项目根目录下，创建 `rollup.config.js` 文件作为 `rollup` 的配置文件（就像 `webpack.config.js` 一样 ）：

```js
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

/**
 * 默认导出一个数组，数组的每一个对象都是一个单独的导出文件配置，详细可查：https://www.rollupjs.com/guide/big-list-of-options
 */
export default [
  {
    // 入口文件
    input: "packages/vue/src/index.ts",
    // 打包出口
    output: [
      // 导出 iife 模式的包
      {
        // 开启 SourceMap
        sourcemap: true,
        // 导出的文件地址
        file: "./packages/vue/dist/vue.js",
        // 生成的包格式：一个自动执行的功能，适合作为<script>标签
        format: "iife",
        // 变量名
        name: "Vue",
      },
    ],
    // 插件
    plugins: [
      // ts 支持
      typescript({
        sourceMap: true,
      }),
      // 模块导入的路径补全
      resolve(),
      // 将 CommonJS 模块转换为 ES2015
      commonjs(),
    ],
  },
];
```

依赖包的详细版本为：

```js
"devDependencies": {
  "@rollup/plugin-commonjs": "^22.0.1",
  "@rollup/plugin-node-resolve": "^13.3.0",
  "@rollup/plugin-typescript": "^8.3.4"
}
```

那么至此我们就配置了一个基本的 `rollup` 的配置文件

然后我们可以在 `input` 路径下创建对应的 `index.ts`，并写入初始代码：

```js
console.log("hello vue-next-mini");
```

同时因为我们使用的是 `ts`，所以还需要安装：`tslib typescript`：

```shell
pnpm i -D tslib@2.4.0  typescript@4.7.4
```

那么至此，所有的配置完成。

此时我们可以在 `package.json` 中新增一个 `scripts`：

```js
"build": "rollup -c"
```

执行 `npm run build`，即可打包成功。

![图片描述](https://qn.huat.xyz/mac/202403021857731.jpg)
