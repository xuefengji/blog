# YAML

## 什么是 YAML

+ 是一种标记语言
+ 配置文件后缀未 `.yml`
+ 使用空白符号缩进

## 基本语法

+ 大小写敏感
+ 使用缩进表示层级关系
+ 缩进不允许使用 tab，只允许空格
+ 缩进的空格数不重要，只要相同层级的元素左对齐即可
+ '#'表示注释

## 支持的数据结构

+ 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
+ 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
+ 纯量（scalars）：单个的、不可再分的值

### YAML 对象

格式：
+ 对象键值对使用冒号结构表示 key: value，冒号后面要加一个空格
+ 也可以使用 key:{key1: value1, key2: value2, ...}
+ 还可以使用缩进表示层级关系

```yaml
# 使用 key: value 形式
name: admin
age: 18
sex: male

# 使用 key:{key1: value1, key2: value2, ...} 形式
data: {name: admin, age: 19, sex: male}

# 使用缩进层级关系
dict1:
  name: admin
  age: 18
  sex: female
dict2:
  name: admin1
  age: 13
  sex: male
```

输出 Python 结果：

```python
{'name': 'admin', 'age': 18, 'sex': 'male'}

{'data': {'name': 'admin', 'age': 19, 'sex': 'male'}}

{'dict1': {'name': 'admin', 'age': 18, 'sex': 'female'}, 'dict2': {'name': 'admin1', 'age': 13, 'sex': 'male'}}
```

### YAML 数组

格式： 以 `-` 开头的行表示构成一个数组

```yaml
- a
- b
- c
-
 - A
 - B
 - C
```
输出 Python 结果：

```python
['a', 'b', 'c', ['A', 'B', 'C']]
```

### 纯量

包含：
+ 字符串
+ 布尔值
+ 整数
+ 浮点数
+ Null
+ 时间
+ 日期

```yaml
boolean: 
    - TRUE  #true,True都可以
    - FALSE  #false，False都可以
float:
    - 3.14
    - 6.8523015e+5  #可以使用科学计数法
int:
    - 123
    - 0b1010_0111_0100_1010_1110    #二进制表示
null:
    nodeName: 'node'
    parent: ~  #使用~表示null
string:
    - 哈哈
    - 'Hello world'  #可以使用双引号或者单引号包裹特殊字符
    - newline
      newline2    #字符串可以拆成多行，每一行会被转化成一个空格
date:
    - 2018-02-17    #日期必须使用ISO 8601格式，即yyyy-MM-dd
datetime: 
    -  2018-02-17T15:02:31+08:00    #时间使用ISO 8601格式，时间和日期之间使用T连接，最后使用+代表时区
```

### 引用

锚点 & 和别名 * ，可以用来引用

```yaml
defaults: &defaults
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  <<: *defaults

test:
  database: myapp_test
  <<: *defaults
```
等同于
```yaml
defaults:
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  adapter:  postgres
  host:     localhost

test:
  database: myapp_test
  adapter:  postgres
  host:     localhost
```
& 用来建立锚点（defaults），<< 表示合并到当前数据，* 用来引用锚点


## 参考资料
[YAML 语言教程](https://www.ruanyifeng.com/blog/2016/07/yaml.html)

（完）