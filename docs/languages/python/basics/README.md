# Python 简介

## 简介

Python 是一种计算机设计语言，常被称作解释性语言，与 Javascript 一样是一门动态的语言，语法上没有像其他语言严谨，如：Java 、C 语言等。相比之下，语法更简单，更容易入门。

## 解释器

+ CPython

  从官方下载的 Python 安装文件后安装成功后，就会得到一个 CPython 解释器，因此解释器使用 C 语言编写的，因此叫 CPython，是一种常用的 Python 解释器。

+ IPython

  是基于 CPython 之上的一个交互式解释器，只是在交互方式上有所增强，但是执行代码的能力和 CPython 是一样的。

+ PyPy

  是另一种解释器，执行速度快。采用 JIT 技术，对代码进行动态编译，可以显著提高执行速度

+ JPython

  是运行在 Java 平台上的 Python 解释器，可以直接把 Python 代码编译成 Java 代码

## 环境搭建

目前 Python 2 从 2020.01.01 日起，将不支持更新，本博客基于 Python3 。

+  从  https://www.python.org/getit/  网站上，根据情况下载相应的安装包
+  安装后，需要将安装目录下的 python.exe 所在目录路径添加至环境变量中
+  完成后，在 cmd 或 shell 中输入 `python -V` 查看是否安装成功