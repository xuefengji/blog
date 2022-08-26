# copy 与 deepcopy

## 可变对象

主要是 list 和 dict

直接上例子
```python
import copy

a = {'key':[1,2,3]}
b = copy.copy(a)
c = copy.deepcopy(a)

print(a,b,c)
print(id(a),id(b),id(c))
print(a['key'],b['key'],c['key'])
print(id(a['key']),id(b['key']),id(c['key']))
```
结果：
```python
{'key': [1, 2, 3]} {'key': [1, 2, 3]} {'key': [1, 2, 3]}
2021806902080 2021806902336 2021806902464
[1, 2, 3] [1, 2, 3] [1, 2, 3]
2021810163264 2021810163264 2021810160768
```
::: danger 由上面的结果可以看出：
+ copy 可变对象时，子元素的地址没变，引用之前的子元素的地址
+ deepcopy 子元素的地址也被拷贝
:::

## 不可变对象

主要是针对元组、字符串、数字，只要创建就不能改的元素

### 对于纯不可变对象

上代码
```python
a = ('a','b','c')
b = copy.copy(a)
c = copy.deepcopy(a)
if b == c:    
	print("b和c的值相等")
if id(b) == id(c):    
	print("b和c的地址相等")
```
结果：
```python
b和c的值相等
b和c的地址相等
```
::: danger 由上面的结果可以看出：
copy 和 deepcopy 的值一致，存储的地址空间也一致
:::

### 当不可变元素中含有可变元素时，如元组含有可变元素

```python
a = (1,2,[2,3,4])
b = copy.copy(a)
c = copy.deepcopy(a)
print(a,b,c)
print(id(a),id(b),id(c))
print(id(a[2]),id(b[2]),id(c[2]))
```
结果：
```python
(1, 2, [2, 3, 4]) (1, 2, [2, 3, 4]) (1, 2, [2, 3, 4])
1541483727872 1541483727872 1541484299072
1541485940288 1541485940288 1541485937536
```
::: danger 由上面的结果可以看出：
对于不可变对象中含有可变对象时，浅拷贝的父元素和子元素地址没改变，而深拷贝的会将父元素和子元素都复制一份，地址都会改变
:::

（完）