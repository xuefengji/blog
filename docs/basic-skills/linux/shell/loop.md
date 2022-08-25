# 循环控制

## for 循环

**语法格式：**

```bash
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done
```

例：

```bash
for loop in 1 2 3 4 5
do
    echo "The value is: $loop"
done

--------------------------
结果：
The value is: 1
The value is: 2
The value is: 3
The value is: 4
The value is: 5
```

```bash
#!/bin/bash

for str in This is a string
do
    echo $str
done

-----------------------------
结果：
This
is
a
string
```

## while 循环

**语法格式：**

```
while condition
do
    command
done
```

例：

```bash
#!/bin/bash
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done

-------------------------------------
结果：
1
2
3
4
5
```

**注意：**

上述例子中使用了 Bash let 命令，在变量计算中不需要加上 $ 进行引用

**无限循环：**

```bash
while :
do
    command
done
或
while true
do
    command
done
或
for (( ; ; ))
```

## until 循环

 until 循环执行一系列命令直至条件为 true 时停止 

 一般 while 循环优于 until 循环，在某些情况下，until 循环更加有用 

**语法格式：**

```bash
until condition
do
    command
done
```

例：

```bash
#!/bin/bash

a=0

until [ ! $a -lt 10 ]
do
   echo $a
   a=`expr $a + 1`
done


----------------------------------
结果：
0
1
2
3
4
5
6
7
8
9
```

## case ... esac 

**特点：**

+ 多选择分支语句
+  取值后面必须为单词 **in**，每一模式必须以右括号结束 

**语法格式：**

```bash
case 值 in
模式1)
    command1
    command2
    ...
    commandN
    ;;
模式2）
    command1
    command2
    ...
    commandN
    ;;
esac
```

例：

```bash
#!/bin/sh

site="runoob"

case "$site" in
   "runoob") echo "菜鸟教程"
   ;;
   "google") echo "Google 搜索"
   ;;
   "taobao") echo "淘宝网"
   ;;
esac
```

## break

 break 命令允许跳出所有循环 

例：

```bash
#!/bin/bash
while :
do
    echo -n "输入 1 到 5 之间的数字:"
    read aNum
    case $aNum in
        1|2|3|4|5) echo "你输入的数字为 $aNum!"
        ;;
        *) echo "你输入的数字不是 1 到 5 之间的! 游戏结束"
            break
        ;;
    esac
done


---------------------------------------------
结果：
输入 1 到 5 之间的数字:3
你输入的数字为 3!
输入 1 到 5 之间的数字:7
你输入的数字不是 1 到 5 之间的! 游戏结束
```

## continue

 跳出所有循环，仅仅跳出当前循环 

例：

```bash
#!/bin/bash
while :
do
    echo -n "输入 1 到 5 之间的数字: "
    read aNum
    case $aNum in
        1|2|3|4|5) echo "你输入的数字为 $aNum!"
        ;;
        *) echo "你输入的数字不是 1 到 5 之间的!"
            continue
            echo "游戏结束"
        ;;
    esac
done
```

