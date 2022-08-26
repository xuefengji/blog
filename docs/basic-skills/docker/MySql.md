# MySql 数据持久化

思考：MySql 的数据持久化的问题

## 安装 MySql

### 搜索镜像

```shell script
docker search mysql
```
### pull 镜像

```shell script
docker pull mysql # 拉取最新的镜像

docker pull mysql:5.7 # 拉取指定版本的镜像
```
### 运行 MySql 容器

::: danger 注意
创建 MySql 时，必须要设置密码
:::

在 docker hub 上找到 MySql 查看使用方式
```
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
```

运行容器，并挂载目录

```shell script
docker run -d -p 80:3306 -v /home/mysql/conf:/etc/mysql/conf.d -v /home/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 --name mysql01 mysql
```

-e：是指定环境变量，所以 MYSQL_ROOT_PASSWORD 是一个环境变量

+ 上面的例子讲了 MYSQL_ROOT_PASSWORD 是环境变量
+ docker run mysql 时，可以通过在 docker run 命令行中传入一个或多个环境变量来调整 MySQL 实例的配置

#### 更多环境变量

##### MYSQL_ROOT_PASSWORD

必需的，它指定将为 MySQL root 超级用户帐户设置的密码 

##### MYSQL_DATABASE

+ 可选的，允许指定要在 docker run mysql 时创建的数据库的名称
+ 如果提供了用户/密码，则该用户将被授予对该数据库的超级用户访问权限（对应于 GRANT ALL）

##### MYSQL_USER, MYSQL_PASSWORD

+ 可选的，结合使用来创建新用户和密码
+ 该用户将被授予对 MYSQL_DATABASE 变量指定的数据库的超级用户权限
+ 创建用户需要这两个变量

##### MYSQL_ALLOW_EMPTY_PASSWORD

这是一个可选变量，设置为非空值，如 yes，允许使用 root 用户的空白密码启动容器

###### MYSQL_RANDOM_ROOT_PASSWORD

+ 可选的，设置为非空值，如 yes，为 root 用户生成随机初始密码
+ 生成的 root 密码将打印到 stdout

###### MYSQL_ONETIME_PASSWORD

+ 初始化完成后，将 root（不是 MYSQL_USER 中指定的用户！）用户设置为过期，强制在首次登录时更改密码
+ 任何非空值都将激活此设置

##### MYSQL_INITDB_SKIP_TZINFO

+ 默认情况下，入口点脚本会自动加载 CONVERT_TZ() 函数所需的时区数据
+ 如果不需要，任何非空值都会禁用时区加载


## 参考资料

[官方镜像文档](https://hub.docker.com/_/mysql?tab=description)

[镜像版本](https://hub.docker.com/_/mysql?tab=tags)

（完）