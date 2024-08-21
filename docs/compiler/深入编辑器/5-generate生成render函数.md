## generate 生成 render 函数

我们来完成 `generate` 的函数拼接：

1. 在 `generate` 方法中，新增 `with` 的处理：

   ```js
   export function generate(ast) {
   	...

   	// 增加 with 触发（加到 hasHelpers 之前）
   	push(`with (_ctx) {`)
   	indent()

   	// 明确使用到的方法。如：createVNode
   	const hasHelpers = ast.helpers.length > 0
   	...

   	// with 结尾
   	deindent()
   	push(`}`)

   	// 收缩缩进 + 换行
   	...

   	return {
   		ast,
   		code: context.code
   	}
   }
   ```

2. 在 `genNode` 中处理其他节点类型：

   ```ts
   function genNode(node, context) {
   	switch (node.type) {
   		...
   		// 复合表达式处理
   		case NodeTypes.SIMPLE_EXPRESSION:
   			genExpression(node, context)
   			break
   		// 表达式处理
   		case NodeTypes.INTERPOLATION:
   			genInterpolation(node, context)
   			break
   		// {{}} 处理
   		case NodeTypes.COMPOUND_EXPRESSION:
   			genCompoundExpression(node, context)
   			break
   	}
   }
   ```

3. 增加 `genExpression` 方法，处理复合表达式

   ```js
   /**
    * 复合表达式处理
    */
   function genCompoundExpression(node, context) {
   	for (let i = 0; i < node.children!.length; i++) {
   		const child = node.children![i]
   		if (isString(child)) {
   			context.push(child)
   		} else {
   			genNode(child, context)
   		}
   	}
   }
   ```

4. 增加 `genExpression` 方法，处理 表达式

   ```ts
   function genExpression(node, context) {
     const { content, isStatic } = node;
     context.push(isStatic ? JSON.stringify(content) : content, node);
   }
   ```

5. 增加 `genInterpolation` 方法，处理 `{{}}`

   ```ts
   /**
    * {{}} 处理
    */
   function genInterpolation(node, context) {
     const { push, helper } = context;
     push(`${helper(TO_DISPLAY_STRING)}(`);
     genNode(node.content, context);
     push(`)`);
   }
   ```

此时运行测试实例，可以得到如下 `render` 函数：

```js
const _Vue = Vue;

return function render(_ctx, _cache) {
  with (_ctx) {
    const {
      toDisplayString: _toDisplayString,
      createElementVNode: _createElementVNode,
    } = _Vue;

    return _createElementVNode(
      "div",
      [],
      [" hello " + _toDisplayString(msg) + " "]
    );
  }
};
```
