# venv 

## 什么是 venv

+ Python 的虚拟环境
+ 相当于是一个独立的容器，可以在该容器中安装需要的依赖包
+ 不同的虚拟环境相互隔离

## 为什么要用 venv

+ 在开发 Python 应用程序的时候，系统安装的 Python3 只有一个，所有第三方的包都会被`pip`安装到 Python3 的`site-packages`目录下
+ 如果我们同时开发多个应用程序，那这些应用程序都会共用一个Python，就是安装在系统的Python 3，如果应用 A 需要 jinja 2.7，而应用 B 需要 jinja 2.6 怎么办
+ 这种情况下，每个应用可能需要各自拥有一套“独立”的 Python 运行环境

## 如何创建虚拟环境

Python 3.3 以后，自带的库

### Windows 下 venv 的使用：

**在指定文件夹新建环境**

```
python -m venv [环境名称]
```

**激活环境**
进入创建的环境下的 Script 目录，执行下面的命令
```
activate
或
activate.bat
```
**退出环境**
进入创建的环境下的 Script 目录，执行下面的命令
```python
deactivate.bat
```

（完）
