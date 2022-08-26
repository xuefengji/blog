# 索引

## 什么是索引

**官方定义**：一种帮助 MySql 提高查询速率的数据结构

索引：
+ 一种数据结构
+ 帮助 MySql 高效获取数据的数据结构
+ 存储在文件系统中
+ 索引的文件存储形式与存储引擎有关
+ 索引文件的结构
  + hash
  + 二叉树
  + B 树
  + B+ 树

**索引的优点**：
+ 大大加快查询速度

**索引的缺点**：
+ 维护索引需要耗费数据库资源
+ 索引需要占用磁盘空间
+ 当对表的数据进行增删改的时候，因为要维护索引，速度会受到影响

## 索引的分类

**InnoDB**：

+ 主键索引(primary key)
    + 唯一的标识，主键不可重复，只能有一个列作为主键
    + 主键索引在主键被创建的时候自动创建，InnoDB 为聚簇索引
    + 索引列的值不能为空
+ 唯一索引(unique key)
    + 避免重复的列出现，唯一索引可以重复，多个列都可以标识唯一索引
    + 唯一索引列值可以为 null，但是只能存在一个 null
+ 单值(普通)索引(key/index)
    只包含单个列，一个表中可以有多个单列索引
+ 复合索引
  一个索引包含多个列  

**MyISAM**：
+ 全文索引(fulltext)
    + MySQL 5.7 版本之前只用于 MyISAM
    + 在特定的数据库引擎下才有，MyISAM
    + 快速定位数据

## 索引的使用

### 索引的创建

#### 创建表时创建

**语法**：
```
   create table tbl_name(字段名称 字段类型[完整性约束条件]，

    ....,

    [unique|fulltext|spatial] index|key [索引名称] (字段名称 [( 长度)] [asc|desc])

    )
```
**示例**：
+ 创建主键索引
```
create table t_user(id varchar(20) primary key, name varchar(20))
```
+ 创建单值索引
```
create table t_user(id varchar(20) primary key, name varchar(20),key(name))
```
+ 创建唯一索引
```
create table t_user(id varchar(20) primary key, name varchar(20),age int, unique key(name))
```
+ 创建唯一索引
```
create table t_user(id varchar(20) primary key, name varchar(20),age int, unique key(name))
```
+ 创建复合索引
```
create table t_user(id varchar(20) primary key, name varchar(20),age int, key(name，age))
```

#### 在已存在的表上创建索引
**语法**：
```
  create [unique|fulltext|spatial] index 索引名称 on 表名(字段名[(长度)] [asc|desc])
  
  alter table tbl_name add [unique|fulltext|spatial] index 索引名称(字段名称[(长度)] [asc|desc])

```
**示例**：
```
create index name on t_user1(name)
```
::: danger 重点
复合索引：
+ 最左前缀原则
+ MySQL 引擎在查询为了更好利用索引，在查询过程中会动态调整查询字段顺序以便利用索引

比如：给一个表添加了复合索引，添加顺序为：name age bir
基于 name ：可以使用索引
基于 name age：可以使用索引
基于 name age bir：可以使用索引
基于 name bir age：可以使用索引
基于 bir age name：可以使用索引

**总结**：必须要包含最左边的 name 才可以使用索引
:::

### 查询索引

```
show index from tbl_name
```
全文索引查询：select * from tbl_name where match(要查询的列名) against（'查询匹配的字符'）

### 删除索引

```
  drop index 索引名称 on tbl_name

  alter table tbl_name drop index 索引名称
```


## 参考文档

[MySql 索引](https://www.bilibili.com/video/BV19y4y127h4?p=1)

（完）