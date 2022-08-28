# CSS 选择器

在了解本文之前，需要先了解 CSS 基础知识，不懂的小伙伴要自己去补充哦~

**CSS 选择器优点**：

+ 语法简单
+ Vue、React 前端框架的盛行，元素很难存在 id 和 name 这种唯一元素
+ 可以定位复杂元素

**CSS 选择器缺点**: 需要了解前端 CSS 知识

**常见的选择器**：

| 选择器               | 名字                                        | 例子            | 例子描述                                        |
| -------------------- | ------------------------------------------- | --------------- |---------------------------------------------|
| **基础选择器**       |                                             |                 |                                             |
| .class               | class选择器                                 | .intro          | 选择 `class="intro"` 的所有元素。                   |
| #id                  | id选择器                                    | #firstname      | 选择 `id="firstname"` 的元素。                    |
| *                    | 通配符                                      |                 | 选择所有元素。                                     |
| element              | 标签选择器                                  | p               | 选择所有 `<p>` 元素。                              |
| elemnt.class         | 特定class的标签                             | input.kw        | 选择所有 `class='kw'` 的 `<input>` 元素            |
| **关系选择器**       |                                             |                 |                                             |
| element,element      | 分组选择器                                  | div,p           | 同时选择所有 `<div>` 元素和所有 `<p>` 元素。              |
| :not(element)        | 选取不被选中的元素                          | :not(div)       | 选取除` <div> `之外的所有元素                         |
| element element      | 后端选择器                                  | div p           | 选择 `<div>` 元素内部的所有 `<p>` 元素**（包括子元素、孙子元素）** |
| element>element      | 子元素选择器                                | div>p           | 选择 `<div>` 元素下的` <p>` **子元素**。              |
| element+element      | 相邻选择器                                  | div+p           | 选择 `<div>` 元素**之后的第一个兄弟** `<p>` 元素。         |
| element~element      | 兄弟选择器                                  | div~p           | 选择 `<div> `元素**之后的所有兄弟** `<p> `元素。          |
| **属性选择器**       |                                             |                 |                                             |
| E[attr]              | 选取属性                                    | [target]        | 选择带有 target 属性所有元素。                         |
| E[attribute=value]   | 选取属性等于 value 的元素                   | [target=_blank] | 选择 `target="_blank"` 的所有元素。                   |
| E[attribute~=value]  | 选取属性包含多个值，其中一个是 value 的元素 | [title~=flower] | 选择 title 属性包含单词 "flower" 的所有元素。             |
| E[attribute\|=value] | 选取属性等于或第一个值等于 value 的元素     | [lang\|=en]     | 选择 lang 属性值为 "en" 或第一个值为 "en"的所有元素。        |
| E[attribute^=value]  | 选取属性值以 value 开头的元素               | [title^=flower] | 选择 title 属性以单词 "flower" 开头的所有元素。            |
| E[attribute$=value]  | 选取属性值以 value 结尾的元素               | [title$=flower] | 选择 title 属性以单词 "flower" 结尾的所有元素。            |
| E[attribute*=value]  | 选取属性值包含 value 的元素                 | [title*=flower] | 选择 title 属性包含 "flower" 所有元素。                |

**伪类和伪元素选择器**：

| 选择器               | 例子                  | 例子描述                                             |
| -------------------- | --------------------- | ---------------------------------------------------- |
| :first-child         | p:first-child         | 选择属于父元素的第一个子元素的每个 `<p>` 元素。      |
| :nth-child(n)        | p:nth-child(2)        | 选择属于其父元素的第二个子元素的每个` <p>` 元素。    |
| :nth-last-child(n)   | p:nth-last-child(2)   | 同上，从最后一个子元素开始计数。                     |
| :nth-of-type(n)      | p:nth-of-type(2)      | 选择属于其父元素第二个 `<p>` 元素的每个` <p>` 元素。 |
| :nth-last-of-type(n) | p:nth-last-of-type(2) | 同上，但是从最后一个子元素开始计数。                 |
| :last-child          | p:last-child          | 选择属于其父元素最后一个子元素每个 `<p> `元素。      |

（完）