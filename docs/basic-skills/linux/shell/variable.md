# Shell 变量

## 变量定义

**语法：**

```bash
you_name='linux'
```

**注意：**

+ 变量名与等号之间不能有空格
+ 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
+ 中间不能有空格，可以使用下划线（_）。
+ 不能使用标点符号。
+ 不能使用bash里的关键字（可用help命令查看保留关键字

**隐式赋值：**

```bash
for file in `ls /etc`
或
for file in $(ls /etc)
```

## 变量引用

**语法**：在变量名前加 $ 符号

```bash
your_name="qinjx"
echo $your_name
echo ${your_name}
```

{}：用来识别变量边界

```bash
for file in `ls /ect` 
do
    echo "this is ${file}file"
done
```

**变量重新赋值：**

```bash
your_name="tom"
echo $your_name
your_name="alibaba"
echo $your_name
```

### 只读变量：

**修饰关键字**：readonly

**特点**：值不能被改变

```bash
#!/bin/bash
myUrl="https://www.google.com"
readonly myUrl
myUrl="https://www.runoob.com"

--------------------
结果：
/bin/sh: NAME: This variable is read only.
```

### 删除变量

**语法：**`unset variable_name`

```bash
#!/bin/sh
myUrl="https://www.runoob.com"
unset myUrl
echo $myUrl
```

**注意：**

+ 变量删除后不能被使用
+ unset 不能删除只读变量

## 变量类型

运行 shell 会存在三种变量：

+ 局部变量

  当前脚本种定义的变量，仅限于当前脚本访问

+ 环境变量

  所有的程序都能访问

+ shell 变量

  由 shell 程序设置的特殊变量

  一部分是局部变量，一部分是环境变量

