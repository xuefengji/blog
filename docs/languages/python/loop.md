# 循环

## while

 **while的else从句：** 

+  当 while 循环正常执行完毕，会执行 else 语句 

```
number = 10
i = 0
# i = 11
while i < number:
    print(i)
    i += 1
else:
    print("执行完毕！")
```

+   被 break 等机制强制提前终止的循环，不会执行 else 语句 

```
number = 10
i = 0
while i < number:
    print(i)
    i += 1
    if i == 7:
        break           
else:
    print("执行完毕！")
```

## for

 **for循环的else 子句：** 

 与 while 一样，正常结束循环时，else 子句执行。被中途 break 时，则不执行 

（完）