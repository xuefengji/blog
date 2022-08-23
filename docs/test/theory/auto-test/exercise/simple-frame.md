# Python+Excel+Json+Email 框架介绍

## 项目介绍

+ 本框架是集成 Python+Excel+Json+Email 开发的接口自动化框架

+ 适用于自动化开发新人入门

**项目地址**：

GitHub：https://github.com/xuefengji/API-Testing/tree/master/Interface


## 项目结构

目录介绍：

```python
Interface:.
├─base
├─config
├─datas
├─main
├─report
└─util
```
**base**: 二次封装了 Get 和 Post 请求

**config**：
+ data_config.py: 封装了 excel 数据
+ data_depend.py: 封装了数据依赖的处理
+ get_data.py：封装获取 excel 数据


**datas**：
+ 数据集，比如接口测试的用例和登录的信息、邮箱信息等
+ 运行程序前需要在 email_count.py 中填写邮件信息

**main**：入口函数

**report**：测试报告路径

**util**：
+ commutil: 实际结果与期望结果比较
+ operation_mysql: 操作数据库
+ operationexcle: 操作 excel 
+ operation_cookie: 操作 cookie
+ operation_json: 操作 Json 数据
+ send_mail: 发送邮件

