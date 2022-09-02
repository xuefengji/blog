# pip 安装和应用

## pip 安装

+ easy_install 安装

  进入 easy_install 脚本的目录下，运行 easy_install pip

+ get-pip.py 安装

  + 下载：curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py 
  + 运行 python get_pip.py 
  +  同时安装 setuptools 和 wheel 工具 

+ Linux 下安装

  +  ubuntu：sudo apt-get install python-pip 
  +  sudo yum install python-pip 

+ Windows 下安装

  python 目录下 scripts 下运行  easy_install pip 

## pip 更新

+ Linux 或 mac：

   pip install -U pip 

+ windows：

   python -m pip install -U pip 

## pip 应用

+ 安装库为最新版本

  ```python
  pip install pillow
  ```

+ 安装指定版本

  使用 ==, >=, <=, >, < 指定一个版本号 

  ```python
  pip install  Markdown<2.0 
  ```

+ 卸载已安装的库

  ```python
  pip uninstall pillow
  ```

+ 将已安装的库保存到文件中

  ```python
  pip freeze > requirements.txt
  ```

+ 根据 requirements 进行安装

  ```python
  pip install -r requirements.txt
  ```

+ 列出已安装的库

  ```python
  pip list
  ```

（完）