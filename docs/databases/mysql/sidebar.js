module.exports = [
  {
    title: 'MySQL 基础知识',
    collapsable: true,
    children: [
      {
        title: 'MySQL 数据类型',
        path: '/databases/mysql/data-types'
      },
      {
        title: 'MySQL 常用命令',
        path: '/databases/mysql/common-commands'
      },
      {
        title: '库和表的基本操作',
        path: '/databases/mysql/database-and-table-operations'
      },
      {
        title: '表中列的基本属性',
        path: '/databases/mysql/column-properties'
      },
      {
        title: '数据的增删改',
        path: '/databases/mysql/data-insert-delete-update'
      },
      {
        title: '简单查询语法',
        path: '/databases/mysql/simple-query'
      },
      {
        title: '条件查询语法',
        path: '/databases/mysql/query-by-search-conditions'
      },
      {
        title: '表达式和函数',
        path: '/databases/mysql/expressions-and-functions'
      },
      {
        title: '分组查询语法',
        path: '/databases/mysql/group-query'
      },
      {
        title: '子查询语法',
        path: '/databases/mysql/sub-query'
      },
      {
        title: '连接查询语法',
        path: '/databases/mysql/join-query'
      },
      {
        title: '组合查询语法',
        path: '/databases/mysql/union-query'
      },
      {
        title: 'MySql 索引初识',
        path: '/databases/mysql/mysql-index',
        collapsable: true
      },
	  {
        title: 'MySql 索引结构',
        path: '/databases/mysql/index-principle',
        collapsable: true
	  },
      {
        title: 'MySql 聚簇索引与非聚簇索引',
        path: '/databases/mysql/clustered-non-clustered',
        collapsable: true
      },
      {
        title: 'MySql 事务',
        path: '/databases/mysql/affairs',
        collapsable: true
      },
      {
        title: 'MySql 锁',
        path: '/databases/mysql/lock',
        collapsable: true
      },
    ]
  },
  {
    title: 'MySQL 日常运维',
    collapsable: true,
    children: [
      {
        title: 'MySQL 的安装与卸载',
        path: '/databases/mysql/installation-of-mysql'
      },
      {
        title: 'MySQL 主键和自增 ID',
        path: '/databases/mysql/primary-key-and-increment-id'
      },
      {
        title: 'MySQL 数据库设计规范',
        path: '/databases/mysql/db-design-spec'
      }
    ]
  }
]
