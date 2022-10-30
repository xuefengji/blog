# 跨域

## 什么是跨域问题

前端调用的后端接口不属于同一个域（域名或端口不同），就会产生跨域问题，也就是说你的应用访问了该应用域名或端口之外的域名或端口 

![ky](images/ky.png)

### 为什么会出现跨域

受浏览器的**同源策略**的限制

## 同源策略

### 为什么要有同源策略

同源策略是页面中的一种安全策略

**举个没有安全策略的例子**：

比如你打开一个银行站点，又不小心打开了一个恶意站点，在没有任何安全措施的情况下，恶意站点可以做很多事情：

+ 修改银行站点的 DOM、CSSOM 等信息
+ 在银行站点内部插入 JavaScript 脚本
+ 劫持用户登录的用户名和密码
+ 读取银行站点的 Cookie、IndexDB 等数据
+ 甚至还可以将这些信息上传至自己的服务器，这样就可以在你不知情的情况下伪造一些转账请求等信息 

**总结**：同源策略会隔离不同源的 DOM、页面数据和网络通信，进而实现 Web 页面的安全性

### 什么是同源

如果两个 URL 的协议、域名和端口都相同，这两个 URL 就是同源，如：

| 当前页面 URL              | 被请求页面 URL                  | 是否同源 | 原因                     |
| ------------------------- | ------------------------------- | -------- | ------------------------ |
| http://www.test.com/      | http://www.test.com/index.html  | 是       | 协议、域名、端口号相同   |
| http://www.test.com/      | https://www.test.com/index.html | 否       | 协议不同（http/https）   |
| http://www.test.com/      | http://www.baidu.com/           | 否       | 主域名不同（test/baidu） |
| http://www.test.com/      | http://blog.test.com/           | 否       | 子域名不同（www/blog）   |
| http://www.test.com:8080/ | http://www.test.com:7001/       | 否       | 端口号不同（8080/7001）  |

### 同源策略

定义：

+ 浏览器默认两个相同的源之间是可以相互访问资源和操作 DOM 的
+ 两个不同的源之间若想要相互访问资源或者操作 DOM，有一套基础的安全策略的制约，称为同源策略 

####  同源策略主要表现在 DOM、Web 数据和网络这三个层面 

##### DOM 层面

同源策略限制了来自不同源的 JavaScript 脚本对当前 DOM 对象读和写的操作 

例子：

打开某网的官网，并打开一个专栏：

![dom1](images/dom1.png)

由于页面是同源关系，可以在第二个页面操作第一个页面的 DOM ：

![dom2](images/dom2.png)

如果打开的第二个页面和第一个页面不是同源关系，那就无法操作：

![dom3](images/dom3.png)

##### 数据层面

+ 源策略限制了不同源的站点读取当前站点的 Cookie、IndexDB、LocalStorage 等数据
+ 由于同源策略，无法通过第二个页面的 opener 来访问第一个页面中的 Cookie、IndexDB 或者 LocalStorage 等内容

##### 网络层面

同源策略限制了通过 XMLHttpRequest 等方式将站点的数据发送给不同源的站点

## 跨域问题解决方案

### 设置 document.domain 解决无法读取非同源网页的 Cookie 问题

+ 浏览器是通过 document.domain 属性来检查两个页面是否同源，只要通过设置相同的 document.domain，两个页面就可以共享 Cookie 
+ 此方案仅限主域相同，子域不同的跨域应用场景 

### 跨文档通信 API：window.postMessage()

+ 页面和其打开的新窗口的数据传递
+ 多窗口之间消息传递
+ 页面与嵌套的iframe消息传递
+ 上面三个场景的跨域数据传递

### JSONP

是服务器与客户端跨源通信的常用方法 

优点：简单适用，兼容性好（兼容低版本 IE） 

缺点：是只支持 Get 请求，不支持 Post 请求 

核心思想：网页通过添加一个`元素`，向服务器请求 JSON 数据，服务器收到请求后，将数据放在一个指定名字的回调函数的参数位置传回来 

### CORS

是跨域资源分享（Cross-Origin Resource Sharing）的缩写

+ 普通跨域请求：只需服务器端设置 Access-Control-Allow-Origin
+ 带 Cookie 跨域请求：前后端都需要进行设置
+ webpack 本地代理

在 `webpack.config.js` 中利用 WebpackDevServer 配置本地代理 

![web](images/webpack.png)

### Websocket

+ WebSocket 和 HTTP 都是应用层协议，都基于 TCP 协议
+ WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的服务器与客户端都能主动向对方发送或接收数据
+ WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了

### Nginx反向代理 

使用 Nginx 反向代理实现跨域，是最简单的跨域方式 

配置 Nginx，在一个服务器上配置多个前缀来转发 http/https 请求到多个真实的服务器 

（完）
  






