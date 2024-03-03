## 04-Object.defineProperty

`vue2` 以 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 作为响应性的核心 `API` ，该 `API` 可以监听：**指定对象的指定属性的 `getter` 和 `setter`**

那么接下来我们就可以借助该 `API`，让我们之前的程序进行 **自动计算**，该 `API` 接收三个参数：**指定对象、指定属性、属性描述符对象**

```js
<script>
  // 定义一个商品对象，包含价格和数量
  let quantity = 2
  let product = {
    price: 10,
    quantity: quantity
  }
  // 总价格
  let total = 0;
  // 计算总价格的匿名函数
  let effect = () => {
    total = product.price * product.quantity;
  };

  // 第一次打印
  effect();
  console.log(`总价格：${total}`); // 总价格：20

  // 监听 product 的 quantity 的 setter
  Object.defineProperty(product, 'quantity', {
    // 监听 product.quantity = xx 的行为，在触发该行为时重新执行 effect
    set(newVal) {
      // 注意：这里不可以是 product.quantity = newVal，因为这样会重复触发 set 行为
      quantity = newVal
      // 重新触发 effect
      effect()
    },
    // 监听 product.quantity，在触发该行为时，以 quantity 变量的值作为 product.quantity 的属性值
    get(val) {
      return quantity
    }
  });
</script>
```

那么此时我们就通过 `Object.defineProperty` 方法成功监听了 `quantity` 属性的 `getter` 和 `setter` 行为，现在当 `quantity` 发生变化时，`effect` 函数将重新计算，以此得到最新的 `total`。
