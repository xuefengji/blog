# fiddler 
## 原理

一般数据请求和响应的流程：

![baserequest](./images/baserequest.png)

开启 fiddler 的数据请求和响应流程：

![requets](./images/fiddlerrequest.png)

对于 HTTPS 的数据请求和响应：

![requets](./images/https9.png)

对比上面的流程，可以看出：

+ fiddler 相当于是个代理，将客户端的请求转发给服务器，将服务器返回的数据转发给客户端
+ 开启 fiddler 相当于将 fiddler 设置为系统的代理

## 基本界面介绍：

![baseUi](./images/Uibase.png)