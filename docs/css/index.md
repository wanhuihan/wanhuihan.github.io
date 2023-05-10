
[[toc]]

## 样式优先级

如果有样式冲突的话，css会通过优先级来进行渲染元素样式。

浏览器将优先级分为行内样式,选择器和用户代理样式表(也就是浏览器默认样式)

样式优先级规则

``` css
/**
 * tag < class < id < inline < !important
 */
```
> 说明 伪类选择器:hover和属性选择器[type='button']与一个类选择器的优先级相同，通用选择器* 和(> + ~)对优先级没有影响

按照如下规则就可以很容易找出样式的权重了，下面的例子#page-title权重最高

|  选择器   | ID  | class | 标签 | 标记
|  ----  | ----  | ---- | ---- | ----
| ``` html body header h1```  | 0 | 0 | 4 | 0,0,4 
| ``` body header.page-header h1 ```  | 0 | 1 | 3 | 0,1,3
| ```.page-header .title ```  | 0 | 2| 0 | 0,2,0
| ``` #page-title ```  | 1 | 0| 0 | 1,0,0

- 如果权重一样，则以代码中最后出现的为准
- 其次是行内样式的权重, 行内样式优先级默认为
- !important权重最高

### 链接样式
链接样式根据lvha,a:linked, a:active, a:hover, a:active的顺序进行编写

### 源码顺序
浏览器遵循三个步骤，来源、优先级、源码顺序来解析网页上每个元素的每个属性。

## 继承

### 文本属性
```
color, font, font-family, font-size, font-weight, 
font-variant, font-style, line-height, letter-spacing, 
text-align, text-indent, text-transform, white-space, word-spacing
```
### 列表属性
```
list-style, list-style-type, list-style-position, list-style-image
```
### 表格
```
border-collapse,border-spacing
```
## 特殊值 inherit, initial
inherit可以强制继承一个通常不会被继承的属性，比如边框和内边距，一般很少这么做。
initial撤销，重置为默认样式

> width的默认值为auto， 但不是所有的属性都可以使用auto。display的默认值为inline.

## 简写属性
font, background, border, border-width, margin, padding, box-shadow

``` css
a {
    font: italic bold 18px/1.2 'Helvetica', 'Arial';
    background: url(../image.png) no-repeat 0 0;
}
/**
 ⚠️ font 简写属性会覆盖默认样式
*/
```

```css 
.box {
    border: 1px solid red;  /* border: black 1px solid */
}
```
