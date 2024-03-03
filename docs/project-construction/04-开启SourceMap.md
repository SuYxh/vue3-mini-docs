## 04-开启 SourceMap

此时，我们已经成功的运行了一个测试实例代码，但是在这样的一个测试实例代码中，`Vue` 内部是如何执行的呢？

如果想要知道这个，那么我们需要对 `vue` 的代码进行 `debugger` 来跟踪 `vue` 代码的执行。

那么问题就来了，**如何对 `Vue` 进行 `debugger` 操作呢？**

如果想要对 `Vue` 进行 `debugger` 操作，那么我们必须要开启 `vue` 的 `source-map` 功能。

### 开启 `Vue` 的 SourceMap

那么如何开启 `Vue` 的 `source-map` 呢？

1. 打开 `package.json` 可以发现，当我们执行 `npm run build` 时，其实执行的是 `node scripts/build.js` 指令

2. 这就意味着，它的配置文件读取的是 `scripts/build.js` 这个文件

3. 那么在该文件中存在这样的一行代码：

   ```js
   ...
   sourceMap ? `SOURCE_MAP:true` : ``
   ...
   ```

4. 也就是说，这里的 `sourceMap` 变量，决定了 `SOURCE_MAP:true` 还是 ‘’

5. 而这个值，最终会被设置到环境变量中，在 `rollup.config.js` 中，通过：

   ```js
   output.sourcemap = !!process.env.SOURCE_MAP;
   ```

   的形式，赋值给 `output.sourcemap`

6. 而 `output.sourcemap` 则决定了，最终的打包，是否会包含 `source-map`：

   ```js
   sourceMap: output.sourcemap;
   ```

7. 所以，根据以上代码，只要 `scripts/build.js` 中的 `sourceMap` 变量的值为 `true`，则最终会打包包含 `sourcemap` 的包。

8. 那么 `sourceMap` 变量的值是如何确定的呢？

9. 在 `scripts/build.js` 中，我们可以看到如下代码：

   ```js
   const sourceMap = args.sourcemap || args.s;
   ```

10. 而 `args` 的值为：

    ```js
    const args = require("minimist")(process.argv.slice(2));
    ```

11. 从代码可知，`args` 是 `minimist` 的导出对象。

12. 所以我们需要看下 [minimist](https://www.npmjs.com/package/minimist) 这个依赖包是干什么呢？

13. 根据官网的实例代码可知：

    ```shell
    var argv = require('minimist')(process.argv.slice(2));
    console.log(argv);

    $ node example/parse.js -a beep -b boop
    { _: [], a: 'beep', b: 'boop' }
    ```

14. 我们可以在执行 `npx` 指令时，通过 `-a beep` 的形式为 `require('minimist')(process.argv.slice(2));` 导出的值增加属性

15. 所以，根据以上代码，我们可以在 `package.json` 中修改 `build` 指令为：

    ```shell
    "build": "node scripts/build.js -s"
    ```

16. 其中的 `-s` 表示：我们将为 `scripts/build.js` 文件中的 `args` 新增一个属性 `s`

17. 而这个 `s` 将决定了 `sourceMap` 常量的值为 `true`

18. 此时，我们再执行 `npm run build` 可以发现，打包出的所有文件都将包含一个 `xxxx.map` 文件

19. 这样我们就开启了源代码的 `source-map`

20. 有了 `source-map` 之后，接下来我们就可以对代码进行 `debugger` 了。
