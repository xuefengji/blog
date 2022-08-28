# AttributeError: partially initialized module 'selenium.webdriver' has no attribute 'Chrome'

## 问题描述

正常写的 UI 自动化代码：
```python
driver = webdriver.Chrome('D:/GreenSoftware/chromedriver.exe')
driver.get("http://www.baidu.com")
```
执行后，报错：
```python
AttributeError: partially initialized module 'selenium.webdriver' has no attribute 'Chrome'
```
## 解决方法

将上述代码文件修改了下名字，重新运行时，成功

（完）

