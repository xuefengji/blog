# 关键字驱动设计

## 什么是关键字驱动

+ 是自动化测试的一种实现方式
+ 将 UI 自动化中常用的操作行为，封装成自定义的函数，以便于直接调用

## 结构设计

+ 逻辑代码的实现，本身不存在任何价值，需要结合业务才能体现作用
+ 只有测试代码才可以对系统的功能进行自动化测试
+ 数据与代码进行分离，但凡数据需要改动，直接修改数据文件即可，不会影响到原因代码的稳定性

## 示例

在进行 UI 自动化测试时，经常会对输入框定位，然后输入值，再点击按钮操作

一般代码：

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
from time import sleep

driver = webdriver.Chrome()
driver.get("http://www.baidu.com")
driver.find_element(By.ID,'kw').send_keys('虚竹')
driver.find_element(By.ID,'su').click()
sleep(3)
driver.quit()
```
上述代码中定位查找的操作比较多，代码比较重复

使用关键字改进上述代码

```python
# 创建浏览器对象
def open_browser(type_):
    try:
        driver = getattr(webdriver,type_)
    except:
        driver = webdriver.Chrome()
    return driver


class WebKeys:
    # 获取driver
    def __init__(self,type_):
        self.driver = open_browser(type_)

    # 打开网址
    def open(self,url):
        self.driver.get(url)

    # 查找元素
    def find(self,by,key):
        return self.driver.find_element(by, key)

    # 输入value
    def send(self,by,key,value):
        self.find(by,key).send_keys(value)

    # 退出
    def quit(self):
        self.driver.quit()

```
对比上面的代码，这种重复性的操作就可以减少代码量

（完）


 
