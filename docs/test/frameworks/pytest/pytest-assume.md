# pytest-assume

## 什么是 pytest-assume

+ 一个可以允许 pytest 测试用例中执行多个失败的断言的插件
+ 即使上面的断言1，断言2，断言3 都失败的情况下，其下的断言都能被执行
+ 源于 `pytest-expect` 插件并进行了改进
    + 支持 showlocals（即 Pytest 命令行的 `-l` 参数, 显示执行过程中的局部变量）
    + 可以全局使用，无需指定 fixtrue 装饰器（即任意 `test_xxx` 函数中都能用）
    + 对断言输出做了一些格式上的美化

## 为什么要使用 pytest-assume

+ 使用原生 python 的 assert，就会遇到一个断言失败则全部失败的情况，比如说，断言1 结果为 Failed，那么其下的断言2 和断言3 都不会被执行
+ 如果希望其下的断言1 和断言2 继续执行，就可能获取更多的断言结果更好的定位问题

## pytest-assume 安装

```python
pip install git+https://github.com/astraw38/pytest-assume.git
或者
pip install pytest-assume
```

## pytest-assume 使用

### 简单例子
```python
# Python 的 assert 断言
def test_add1():
    assert 1 + 4 == 5
    assert 1 + 3 == 3
    assert 2 + 5 == 7
    assert 2 + 5 == 9
    print("执行完成")

# Pytest 的 assume 断言
import pytest
def test_add2():
    pytest.assume(1 + 4 == 5)
    pytest.assume(1 + 3 == 3)
    pytest.assume(2 + 5 == 7)
    pytest.assume(2 + 5 == 9)
    print("测试完成")
```

执行结果：
::: details 点击查看结果
```python
test_assume.py::test_add1 FAILED
test_assume.py:1 (test_add1)
4 != 3

Expected :3
Actual   :4
<Click to see difference>

def test_add1():
        assert 1 + 4 == 5
>       assert 1 + 3 == 3
E       assert 4 == 3

test_assume.py:4: AssertionError

test_assume.py::test_add2 测试完成
FAILED
test_assume.py:10 (test_add2)
tp = <class 'pytest_assume.plugin.FailedAssumption'>, value = None, tb = None

    def reraise(tp, value, tb=None):
        try:
            if value is None:
                value = tp()
            if value.__traceback__ is not tb:
>               raise value.with_traceback(tb)
E               pytest_assume.plugin.FailedAssumption: 
E               2 Failed Assumptions:
E               
E               test_assume.py:13: AssumptionFailure
E               >>	pytest.assume(1 + 3 == 3)
E               AssertionError: assert False
E               
E               test_assume.py:15: AssumptionFailure
E               >>	pytest.assume(2 + 5 == 9)
E               AssertionError: assert False

E:\venv-path\pytest-path\lib\site-packages\six.py:718: FailedAssumption


================================== FAILURES ===================================
__________________________________ test_add1 __________________________________

    def test_add1():
        assert 1 + 4 == 5
>       assert 1 + 3 == 3
E       assert 4 == 3

test_assume.py:4: AssertionError
__________________________________ test_add2 __________________________________

tp = <class 'pytest_assume.plugin.FailedAssumption'>, value = None, tb = None

    def reraise(tp, value, tb=None):
        try:
            if value is None:
                value = tp()
            if value.__traceback__ is not tb:
>               raise value.with_traceback(tb)
E               pytest_assume.plugin.FailedAssumption: 
E               2 Failed Assumptions:
E               
E               test_assume.py:13: AssumptionFailure
E               >>	pytest.assume(1 + 3 == 3)
E               AssertionError: assert False
E               
E               test_assume.py:15: AssumptionFailure
E               >>	pytest.assume(2 + 5 == 9)
E               AssertionError: assert False

E:\venv-path\pytest-path\lib\site-packages\six.py:718: FailedAssumption
=========================== short test summary info ===========================
FAILED test_assume.py::test_add1 - assert 4 == 3
FAILED test_assume.py::test_add2 - pytest_assume.plugin.FailedAssumption: 

```
:::

可以看出：
+ test_add1 断言失败后正确的断言没有执行
+ test_add2 断言失败后正确的断言继续执行

### pytest-assume 上下文管理器 with

```python
import pytest
from pytest import assume

@pytest.mark.parametrize(('x', 'y'), [(1, 1), (1, 0), (0, 1)])
def test_simple_assume1(x, y):
    with assume: assert x == y
    with assume: assert True
    with assume: assert False

@pytest.mark.parametrize(('x', 'y'), [(1, 1), (1, 0), (0, 1)])
def test_simple_assume2(x, y):
    with pytest.assume:
        assert x == y
        assert True
        assert False
```
::: tip 注意
如果上下文管理器里面包含多个断言，如果第一个断言失败，后面的不会被执行
:::

## 参考文档

[官方文档-pytest-assuem](https://github.com/astraw38/pytest-assume)

（完）