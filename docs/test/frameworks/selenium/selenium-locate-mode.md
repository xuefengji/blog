# selenium 定位方式

以百度搜索框为例：

![id](../../theory/auto-test/images/id.jpg)

常见定位方式有以下几种：

+ **根据 id 进行定位**

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrom()
driver.get("https://www.baidu.com")
#通过元素的 id 进行定位元素
driver.find_element(By.ID, 'kw').send_keys("test")
```

+ **通过 name 定位**

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrom()
driver.get("https://www.baidu.com")
#通过元素的 name 进行定位元素
driver.find_element(By.NAME, 'wd').send_keys("test")
```

+ **通过 class_name 定位**

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrom()
driver.get("https://www.baidu.com")
#通过元素的 class_name 进行定位元素
driver.find_element(By.CLASS_NAME, 's_ipt').send_keys("test")
```

+ **通过 tag（标签属性）定位**

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrom()
driver.get("https://www.baidu.com")
#通过元素的 tag 进行定位元素
driver.find_element(By.TAG_NAME, 'input').send_keys("test")
```

+ **通过 link_text（链接文本）定位**

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrom()
driver.get("https://www.baidu.com")
#通过元素的 link_text 进行定位元素
driver.find_element(By.LINK_TEXT, '百度首页').send_keys("test")
```

+ **通过 partial_link_text（链接文本）定位**

与上面的 `link_text` 类似，会模糊匹配 `link_ text` 中的文字

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrom()
driver.get("https://www.baidu.com")
#通过元素的 partial_link_text 进行定位元素
driver.find_element(By.PARTIAL_LINK_TEXT, '首页').send_keys("test")
```

+ **通过 xpath 定位**

利用浏览器调试功能，定位到元素所在的那一行右键-->Copy-->Copy XPath 

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
driver = webdriver.Chrom()
driver.get("https://www.baidu.com")
#通过元素的 xpath 进行定位元素
driver.find_element(By.XPATH, "//*[@id="kw"]").send_keys("test")
```

对于 xpath 的理解，可以查看相对应的 [xpath语法](/test/frameworks/selenium/xpath语法) 和 [selenium中xpath定位方式](/test/frameworks/selenium/selenium中xpath定位方式)

+ **通过  CSS selector 定位**

想理解 CSS 选择器的定位方式，需要先了解下 CSS 语法

```python
from selenium import webdriver
driver = webdriver.Chrom()
driver.get("https://www.baidu.com")
#通过元素的 CSS selector 进行定位元素
driver.find_element(By.CSS_SELECTOR, '#kw').send_keys("test")
```

CSS 选择器的语法有很多，可以参考 [CSS选择定位](/test/frameworks/selenium/css-selector)

（完）





