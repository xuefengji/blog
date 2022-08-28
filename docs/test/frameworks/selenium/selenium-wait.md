# Selenium 等待方式

**无法定位元素问题原因**：

+ 页面中有 frame
+ 元素未加载渲染

**解决方式**：增加等待时间

**等待的作用**：

+ 为了提升自动化运行的成功率
+ 在指定的地方，进行等待，以便于系统响应，在继续进行


## 常见等待方式：

### 强制等待

使用 sleep() 的方式，不论元素是否加载完成，在程序执行到时，必须等待

```python
from selenium import webdriver
from time import sleep

driver = webdriver.Firefox()
driver.get('https://snowji.github.io')

sleep(3)  # 强制等待3秒再执行下一步

print driver.current_url
driver.quit()

```

**优点**：
+ 简单入门
+ 可以用于调试

**缺点**：
+ 只能对单次生效
+ 无法做有效的判断
+ 浪费大量的时间
+ 影响执行速度

### 隐式等待

使用 `implicitly_wait(xx)` 

**定义**：在规定的时间内网页加载完成，则执行下一步，否则要等待设置的最长时间，才会执行下一步

**作用**：对 WebDriver 对象设置全局等待，每一次操作，如遇到页面加载，则默认进入隐式等待

```python
from selenium import webdriver

driver = webdriver.Firefox()
driver.implicitly_wait(30)  # 隐性等待，最长等30秒
driver.get('https://snowji.github.io')

print driver.current_url
driver.quit()
```

**优点**：

+ 隐性等待对整个 driver 周期都起作用，只需设置一次即可
+ 如未找到元素，则进入隐式等待，当达到等待最大时长，则继续进行后续的代码，不会报错

**缺点**：一直等待整个页面全部加载完成或等待超时，包括 js 、css 代码，才会执行下一步

### 显式等待

**作用**：专门等待指定的元素

**使用方法**：`WebDriverWait(driver, timeout, poll_frequency, ignored_exceptions).until(要执行的方法, 超时时返回的错误信息)` 

**优点**： 等待判断准确，不会浪费多余的等待时间，在用例中使用，可以提高执行效率 

**缺点**： 

+ 使用相对比较复杂 
+ 必须声明，只对单次生效

```python
from selenium import webdriver
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

driver = webdriver.Firefox()
driver.implicitly_wait(10)  # 隐性等待和显性等待可以同时用，但要注意：等待的最长时间取两者之中的大者
driver.get('https://snowji.github.io')
locator = (By.LINK_TEXT, 'CSDN')

try:
    WebDriverWait(driver, 20, 0.5).until(EC.presence_of_element_located(locator))
    print driver.find_element_by_link_text('CSDN').get_attribute('href')
finally:
    driver.close()
```

**注意**：

+ 在  WebDriverWait..中显性等待起主要作用，其他操作中，隐性等待起决定性作用
+ 同时存在隐性和显性时，等待时间取两者之间的大者

#### WebDriverWait 类

引用：

```python
selenium.webdriver.support.wait.WebDriverWait
```

相关参数（从左至右依次）：

driver：webdriver 的实例

timeout：等待超时时间

`poll_frequency`：调用 until 或 `until_not` 中的方法的间隔时间，默认是 0.5 秒

`ignored_exceptions`：忽略的异常， 如果在调用 until 或 `until_not` 的过程中抛出这个元组中的异常，则不中断代码，继续等待，如果抛出的是这个元组外的异常，则中断代码，抛出异常，默认只有 NoSuchElementException 

相关方法：
+ until()

直到条件成立返回真，等待结束

超时，抛出 TimeoutExceion 异常，可自定义设置 message 信息
```python
WebDriverWait(driver, 20, 0.5).until(EC.presence_of_element_located(locator),message='元素未找到')
 ```

+ `until_not()`

  直到条件不成立返回真，等待结束

  超时，抛出 TimeoutExceion 异常

+ `expected_conditions` 异常处理模块

  **验证元素是否出现**：

  传入的参数都是元组类型 locator

  + `presence_of_element_located`
  + `presence_of_all_elements_located`

  **验证元素是否可见**：

  + `visibility_of_element_located`：传入元组
  + `invisibility_of_element_located`：传入元组
  + `visibility_of`：传入 webelement

  **验证文本是否出现在元素**：

  + `text_to_be_present_in_element`：判断元素的 text
  + `text_to_be_present_in_element_value`：判断元素的 value

  **验证是否可切入frame**：

   `frame_to_be_available_and_switch_to_it` ：可传入元组或直接定位的方式

  **验证元素是否可点击**：

   `element_to_be_clickable` ：传入 locator

  **验证元素是否被选中**：

  + `element_to_be_selected`：传入webelement 对象

  + `element_located_to_be_selected`：传入 locator 元组

  + `element_selection_state_to_be`：传入 webelement 对象以及状态，相等返回 true

  + `element_located_selection_state_to_be`：传入 locator 以及状态，相等返回 true

  **判断元素是否仍在 DOM 中**：

  `staleness_of` ：传入 webelement 对象，可以判断是否刷新

  **常见 WebElement 方法**：

  + `is_displayed()` ：判断元素是否展示出来
  + `is_enabled()`：判断元素是否可操作
  + `is_selected()`：判断元素是否被选中
	

::: danger 总结
当多个等待一同被调用时，系统的等待时间取决于最长的等待时间
:::

（完）