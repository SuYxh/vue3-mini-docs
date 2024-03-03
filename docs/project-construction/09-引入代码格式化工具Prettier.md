## 09-配置 Prettier

因为对于 `vue` 而言，它是一个开源的可以被众多开发者贡献的框架项目，所以为了保证整个项目的代码书写具备统一风格，`vue` 导入了[eslint](https://cn.eslint.org/) 和 [prettier](https://www.prettier.cn/) 进行代码格式控制。

但是对于我们而言，因为这并不是一个开源的代码仓库，所以我们无需专门导入 `eslint` 增加项目的额外复杂度，只需要导入 `prettier` 帮助我们控制代码格式即可。

1. 在 `VSCode` 扩展中，安装 `prettier` 辅助插件

![图片描述](https://qn.huat.xyz/mac/202403021856911.jpg)

2. 在项目根目录下，创建 `.prettierrc` 文件：

   ```json
   {
     // 结尾无分号
     "semi": false,
     // 全部使用单引号
     "singleQuote": true,
     // 每行长度为 80
     "printWidth": 80,
     // 不添加尾随 ， 号
     "trailingComma": "none",
     // 省略箭头函数括号
     "arrowParens": "avoid"
   }
   ```

3. 至此 `prettier` 配置成功。
