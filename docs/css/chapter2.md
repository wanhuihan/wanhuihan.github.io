
[[toc]]

## 相对值的好处
CSS支持集中绝对长度单位，最常用，最基础的是像素px(pixel),不常用的绝对单位有mm(毫米), cm(厘米), in(英寸), pt(点，印刷术语),pc(派卡，印刷术语)，换算单位 1in=25.4mm=2.54cm=6pc=72pt=96px。
### em和rem

#### em
大多数浏览器默认font-size为16px, em单位会根据font-size进行变化，

``` css
body {
    font-size: 16px;
}
.slogan {
    font-size: 1.2em; /* 16 * 1.2 px(19.2px) */
    padding: 1.2em; /* (16 * 1.2) * 1.2 px (23.04px) */
}
```

#### rem
em是根据根节点font-size来决定的，通常我们使用:root{font-size:xx}来定义根节点字体大小；

### 视口的相对单位

除了em,rem是相对于font-size定义的，但css里不只有这一种相对单位，还有相对于浏览器定义长度的视口相对的单位:
vh 视口高度的1/100
vw 视口宽度的1/100
vmin 视口宽，高中较小的一方1/100，(IE9中较vm，而不是vmin)
vmax 视口宽高中较大的一方1/100, (IE未确认支持，edge支持vmax)

### 使用calc定义字号
calc函数内可以对两个及以上的值进行基本运算，加减号两边必须有空白
```css
:root{
    font-size: calc(0.5rem + 1vw);
}
```

### 无单位的数值和行高
有些属性允许无单位的值，包括line-height,z-index, font-weight等，任何长度单位都可以用无单位的0

⚠️ 无单位的0只能用长度值和百分比，比如那边句，边框和宽度等。
line-height比较特殊，它的值几可以有单位也可以无单位。通常我们应该使用无单位的数值。

## 自定义属性 css变量

自定义属性不是变量，和css预处理器不一样。
```css
:root {
    --main-font: Helvetica, Arial, sans-serif;
}
```
变量前面必须有两个连字符，用来和css区分，剩下的部分可以随意明明。变量必须在一个声名块内声明。
通过var函数调用来使用该变量
```css
body {
    font-family: var(--main-font);
}
```
var函数接收两个参数，如果第一个没定义，则二个生效；
``` css
body {
    font-family: var(--main-font, Microsoft Yahei);
}
```
如果var函数返回的是非法值，比如font-size 返回的颜色值，则会使用css中font-size的默认值。

### 动态改变自定义属性

```css
:root{
    --bg-color: red;
}
.panel {
    background: var(--bg-color);
}

.panel.active {
    --bg-color: yellow;
}
```
当panel元素默认背景颜色为红色，如果active类名添加的话就会变成黄色;

### js改变自定义属性
``` js
var rootElement = document.documentELement;
var styles = getComputedStyle(rootElement) // native function
var mainColor = styles.getPropertyValue('--main-bg') // native function
console.log(mainColor) // red

rootElement.style.setProperty('--main-bg', 'yellow'); // 改变属性值
```

