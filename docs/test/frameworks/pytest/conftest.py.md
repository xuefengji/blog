# conftest.py

## 什么是 conftest.py

+ 本质上就是一个 Python 文件
+ 可以理解为一个配置文件

## conftest.py 的作用

+ 存放共享的 fixture
+ 可以写自己的本地插件

## conftest.py 作用范围

+ 根据 conftest.py 文件的存放位置来决定作用范围
+ 不同的目录下的 conftest.py，作用范围只在该层级以及以下目录生效

## 配置 fixture 示例

::: warning 注意事项
+ pytest 会默认读取 conftest.py 里面的所有 fixture
+ conftest.py 文件名称是固定的，不能改动
+ 不同目录可以有自己的 conftest.py，一个项目中可以有多个 conftest.py
+ 测试用例文件中不需要手动 `import conftest.py`，pytest 会自动查找
:::

#### 项目工程结构

```
web_conf是工程名称
├─douban
│  │  conftest.py
│  │  test_douban.py
│  │  __init__.py
|
├─jd
│  │  test_jd.py
│        
├─taobao
│  │  conftest.py
│  │  test_taobao.py
│  │  __init__.py
│   
|  main.py
│  conftest.py
│  __init__.py
|  test_001.py
```

##### web_conf 下

###### conftest.py 代码

设置全局的 fixture
```python
import pytest
@pytest.fixture(scope="session")
def start():
    print("\n获取driver，全局获取一次")
    driver = "Chrom"
    yield driver
    print("\n释放driver，全局释放一次")

@pytest.fixture(autouse=True)
def get_driver(start):
    print("\n每个用例都要获取driver")
    return start
```
###### main.py 代码

运行所有用例
```python
import pytest

if __name__ == '__main__':
    pytest.main(["-s"])
```

###### test_001.py 代码

根目录下的测试用例
```python
def test_001(start):
    print(f"\n测试用例1获取driver:{start}")
```

##### web_conf/douban 下

###### conftest.py 代码

设置 douban 包下的 fixture
```python
import pytest
@pytest.fixture(scope="module")
def open_douban(start):
    print("\n打开douban页面")
    return start

@pytest.fixture
def login(open_douban):
    print("\n登录成功")
    token = "douban"
    yield token
    print("\n退出登录")
```

###### test_douban.py 代码

douban 包下的测试用例
```python
def test_002(login):
    print(f"\n{login} 操作douban111")

def test_003(login):
    print(f"\n{login} 操作douban222")
```
##### web_conf/jd 下

目录下没有 `__init__.py` 文件

###### test_jdn.py 代码

jd 包下的测试用例
```python
def test_005(start):
    print(f"\n{start} 操作jd1234")
```
##### web_conf/taobao 下

###### conftest.py 代码

设置 taobao 包下的 fixture
```python
import pytest
@pytest.fixture(scope="module")
def open_taobao(start):
    print("\n打开taobao页面")
    return start

@pytest.fixture
def login(open_taobao):
    print("\n登录成功")
    token = "taobao"
    yield token
    print("\n退出登录")
```
###### test_taobao.py 代码

taobao 包下的测试用例
```python
def test_004(login):
    print(f"\n{login} 操作taobao111")

def test_005(login):
    print(f"\n{login} 操作taobao222")
```

##### 测试结果

```python
test_001.py 
获取driver，全局获取一次
每个用例都要获取driver
测试用例1获取driver:Chrom
.
douban\test_douban.py 
打开douban页面
每个用例都要获取driver
登录成功
douban 操作douban111
退出登录
每个用例都要获取driver
登录成功
douban 操作douban222
退出登录

jd\test_jd.py 
每个用例都要获取driver
Chrom 操作jd1234
.
taobao\test_taobao.py 
打开taobao页面
每个用例都要获取driver
登录成功
taobao 操作taobao111
退出登录
每个用例都要获取driver
登录成功
taobao 操作taobao222
退出登录

释放driver，全局释放一次
```

conftest.py 写入本地自定义插件后续更新........