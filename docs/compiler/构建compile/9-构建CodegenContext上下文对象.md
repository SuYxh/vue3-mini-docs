## 构建 CodegenContext 上下文对象

对于 `generate` 的构建，我们将分成两部分来进行实现：

1. 构建 `context` 上下文对象
2. 利用 `context` 完成函数拼接

那么，我们先实现第一部分

1. 在 `packages/compiler-core/src/compile.ts` 的 `baseCompile` 方法中，完成 `generate` 的调用：

   ```js
   export function baseCompile(template: string, options = {}) {
   	...
   	return generate(ast)
   }
   ```

2. 创建 `packages/compiler-core/src/codegen.ts` 模块，构建 `generate` 和 `createCodegenContext` 方法：

   ```ts
   /**
    * 根据 JavaScript AST 生成
    */
   export function generate(ast) {
   	// 生成上下文 context
   	const context = createCodegenContext(ast)

   	// 获取 code 拼接方法
   	const { push, newline, indent, deindent } = context

   	...
   }
   ```

   ```ts
   function createCodegenContext(ast) {
     const context = {
       // render 函数代码字符串
       code: ``,
       // 运行时全局的变量名
       runtimeGlobalName: "Vue",
       // 模板源
       source: ast.loc.source,
       // 缩进级别
       indentLevel: 0,
       // 需要触发的方法，关联 JavaScript AST 中的 helpers
       helper(key) {
         return `_${helperNameMap[key]}`;
       },
       /**
        * 插入代码
        */
       push(code) {
         context.code += code;
       },
       /**
        * 新的一行
        */
       newline() {
         newline(context.indentLevel);
       },
       /**
        * 控制缩进 + 换行
        */
       indent() {
         newline(++context.indentLevel);
       },
       /**
        * 控制缩进 + 换行
        */
       deindent() {
         newline(--context.indentLevel);
       },
     };

     function newline(n: number) {
       context.code += "\n" + `  `.repeat(n);
     }

     return context;
   }
   ```

那么至此，我们就完成了 `CodegenContext` 上下文对象的构建
