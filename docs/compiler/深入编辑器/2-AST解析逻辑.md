## AST 解析逻辑

```json
// 需要新增的 AST 结构
{
  "type": 5, // NodeTypes.INTERPOLATION
  "content": {
    "type": 4, // NodeTypes.SIMPLE_EXPRESSION
    "isStatic": false,
    "constType": 0,
    "content": "msg",
    "loc": {}
  }
}
```

查看 `packages/compiler-core/src/parse.ts` 中的代码逻辑，找到 `parseChildren` 方法。

我们知道该方法的主要是用来解析子节点，内部存在如下的 `if` 逻辑：

```js
if (startsWith(s, '{{')) {
	...
}
```

对于该逻辑而言，它就是用来处理复合表达式的对应逻辑，我们可以在该逻辑中，生成对应的 `node`：

```diff
function parseChildren(context: ParserContext, ancestors) {
	...
	while (!isEnd(context, ancestors)) {
		...
		if (startsWith(s, '{{')) {
			node = parseInterpolation(context)
		}
		// < 意味着一个标签的开始
		else if (s[0] === '<') {
			...
		}
...

	return nodes
}
```

然后增加 `parseInterpolation` 方法：

```js
/**
 * 解析插值表达式 {{ xxx }}
 */
function parseInterpolation(context: ParserContext) {
  // open = {{
  // close = }}
  const [open, close] = ["{{", "}}"];

  advanceBy(context, open.length);

  // 获取插值表达式中间的值
  const closeIndex = context.source.indexOf(close, open.length);
  const preTrimContent = parseTextData(context, closeIndex);
  const content = preTrimContent.trim();

  advanceBy(context, close.length);

  return {
    type: NodeTypes.INTERPOLATION,
    content: {
      type: NodeTypes.SIMPLE_EXPRESSION,
      isStatic: false,
      content,
    },
  };
}
```

至此，我们成功解析了 `AST`。

打印解析之后的 `AST` 可得：

```js
const ast = {
  type: 0,
  children: [
    {
      type: 1,
      tag: "div",
      tagType: 0,
      props: [],
      children: [
        { type: 2, content: " hello " },
        { type: 5, content: { type: 4, isStatic: false, content: "msg" } },
        { type: 2, content: " " },
      ],
    },
  ],
  loc: {},
};
```

我们可以把以上代码替换到源码的 `baseCompile` 中，发现可正常渲染。证明我们当前生成的 `AST` 没有问题。
