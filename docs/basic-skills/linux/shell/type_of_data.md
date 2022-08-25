# 数据类型

## Shell 字符串

### 单引号

```bash
str='this is a string'
```

**限制：**

+  单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的 

  ```bash
  greeting_3='hello, ${your_name} !'
  echo $greeting_3
  -----------------------
  结果：
  hello, runoob ! hello, ${your_name} !
  ```

+  单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用 

### 双引号

```bash
your_name='runoob'
str="Hello, I know you are \"$your_name\"! \n"
echo -e $str

-------------
结果：
Hello, I know you are "runoob"! 
```

**优点：**

+ 双引号里可以有变量
+ 双引号里可以出现转义字符

### 拼接字符串

```bash
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1
# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3
```

结果：

```bash
hello, runoob ! hello, runoob !
hello, runoob ! hello, ${your_name} !
```

### 字符串常见操作

**获取字符串长度：**

```bash
string="abcd"
echo ${#string} 
#输出 4
```

**提取子字符串：**

 从字符串第 **2** 个字符开始截取 **4** 个字符 :

```bash
string="runoob is a great site"
echo ${string:1:4}
# 输出 unoo
```

**查找子字符串：**

 查找字符 **i** 或 **o** 的位置(哪个字母先出现就计算哪个) ：

```bash
string="runoob is a great site"
echo `expr index "$string" io` 
# 输出 4
```

**注意**：位置是从 1 开始

## Shell 数组

**特点：**

+ 支持一维数组，不限定数组大小
+ 数组下标从 0 开始

**语法：**

数组用 () 表示，元素用空格分开

```bash
数组名=(值1 值2 ... 值n)
```

### 数组操作：

**获取数组元素：**

**语法：**

+ 获取单独元素

```bash
${数组名[下标]}
```

```bash
valuen=${array_name[n]}
```

+ 获取所有元素

```bash
${array_name[@]} || ${array_name[*]}
```

```bash
echo ${array_name[@]}
```

**获取数组长度：**

```bash
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}
```

## 注释

**单行注释：**

以 # 开头

**多行注释：**

+ 每行以 # 开头

+ ```bash
  :<<EOF
  注释内容...
  注释内容...
  注释内容...
  EOF
  ```

+ ```bash
  :<<'
  注释内容...
  注释内容...
  注释内容...
  '
  或
  :<<!
  注释内容...
  注释内容...
  注释内容...
  !
  ```

