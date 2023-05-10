::: tip
构建软件设计的方法有两种：一种是把软件做的很简单以至于明显找不到缺陷，另外一种是把它做成很复杂以至于找不到明显的缺陷。
-C.A.R.Hoare
:::

代码风格规范的目的是在多人协作的场景下是代码具有一致性。

这一部分的编程时间只会涵盖很小的问题。其中一些实践是和设计模式相关的，另外更多的内容只是增强你的代码总体质量的一些简单技巧。

之前通过jslint和jshent来进行规范，当前可使用eslint来检测。

## UI的松耦合
~~在web开发中，用户界面(User Interfaoe， UI)，是由三个彼此隔离又互相作用的层定义的~~ [书中该部分写错了，应该是Interface] 
- html用来定义页面的数据和语意和布局
- css用来给页面添加样式
- javascript用来给页面添加行为，时期更具交互性

css和javascript感觉更像是兄弟关系，javascript的正确运行不应当依赖css，在缺少css的情况下也要能够正确运行。

### 什么是松耦合
当一个大系统的每个组件内容有了限制，你就做到了松耦合，松耦合对于代码可维护性来说至关重要。

### 将javascript从css中抽离
```css
.box {
    width: expression(document.body.offsetWidth + 'px')
}
```

### 将css从javascript中抽离
``` js
element.style.color = 'red'  // ❌
element.style.fontSize = '12px' // ❌
```
这样的话如果出问题，肯定先去找css原因，如果找不到，才会去js中查找，使排查问题增加了难度。

好的写法通常会直接操作css的className

```js
element.classList.add('reveal') // h5
element.className += 'reveal' // 原生
...
```

排除有一些必须使用js来操作css的时候，比如说style.bottom, style.top，定位的时候就需要js操作样式了。

### 将Javascript从HTML中抽离

``` html
<button onclick="doSomething()">Click</button> // ❌
```
上面的代码就造成的html和js的深耦合，当点击按钮是，方法doSomething必须存在。
对于支持2级DOM模型的浏览器来说可以这样做
```js
btn.addEventListener('click', function(e) {
    // todo:
})
```
这样做的好处是如果函数名称需要修改，只改一处即可，如果发生点击时行做一些动作，也只需要改一处。
ie8及以前的写法
```js
btn.attachEvent('onclick', function(e){
    // todo
})
```
如果需要兼容性处理，则需要给0级DOM模型对象的on属性赋值处理程序。

在html中有另外一种写法是使用script标签，标签内包含內联的脚本代码，也是一种不好的写法。

### 将HTML从Javascript中抽离
将html潜入在Javascript代码中时非常不好的实践。 当HTML和J啊超市次日平台混淆在一起时，则将这个问题变得复杂化了。

大多web应用本质是动态的，多种方法可以以低耦合的方法来完成工作。

#### 从服务器加载
通过接口返回html片段进行渲染，现在可以使用react,vue中的服务端渲染技术来完成。

#### 客户端模板
比如说有artTemplate, handlebars.js等等。

## 避免使用全局变量

### 全局变量带来的问题
全局变量会导致一些非常重要的可维护性难题。

#### 命名冲突
当脚本中的全局变量和全局函数越来越多时，发生命名冲突的概率也就高了

#### 代码的脆弱性
一个依赖于全局变量的函数即为深耦合与上下文环境之中，如果环境发生改变，函数很可能就失效了。

```js
function sayColor() {
    console.log(color) // ❌
}

function sayColor(color) {
    console.log(color) // ✅
}
```
定义函数的时候，最好尽可能多的将数据置于局部作用域内，热河来自函数外部的数据都应当以参数形式传进来，这样可以和外部环境隔离开来，并且你的修改不会对程序其他部分造成影响。

#### 难以测试
任何依赖全局变量才能正常工作的函数，只有为期重新创建完整的全局环境才能正确的测试它。

> 保证你的函数不会对全局变量有依赖，这将增强你的代码的可测试性！！！！！

### 意外的全局变量
在es5中，当你给一个未被var声明过的变量赋值时，会自动创建一个全局变量。
```js
function doSomething() {
    var title = 'hello';
    name = 'Nicholas' // 无意中创建了个全局变量，window.name === 'Nicholas'，这个比较严重
}
```
本身window对象上默认有个name属性，会用于iframe场景中，但改变name可能会导致程序错误。

#### 避免意外的全局变量
在严格模式下，禁止使用未被var定义的变量。

### 单全局变量方式
- yui定义了唯一一个yui全局对象
- jquery定义了两个全局对象，$, jQuery
- dojo定义了一个dojo

比如说
```js
function Book() {
    this.name = 'Tester'
    ...
}
Book.prototype.toNextPage = function() {
    retun this.currentPage + 1;
}
// 
var book1 = new Book()
var book2 = new Book()
```

### 命名空间
命名空间时简单的通过全局对象的单一属性表示功能性分组。

### 模块
另外一种基于单全局变量的扩充方法时使用模块(modules)。
AMD(Asynchronous Module Definition) 异步模块定义，调用模块时候立即进行加载依赖，依赖都加载完成后会即刻执行回调函数。

yui模块引入是AMD的一个代表，具体可以移步到YUI官方文档中。

### 零全局变量
实现零全局变量的方法就是使用立即执行函数。

## 事件处理

### 典型用法
```js
// 不好的写法
function handleClick(event) {
    var popup = document.getELementById('popup')
    popup.style.left = event.clientX + 'px'
    popup.style.top = event.clientY + 'px'
    popup.className = 'reveal'
}

addEventListener('click', handleClick)

```
### 规则1 隔离应用逻辑
调用功能性代码最好的做法就是单个的函数调用。

总是需要将应用逻辑和事件处理的代码拆分开来。

上面的代码可以进行以下拆分
```js
var Application = {
    handleClick: function(event) {
        this.showPopup(event)
    },
    showPopup: function(event) {
        var popup = document.getELementById('popup')
        popup.style.left = event.clientX + 'px'
        popup.style.top = event.clientY + 'px'
        popup.className = 'reveal'
    }
}

addEventListener('click', handleClick)
```
若应用逻辑被剥离出去，对同一段功能代码的调用可以在多点发生，则不需要一定依赖于某个特定事件的处罚，这显然更加方便，这只是事件处理程序代码的第一步。

### 规则2 不要分发事件对象
上面的代码还有些问题，event一直被传来传去的，其实只用到了两个。
应用逻辑不应当依赖于event对象来正确完成功能，原因
- 方法接口并没有标明那些数据是必要的，好的api一定是对于期望和依赖都是透明的，把event传过去不能告诉你event的哪些属性是有用的，用来干什么的
- 只有确切的知道这个方法使用了哪些信息，这样才能正确地写出测试代码

> 这些问题在大型web应用中是不可取的，代码不够明晰会导致bug

最佳的办法是让时间和处理程序使用event对象来处理事件，然后拿到所有需要的数据传给应用逻辑， 应用逻辑的方法只需要两个函数,x,y, 于是有了如下代码

```js
var Application = {
    handleClick: function(event) {
        const {clientX, clientY} = event
        this.showPopup(clientX, clientY)
    },
    showPopup: function(x,y) {
        var popup = document.getELementById('popup')
        popup.style.left = x + 'px'
        popup.style.top = y + 'px'
        popup.className = 'reveal'
    }
}

addEventListener('click', handleClick)
```
如果事件支持DOM2 ，可以阻止事件的默认行为
```js
function handleClick(e) {
    e.preventDefault()
    e.stopPropergation()
}
```


## 避免空比较

### 检测原始值
javascript原始类型有 字符串，数字，布尔值，null和undefined.
```js
typeof '123' // string
typeof 123 // number
typeof true // boolean
typeof null // object
typeof undefined // undefined
// 可以这么用 typeof()
```
typeof 运算符的独特之处在于将其用于一个未声明的变量也不会报错，而是统一返回undefined。
如果检测DOM元素的时候，可以使用null,因为DOM没有的话直接返回null，是一种可预见的输出。

运行typeof null 为object，这是一种低效的判断null方法。如果需要检测null,则直接用恒等（===）或（!==）。

### 检测引用值
引用值也称为对象，javascript内置引用类型有Object, Array, Date, Error，数量不多。
```js
typeof {} // object
typeof [] // object
typeof new Date() // object
typeof null // object
```
检测某个引用值的类型最好的办法是使用instanceof运算符。
```js
var date = new Date()
data instanceof Date // true
var arr = []
arr instanceof Array // true
```
instanceof不仅检测构造对象的构造器，还检测圆型链，原型链包含了很多信息，包括定义对象所采用的继承模式
```js
var now = new Date()
now instanceof Date // true
now instanceof Object // true
```
instanceof 也可以用来检测自定义类型。

检测自定义类型最好的做法就是使用instanceof 运算符。
检测Object和Array一般不用instanceof。

###  检测函数
函数属于引用类型，同样存在Function构造函数，每个函数其实都是实例。
```js
function fn(){}

typeof fn // function
fn instanceof Function // true ❌
```
检测函数最好的方法是使用typeof，因为它可以跨帧使用。

### 检测数组
```js
// 方法1
function isArray(arr) {
    return typeof arr.sort === 'function'
}
// 方法2
function isArray(arr) {
    return Object.prototype.toString.call(value) === '[Object Array]'
}
```
方法2在识别内置对象时十分哟用，但对于自定义对象请不要使用这种方法。
ES6将Array.isArray方法正式引入，目的就是准确的检测一个值是否为数组。

### 检测属性
```js
object[propertyName] // ❌
object[propertyName] !== null // ❌
object[propertyName] !== undefined // ❌
```
以上的方法都不是很好，不太严谨，因为属性的值可能确实为null, undefined，0等等。
判断属性存在的最好方法是使用in运算符。in运算符仅仅会简单的判断属性是否存在，而不会去读属性的值。

如果只想检查实例对象的某个属性是否存在，也可以使用hasOwnProperty。
不考虑兼容性问题的好的写法
```js
var obj = {
    name: "",
    val: null
}
"count" in obj // true
"val" in obj // true

obj.hasOwnProperty('name') // true

```
hasOwnProperty用在检测DOM中不合适，因为考虑到兼容性问题，所以最好先检测Object是否有hasOwnProperty属性存在。

## 将配置数据从代码中分离出来
精心设计的应用应当将关键数据从主要的源码中抽离出来，这样我们修改源码时才更加放心。

### 什么是配置数据

配置数据是应用中写死的值
```js
function validate(value) {
    if (!value){
        alert('Invalid Value');
        location.href = './login.php'
        ...
    }
    ...
}
```
Invalid Value和./login.php就是写死的值, 我们认为它们为配置数据，如果写死在代码里，将来可能会被修改。

### 抽离配置数据
上面的代码可以抽离成如下
``` js
const config = {
    MSG_INVALID: 'Invalid Value',
    URL_INVALID: './login.php'
}
function validate(value) {
    if (!value){
        alert(config.MSG_INVALID);
        location.href = config.URL_INVALID
        ...
    }
    ...
}
```

### 保存配置数据
配置数据最好放在单独的文件中，以便清晰的分隔数据和应用逻辑。将配置数据放置于单独的js文件中是一个不错的开始。

## 抛出自定义错误
搞清楚代码中哪里合适抛出错误时需要时间的。因此，一旦搞清楚这一点，调试代码的时间将大大缩短，对代码的满意度将急剧提升。

### 错误的本质

错误常常在非期望的地点、不适当的时机跳出来，这很麻烦，跟糟糕的是，默认的错误消息通常太简洁而无法解释到底什么东西出错了。如果跳出一个错误能这样描述 "由于发生这些情况，该函数调用失败"。
### 在javascript中抛出错误
```js
throw new Error('something bad happened')
```
如果没有通过try-catch语句捕获，抛出任何值都将引发一个错误。

### 抛出错误的好处
``` js
function getDivs(element) {
    return element.getElementsByTagName('div')
}
```
如果element下没有div不满足条件的时候，比如说传个null，则会报错。

### 何时抛出错误
理解了如何抛出错误时等式的一个部分，另外一个部分要理解什么时候抛出错误。

关于抛出错误很好的经验法则：
- 一旦修复了一个很难调试的错误，尝试增加一两个自定义错误。当再次发生错误，浙江有助于更容易的坚决问题。
- 如果正在编写代码，思考一下：“我希望【某些事情】不会发生，如果发生，我的代码会一团糟”。这时，如果某些事情发生，就抛出一个错误。
- 如果正在编写的代码别人也会使用，思考一下他们使用的方式，在特定的情况下抛出错误。

我们的目的不是防止错误，而是在错误发生时能更加容易的调试。

### try-catch语句
try块发生错误时，程序立即停止，然后跳到catch块，并传入一个错误对象，检查该对象可以确定从错误中回复的最佳动作。
最后还有个finally块，作用是饿不是是否有错误发生，最后都会被执行。如果try模块中有return 语句，实际上它必须等到finally执行完毕后才能返回，所以finally也不是很常用。

#### 使用throw还是try-catch
通常，开发者很难脱敏的判断时抛出一个错误还是用try-catch来捕获一个错误。错误值应该在应用程序战中最深的部分抛出。应用逻辑总是知道调用某个特定函数的原因，因此也是最适合处理错误的。catch部分尽量不要空着。

### 错误类型

- Error 基本类型错误
- EValError 通过执行eval函数发生错误
- RangeError 一个数字超出他的边界时抛出
- RenderenceError  期望的对象不存在抛出
- SyntaxError  语法错误抛出
- TypeError    变量不是期望的类型时抛出
- URLError     encodeURL, encodeURLComponent,decodeURL或者decodeURLComponent等传递格式非法的URL字符串时抛出。

在ie8或者更早的浏览器汇总不现实错误信息。相反，会看见那个通过的"Exception thrown but not caught"消息，可以自定义错误类型来检测自己的错误。

## 不是你的对象不要动
在一个多人开发的项目中，对象的随意修改就是个大问题。
### 什么是你的
请牢记，如果你的代码没有创建这些对象，不要修改它们，包括
- 原生对象
- DOM对象
- 类库对象
- 浏览器对象模型

### 原则
企业软件需要一支而可靠的执行环境使其方便维护。
- 不覆盖方法
- 不新增方法
- 不删除方法

#### 不覆盖方法
在Javascript中，有史以来最糟糕的事件就是覆盖一个非自己拥有的对象方法。
```js
document.getElementById = function() {
    // todo:
} // ❌
```
将原声方法修改了这是个严重的问题，不要这么做。

#### 不新增方法
你新增的方法不代表以后未来也没有。更糟糕的是如果将来原生的方法和你的方法行为不一致，将会陷入一场代码维护的噩梦！

大多数Javascript库代码有一个插件机制，允许为代码库安全的新增一些功能。如果想修改，最佳最可维护的方式是创建一个插件。

#### 不删除方法
```js
const obj = {
    name : "Jack"
}
delete obj.name 

delete document.getElementById
document.getElementById('id') // it works，任然可以工作
```
delete操作符只能对实力的属性和方法起作用，如果在prototype的属性火方法上使用delete是不起作用的。

### 更好的途径
所谓的设计模式，不直接修改这些对象而是扩展这些对象。
在Javascript之外，最受环境的对象扩充的形式是继承，在Javascript中有两种基本形式，基于对象的继承和类型的继承。

在Javascript中，继承仍然有一些很大的限制。还不能从DOM或者BOM对象继承，其次，由于数组索引和length属性之间错综复杂的关系，继承自Array是不能正常工作的。

#### 基于对象的继承
在基于对象的继承中，也经常叫做原型链继承，一个对象继承另外一个对象是不需要调用构造函数的。es5中Object.create()方法是实现这种继承的最简单的方式。
```js
var person = {
    name: "Nicholas",
    sayName: function() {
        alert(this.name)
    }
}

var myPerson = Object.create(person)
myPerson.sayName() // Nicholas

var otherPerson = Object.create(person, {
    name: 'Jack'
})
otherPerson.sayName() // Jack
```

#### 基于类型的继承
这里的继承时依赖于原型的，基于类型的继承时通过构造函数实现的，而非对象。

比起javascript中原生的类型，在开发者定义了构造函数的情况下，基于类型的继承是最合适的。同时基于类型的继承一般需要两步，首先原型继承，然后构造器继承。构造器继承时调用超类的构造函数时传入新建的对象作为其this的值。

对比基于对象的继承，基于类型的继承在创建新对象时更加灵活。
#### 门面模式
门面模式是一种流行的设计模式，它为一个一存在的对象创建一个新的借口。门面是一个全新的对象，其背后有一个一存在的对象在工作。门面有时也叫包装器，如果用例中继承无法满足要求，那么下一步骤就应该创建一个门面，比较符合逻辑。

门面实现一个特定借口，让一个对象看上去像另外一个对象，就称作一个适配器。门面和适配器唯一不同的是前者创建新街口，后者实现已存在的接口。

### 关于Polyfill的注解

为了达到目的，polyfills经常会给非自己拥有的对象新增一些方法，它是有界限的，相对安全，当原生不方法不存在时，polyfills才新增这些方法，并且它们和原声版本方法的行为是完全一致的。

Polyfill的优点是如果浏览器提供原生实现，可以非常轻松地移除它们。
缺点是和浏览器的原生实现相比，他们的实现可能不能精确，这会给你带来麻烦。

### 阻止修改

防止扩展，密封，冻结
冻结类似密封，禁止为对象修改已存在的属性和方法（所有字段均只读）。
每种锁定的类型都拥有两个方法，一个用来实施操作，另外一个用来检测是否应用了相应的操作。如防止扩展，Object.preventExtension和Object.isExtensible两个函数。

```js
var person = {
    name: "Nicholas"
}
Object.preventExtension(person)
Object.isExtensible(person) // false

person.age = 24 // 不起作用，严格模式下会抛出错误。
```
在严格模式下试图为一个不可扩展的对象新增任何属性火方法将会抛出一个错误。

使用Object.seal函数来密封一个对象。可以使用Object.isSeal来检测是否被密封。
```js
Object.seal(person)
Object.isSeal(person) // true
Object.isExtensible(person) // false
```

使用Object.freeze来冻结一个对象。Object.isFrozen来检查一个对象是否被冻结。

```js
Object.freeze(person)
Object.isFrozen(person) // true
Object.isExtensible(person) // false
Object.isSeal(person) // true
```
被冻结的对象同时也是不可扩展和被密封的。

如果你是一个代码库的作者，很可能像锁定核心库某些部分来保证他们不被意外修改，或者想强迫允许扩展的地方继续存活着。

## 浏览器嗅探

### user-agent检测
用户代理检测
```
Mozilla/2.0 (Compatible; MSIE 3.0; Window 95)
```
随着越来越多的网站通过js检测用户代理，一批新的网站开始在浏览器中无法正常浏览。浏览器并不总是如实报告他们的user-agent字符串，几乎所有的浏览器的user-agent都可以被工具修改。试图去猜测获取到底用户代理字符串是毫无意义的。

### 特性检测
特性检测的原理是为特定的浏览器特性进行测试，并仅当特性存在时即可应用特性检测，请不要这么做
```js
// 不好的写法
if (navigator.userAgent.indexOf(MSIE 7) > -1) {
    // 
} 
// 好的写法
if (document.getElementById) {
    // 
}
```
通过特定的功能进行探测
正确的特性检测的一些重要组成部分。
- 探测标准的方法
- 探测不同浏览器的特定方法
- 当被探测的方法均不存在时提供一个合乎逻辑的备用方法

### 避免特性推断

### 应当如何取舍
不要试图推断特性间的关系，否则最终得到的结果也是不可考的。
用户代理检测唯一的安全方式是针对旧的活着特定版本的浏览器。而绝不应当针对最新版本活着未来的浏览器。

建议尽可能的使用特性检测。如果不能这么做的时候，可以退而求其次，考虑使用用户代理检测，永远不要使用浏览器推断，因为你会被这样维护性很差的代码缠身，而且随着新的浏览器出现，你需要不断的更新代码。






