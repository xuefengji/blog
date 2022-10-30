# 配置文件

## jmeter.properties
官方配置文档：https://jmeter.apache.org/usermanual/properties_reference.html

所在目录：JMeter 安装目录下的bin目录

**是 JMeter 核心配置项文件**

**注意**：

将需要修改的属性值，复制粘贴到同目录下的 user.properties 

**好处：**当 JMeter 升级时，可以避免修改项需要重新应用

## 常用的配置

### 语言设置

- `language=en`：默认英文
- `language=zh_CN`：可进行修改

**注意：**这个只有在 jmeter.properties 文件中声明才会生效，官方也提醒了

### 编码格式设置

- `sampleresult.default.encoding=ISO-8859-1`：默认 ISO-8859-1
- `sampleresult.default.encoding=UTF-8`：可以改成常用的 UTF-8

### 输出测试报告模板格式 

`jmeter.save.saveservice.output_format=csv`

### 捕捉cookie

Cookies应该存储为变量

`CookieManager.save.cookies=false`：默认

`CookieManager.save.cookies=true`：将 cookie 存储为变量

### 快捷方式（ctrl+数字0-9）

- `gui.quick_0=ThreadGroupGui`
- `gui.quick_1=HttpTestSampleGui`
- `gui.quick_2=RegexExtractorGui`
- `gui.quick_3=AssertionGui`
- `gui.quick_4=ConstantTimerGui`
- `gui.quick_5=TestActionGui`
- `gui.quick_6=JSR223PostProcessor`
- `gui.quick_7=JSR223PreProcessor`
- `gui.quick_8=DebugSampler`
- `gui.quick_9=ViewResultsFullVisualizer`

 

### POST 请求头参数 Content-Type

在 5.0 版本之后默认是 false，若不修改则请求中不会添加

post_add_content_type_if_missing=false：默认

post_add_content_type_if_missing=true：添加 Content-Type: application/x-www-form-urlencoded



### 配置远程主机 host 

`remote_hosts=127.0.0.1`



（完）