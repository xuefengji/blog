# allure 命令行参数

可以在 cmd 中输入

```python
allure --help
```

## allure 语法格式

```python
allure [options] [command] [command options]
```

### options 

```python
  Options:   
        --help           命令行帮助文档   
        -q, --quiet      切换至安静模式，默认: false    
        -v, --verbose    切换至冗长模式，默认: false    
        --version        版本信息，默认: false
```

### command 

+ generate
+ serve
+ open
+ plugin

介绍前三个常用的

#### generate 命令行参数

生成 allure 的html 报告

##### 语法格式

```
generate [options]  allure 结果目录
```
**注**：allure 结果目录就是运行 pytest 命令，`--alluredir` 跟的那个目录

```
pytest -sq --alluredir= ./allure
```

##### 命令选项

| 选项                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| -c,--clean               | 删除 allure 报告生成的目录，就是 -o 后面的目录               |
| --config                 | allure 命令行配置路径，如果指定会覆盖 `--profile` 和 `--configDirectory` |
| --configDirectory        | allure 命令行配置目录                                        |
| --profile                | allure 命令行配置文件                                        |
| -o,--report-dir,--output | 生成 allure 报告的目录<br />执行命令当前目录下的 `allure-report`，默认<br />没有目录则自动生成 |

主要就是用 -c 、 -o 两个参数

#### open 命令行参数

打开生成的 allure 报告，就是打开 generate 命令生成的报告

##### 语法格式

```
open [options] allure报告目录
```

**注**：allure 报告目录就是运行 allure generate 命令，-o 跟的那个目录

```
allure generate -o ./allure-report
```
##### 命令选项

| 选项      | 描述                                |
| --------- | ----------------------------------- |
| -h,--host | 该 host 将用于启动报告的 Web 服务器 |
| -p,--port | 该 port 将用于启动报告的 Web 服务器 |

#### serve 命令行参数

启动 allure 服务，打开 allure 报告

##### 语法格式

```
serve [options] allure 结果目录
```

**注**：allure 结果目录就是运行 pytest 命令中 `--alluredir` 后面跟的那个目录

```
pytest -sq --alluredir= ./allure
```

##### 命令选项

| 选项              | 描述                                                         |
| ----------------- | ------------------------------------------------------------ |
| --config          | allure 命令行配置路径，如果指定会覆盖 `--profile` 和 `--configDirectory` |
| --configDirectory | allure 命令行配置目录                                        |
| --profile         | allure 命令行配置文件                                        |
| -h,--host         | 该 host 将用于启动报告的 Web 服务器                          |
| -p,--port         | 该 port 将用于启动报告的 Web 服务器                          |

## 浏览器打开 allure 报告的两种方式

### allure serve

标准写法

```python
# 执行 pytest，指定 allure 结果目录 
pytest -sq --alluredir=./allure
# 打开 allure 报告 
allure serve ./allure
```
### allure generate + allure open

标准写法:

```python
# 执行 pytest，指定 allure 结果目录 
pytest -sq --alluredir=./allure 
# 生成 allure 的 html 报告 
allure generate -c -o ./allure-report ./allure 
# 打开 allure 报告 
allure open ./allure-report
```
当然不写 -o 也可以

#### allure-report 的目录结构

![pytest](images/40.png)

- 这种方式的目录会好看很多，不只是一堆 json 文件
- 而且直接打开 index.html 也是能看到 allure 报告的

（完）