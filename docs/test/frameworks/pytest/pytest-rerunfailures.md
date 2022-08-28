# pytest-rerunfailures

用于对失败用例进行重跑的插件

## 环境要求

+ Python 3.5, 最高 3.8, or PyPy3
+ pytest 5.0 或更高版本

## 安装

```python
pip install pytest-rerunfailures
```
## pytest-rerunfailures 使用

有两种方式：
+ 命令行模式
+ 装饰器模式

### 命令行模式

#### 运行所有失败用例

使用 `--reruns` 需要指定最大运行次数
```python
pytest --reruns 5 -s
```
::: tip 注意
运行失败的 fixture 或 `setup_class` 也会重新执行
:::

要在两次之间增加延迟时间，使用 `--reruns-delay` 其中包含了希望在下一次测试重新开始之前等待的时间
```python
pytest --reruns 5 --reruns-delay 2 -s
```
### 装饰器模式

#### 重新运行指定的测试用例

要将单个测试用例添加 flaky 装饰器 `@pytest.mark.flaky(reruns=5)`，并在测试失败时自动重新运行，需要指定最大重新运行的次数
```python
import pytest
@pytest.mark.flaky(reruns=5)
def test_example():
    import random
    assert random.choice([True, False, False])
```
也可以指定重新运行的等待时间
```python
import pytest
@pytest.mark.flaky(reruns=5, reruns_delay=2)
def test_example():
    import random
    assert random.choice([True, False, False])
```
::: tip 注意
如果使用装饰器形式指定了用例的重新运行次数，则在命令行添加 `--reruns` 对这些用例是不会生效的
:::

## 兼容性问题

+ 不可以与 fixture 装饰器一起使用：` @pytest.fixture()`
+ 该插件与 pytest-xdist 的 `--looponfail` 标志不兼容
+ 该插件在使用`--pdb`调试时候会有不兼容性

## 参考资料

[官方文档:pytest-rerunfailures](https://github.com/pytest-dev/pytest-rerunfailures)

（完）