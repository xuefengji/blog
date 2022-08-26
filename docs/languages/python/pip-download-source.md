# 更改默认 pip 下载源

## 问题描述

一般在命令行中安装 Python 工具包时，大多是从国外源进行下载，导致速度很慢

## 解决方案

::: tip 常用 pip 源
豆瓣(douban) http://pypi.douban.com/simple/
阿里云 http://mirrors.aliyun.com/pypi/simple/
中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/
清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/
中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

安装命令：pip install -i https://pypi.douban.com/simple 模块名
::: 

### pip 下载时设置下载源

比如下载：pytest，设置阿里云的下载源

```
pip install -i http://mirrors.aliyun.com/pypi/simple/ selenium
```

### 设置默认安装源

#### windows

##### 方式一：

使用命令行，输入：

```
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

 运行后可以在 C:\Users\电脑用户\AppData\Roaming\pip 文件夹中自动生成 pip.ini 文件

![pip](./images/pip1.png)

##### 方式二：

+ 进入 C:\Users\电脑用户\AppData\Roaming
+ 新建 pip 文件夹并在文件夹中新建 pip.ini 配置文件
+ 新增 pip.ini 配置文件内容

```
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
use-mirrors = true
mirrors = http:https://pypi.tuna.tsinghua.edu.cn/simple
trusted-host = pypi.tuna.tsinghua.edu.cn
```

#### Linux 

+ 在用户根目录下 ~ 下创建 .pip 隐藏文件夹，如果已经有了可以跳过 

  ```
  mkdir ~/.pip
  ```

+ 进入 .pip 隐藏文件夹并创建 pip.conf 配置文件

  ```
  cd ~/.pip && touch pip.conf 
  ```

+ 启动 Finder 按 `cmd+shift+g` 进入，输入 `~/.pip`  回车进入

+ 新增 `pip.conf` 配置文件内容

  ```
  [global]
  index-url = https://pypi.tuna.tsinghua.edu.cn/simple
  [install]
  use-mirrors = true
  mirrors = http:https://pypi.tuna.tsinghua.edu.cn/simple
  trusted-host = pypi.tuna.tsinghua.edu.cn
  ```


（完）