# 规范

## 命名规范

+ 变量命名

  第一个字符必须是字母或 _ 开头

  **变量名可以为中文：**

  ```
  >>> 什么 = "apple"
  >>> print(什么)
  apple
  ```

  **特殊性:**

  + 以 _（单下划线）开头

    表示禁止外部访问的类成员，需要通过类提供接口访问

     不能用 from xxx import * 导入 

  + 以 __（双下划线）开头

     代表类的私有成员 

  + 以 __（双下划线）开头和结尾

     是 python 里特殊方法专用的标识 

  + 区分大小写

+ 函数命名

  小写加上下划线： total_number 

+ 类名

  使用大驼峰： ThreadMixIn 

+ 模块和包

  使用小写

## 注释

+ 单行注释

  开头使用 #

+ 多行注释

  没有真正意义上的只是在每行开头写上 #

+ 注释文档

  ```
   """
      这个是函数的说明文档。
      :param a: 加数
      :param b: 加数
      :return: 和
   """
  ```

（完）