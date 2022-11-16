module.exports = [
    {
        title: 'Redis 基础',
        //path: '/databases/redis/mysql-windows',
        collapsable: false,
        children: [
            {
                title: '了解 NoSQL',
                path: '/databases/redis/nosql',
                collapsable: true
            },
             {
                title: '初识 Redis',
                path: '/databases/redis/redis-basic',
                collapsable: true
            },
			 {
                title: '安装 Redis',
                path: '/databases/redis/redis-install',
                collapsable: true
            },
          {
            title: 'redis.conf 配置文件详解',
            path: '/databases/redis/config',
            collapsable: true
          },
             {
                title: 'Redis 基本命令',
                path: '/databases/redis/basic-commands',
                collapsable: true
            },
            {
                title: 'Redis 类型之 String',
                path: '/databases/redis/string',
                collapsable: true
            },
            {
                title: 'Redis 类型之 List',
                path: '/databases/redis/list',
                collapsable: true
            },
            {
                title: 'Redis 类型之 Set',
                path: '/databases/redis/set',
                collapsable: true
            },
             {
                title: 'Redis 类型之 Hash',
                path: '/databases/redis/Hash',
                collapsable: true
            },
            {
                title: 'Redis 类型之 Zset',
                path: '/databases/redis/zset',
                collapsable: true
            },
            {
                title: 'Redis 地理位置 Geospatial',
                path: '/databases/redis/geospatial',
                collapsable: true
            },
             {
                title: 'Redis 基数统计 Hyperloglog',
                path: '/databases/redis/hyperloglog',
                collapsable: true
            },
            {
                title: 'Redis 位图 BitMap',
                path: '/databases/redis/BitMaps',
                collapsable: true
            },
             {
                title: 'Redis 事务',
                path: '/databases/redis/affairs',
                collapsable: true
            },
            {
                title: 'Redis 使用 watch 实现乐观锁',
                path: '/databases/redis/watch',
                collapsable: true
            },

            {
                title: 'Redis 持久化之 RDB',
                path: '/databases/redis/rdb',
                collapsable: true
            },
            {
                title: 'Redis 持久化之 AOF',
                path: '/databases/redis/aof',
                collapsable: true
            },
            {
                title: 'Redis 发布订阅',
                path: '/databases/redis/subscribe',
                collapsable: true
            },
            {
                title: 'Redis 主从复制',
                path: '/databases/redis/master-slave',
                collapsable: true
            },
            {
                title: 'Redis 哨兵模式',
                path: '/databases/redis/sentinel',
                collapsable: true
            },
             {
                title: 'Redis 缓存三大问题',
                path: '/databases/redis/cache',
                collapsable: true
            },
            {
              title: 'Redis 的 ACL 安全策略',
              path: '/databases/redis/access-control-list'
            },
            {
              title: 'Redis 与 MySQL 数据同步机制',
              path: '/databases/redis/redis-mysql-data-consistency'
            },
        ]
    },
]
