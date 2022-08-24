# XSS

## 什么是 XSS

+ 全称跨站脚本(Cross Site Scripting)，为避免与层叠样式表(Cascading Style Sheets, CSS)的缩写混淆，故缩写为 XSS
+ 一种将任意 Javascript 代码插入到其他 Web 用户页面里执行以达到攻击目的的漏洞
+ 攻击者利用浏览器的动态展示数据功能，在 HTML 页面里嵌入恶意代码
+ 用户浏览该页时，潜入在 HTML 中的恶意代码会被执行，用户浏览器被攻击者控制，从而达到攻击者的特殊目的，如 cookie 窃取等

## XSS 基本攻击手段

XSS 根据效果不同主要分为三种类型：

- 反射型 XSS
- 存储型 XSS
- DOM 型 XSS

### 反射型 XSS 及绕过手段

#### 什么是反射型 XSS

+ 反射型 XSS，也叫非持久型 XSS
+ 利用比较简单，比如在搜索框中输入一段 JavaScript 代码，点击搜索按钮后，会执行该代码 