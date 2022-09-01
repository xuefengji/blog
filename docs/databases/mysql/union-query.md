# 组合查询语法

将多条查询语句产生的结果集合并起来的查询方式称为**合并查询**，或者**组合查询**

## 涉及单表的组合查询

使用 `UNION` 连接多个查询语句，要求：

* 各查询语句的查询列表处，表达式数量相同
* 各查询语句的查询列表中，位置相同的表达式的类型应该是相同的（建议，非强制，因为 MySQL 将会自动的进行类型转换）
* 组合查询的结果集中显示的列名将以第一个查询中的列名为准

例如：

```sql
SELECT m1, n1 FROM t1 WHERE m1 < 2 UNION SELECT n1, m1 FROM t1 WHERE m1 > 2;
```

* 第一个语句的查询列表是 `m1`，`n1`，第二个查询语句的查询列表是 `n1`，`m1`
* 第一个查询的查询列表处的 `m1` 和第二个查询的查询列表的 `n1` 对应；第一个查询的查询列表处的 `n1` 和第二个查询的查询列表的 `m1` 对应
* 最终的结果集中，显示的列名将以第一个查询中的列名为准，即第一个查询中的 `m1`，`n1` 作为结果集的列名

## 涉及不同表的组合查询

如果只在同一个表中进行组合查询，貌似体现不出组合查询的强大（完全可以用 `OR` 操作符把两个查询语句中的搜索条件连起来），很多情况下组合查询还是用在涉及不同表的查询语句中的

### 包含或去除重复的行

使用 `UNION` 来合并多个查询的记录会默认过滤掉重复的记录

如果想要保留重复记录，可以使用 `UNION ALL` 来连接多个查询：

```sql
SELECT m1, n1 FROM t1 UNION ALL SELECT m2, n2 FROM t2;
```

### 组合查询中的 ORDER BY 和 LIMIT 子句

组合查询会把各个查询的结果汇总到一块，如果我们想对最终的结果集进行排序或者只保留几行的话，可以在组合查询的语句末尾加上 `ORDER BY` 和 `LIMIT` 子句，就像这样：

```sql
(SELECT m1, n1 FROM t1) UNION (SELECT m2, n2 FROM t2) ORDER BY m1 DESC LIMIT 2;
```

::: tip 小贴士
一般会为各个小的查询语句加上括号 `()` 让整体的语句更清晰
:::

由于最后的结果集展示的列名是第一个查询中给定的列名，所以 `ORDER BY` 子句中指定的排序列也必须是第一个查询中给定的列名（别名也可以）

::: tip 小贴士
为各个小查询加入 `ORDER BY` 子句是不起作用的，因为组合查询并不保证最后汇总起来的大结果集中的顺序是按照各个小查询的结果集中的顺序排序的
:::

（完）