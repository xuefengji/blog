# redis.conf 详解

了解配置文件，能更好的对 Redis 进行配置

## 容量单位

不区分大小写

```shell
# 1k => 1000 bytes
# 1kb => 1024 bytes
# 1m => 1000000 bytes
# 1mb => 1024*1024 bytes
# 1g => 1000000000 bytes
# 1gb => 1024*1024*1024 bytes
#
# units are case insensitive so 1GB 1Gb 1gB are all the same.
```

## include

可以使用 include 组合多个配置

```shell
# include /path/to/local.conf
# include /path/to/other.conf
# include /path/to/fragments/*.conf
```

## network 网络配置

```shell
# 绑定 ip
bind 127.0.0.1 -::1
# 保护模式
protected-mode yes
# 端口，配置集群时可以在此设置端口号
port 6379
```

## general 通用配置

```shell
# 以守护进程的方式运行，默认是 no
daemonize yes 
# 如果以后台的方式运行，我们就需要指定一个 pid 文件
pidfile /var/run/redis_6379.pid   
# 日志
# 日志级别
# Specify the server verbosity level.
# This can be one of:
# debug (a lot of information, useful for development/testing)
# verbose (many rarely useful info, but not a mess like the debug level)
# notice (moderately verbose, what you want in production probably)  生产环境
# warning (only very important / critical messages are logged)
loglevel notice 
# 日志文件位置
logfile ""
# 数据库的容量，默认是 16 个
databases 16
# 是否总是显示 logo
always-show-logo yes
```

## SNAPSHOTTING 持久化

+ 在规定的时间内，执行了多少次操作，则会持久化到文件 .rdb.aof
+ Redis 是内存数据库，如果没有持久化，那么数据断电及失
+ 持久化方式：RDB、AOF

RDB（默认不开启）:
```shell
# 如果 3600s 内至少一个 key 进行了修改，就就行持久化，如果 300s 内有至少 10 个 key 进行了修改，就进行持久化......
# save 3600 1 300 100 60 10000

#持久化如果出错，是否还需要继续工作！
stop-writes-on-bgsave-error yes

#是否压缩rdb文件，需要消耗一些cpu资源！
rdbcompression yes

#保存rdb文件的时候，进行错误的检查校验！
rdbchecksum yes

# rdb 的文件名
dbfilename dump.rdb

#rdb 文件保存的目录！
dir ./
```

## REPLICATION 主从复制

后面在主从复制时详解

```shell
################################# REPLICATION #################################

# Master-Replica replication. Use replicaof to make a Redis instance a copy of
# another Redis server. A few things to understand ASAP about Redis replication.
```

## Security 中进行密码设置

配置文件中设置
```shell
# 设置密码，默认密码没有开启
# requirepass foobared
```
命令行设置密码
```shell
127.0.0.1:6379>ping
PONG
127.0.0.1:6379>config get requirepass          #获取 redis的密码
1) "requirepass"
2) ""
127.0.0.1:6379>config set requirepass "123456"             #设置redis的密码
OK
127.0.0.1:6379>config get requirepass           #发现所有的命令都没有权限了
(error)NOAUTH Authentication required.
127.0.0.1:6379>ping
(error)NOAUTH Authentication required.
127.0.0.1:6379>auth 123456                     #使用密码进行登录！
OK
127.0.0.1:6379>config get requirepass
1)"requirepass"
2)"123456"
```

## CLIENTS 客户端限制

```shell
maxclients 10000              # 设置能连接上 Redis 的最大客户端的数量
maxmemory  <bytes>            # Redis 配置最大的内存容量
maxmemory-policy noeviction   # 内存到达上限之后的处理策略
```
maxmemory-policy 六种方式:
+ 1、volatile-lru：只对设置了过期时间的 key 进行 LRU（默认值） 
+ 2、allkeys-lru：删除 lru 算法的 key 
+ 3、volatile-random：随机删除即将过期 key 
+ 4、allkeys-random：随机删除 
+ 5、volatile-ttl：删除即将过期的 
+ 6、noeviction：永不过期，返回错误

设置方式：
```shell
config set maxmemory-policy volatile-lru
```

## APPEND ONLY MODE 

```shell
appendonly no                #默认是不开启 aof模式的，默认是使用 rdb 方式持久化的，在大部分所有的情况下，rdb 完全够用！
appendfilename "appendonly.aof"    #持久化的文件的名字
# appendfsync always               #每次修改都会 sync，消耗性能
appendfsync everysec               #每秒执行一次 sync，可能会丢失这 1s 的数据！
# appendfsync no                   #不执行 sync，这个时候操作系统自己同步数据，速度最快！
```
具体的配置，在持久化中详解

（完）