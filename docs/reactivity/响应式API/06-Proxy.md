## 06-Proxy

因为 `Object.defineProperty` 存在的问题，所以 `vue3` 中修改了这个核心 `API`，改为使用 [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 进行实现。

`proxy` 顾名思义就是 **代理** 的意思。我们来看如下代码：

```js
<script>
  // 定义一个商品对象，包含价格和数量
  let product = {
    price: 10,
    quantity: 2
  }

  // new Proxy 接收两个参数（被代理对象，handler 对象）。
  // 生成 proxy 代理对象实例，该实例拥有《被代理对象的所有属性》 ，并且可以被监听 getter 和 setter
  // 此时：product 被称为《被代理对象》，proxyProduct 被称为《代理对象》
  const proxyProduct = new Proxy(product, {
    // 监听 proxyProduct 的 set 方法，在 proxyProduct.xx = xx 时，被触发
    // 接收四个参数：被代理对象 tager，指定的属性名 key，新值 newVal，最初被调用的对象 receiver
    // 返回值为一个 boolean 类型，true 表示属性设置成功
    set(target, key, newVal, receiver) {
      // 为 target 附新值
      target[key] = newVal
      // 触发 effect 重新计算
      effect()
      return true
    },
    // 监听 proxyProduct 的 get 方法，在 proxyProduct.xx 时，被触发
    // 接收三个参数：被代理对象 tager，指定的属性名 key，最初被调用的对象 receiver
    // 返回值为 proxyProduct.xx 的结果
    get(target, key, receiver) {
      return target[key]
    }
  })

  // 总价格
  let total = 0;
  // 计算总价格的匿名函数
  let effect = () => {
    total = proxyProduct.price * proxyProduct.quantity;
  };

  // 第一次打印
  effect();
  console.log(`总价格：${total}`); // 总价格：20
</script>
```

在以上代码中，我们可以发现，`Proxy` 和 `Object.defineProperty` 存在一个非常大的区别，那就是：

proxy

1. `Proxy` 将代理一个对象（被代理对象），得到一个新的对象（代理对象），同时拥有被代理对象中所有的属性。
2. 当想要修改对象的指定属性时，我们应该使用 **代理对象** 进行修改
3. **代理对象** 的任何一个属性都可以触发 `handler` 的 `getter` 和 `setter`

Object.defineProperty

1. `Object.defineProperty` 为 **指定对象的指定属性** 设置 **属性描述符**
2. 当想要修改对象的指定属性时，可以使用原对象进行修改
3. 通过属性描述符，只有 **被监听** 的指定属性，才可以触发 `getter` 和 `setter`

所以当 `vue3` 通过 `Proxy` 实现响应性核心 `API` 之后，`vue` 将 **不会** 再存在新增属性时失去响应性的问题。
