module.exports = [
    {
        title: 'Elasticsearch 基础知识',
        //path: '/databases/es/mysql-windows',
        collapsable: false,
        children: [
            {
                title: 'ES 中的概念与名词',
                path: '/databases/es/concepts-and-noun',
                collapsable: true
            },
            {
                title: '正排索引与倒排索引',
                path: '/databases/es/forward-and-inverted-index',
                collapsable: true
            },
            {
                title: '文档基本操作',
                path: '/databases/es/document-crud',
                collapsable: true
            },
            {
                title: '全文搜索语法',
                path: '/databases/es/match-query',
                collapsable: true
            },
            {
                title: 'Term 查询语法',
                path: '/databases/es/term-query',
                collapsable: true
            },
            {
                title: '聚合查询',
                path: '/databases/es/aggregations',
                collapsable: true
            },
            {
                title: '组合查询语法',
                path: '/databases/es/compound-query',
                collapsable: true
            },
            {
                title: '搜索词自动补全语法',
                path: '/databases/es/suggester-query',
                collapsable: true
            },
            {
                title: '嵌套类型和父子文档',
                path: '/databases/es/nested-and-join',
                collapsable: true
            },
            {
                title: '分词器的原理和使用',
                path: '/databases/es/analyzer',
                collapsable: true
            }

        ]
    },
    {
        title: 'Elasticsearch 日常运维',
        collapsable: false,
        children: [
            {
                title: 'Windows 下安装 ES',
                path: '/databases/es/windows',
                collapsable: true
            },
            {
                title: 'Linux 下安装 ES',
                path: '/databases/es/installation-of-elasticsearch',
                collapsable: true
            },
            {
                title: '集群管理 API',
                path: '/databases/es/cluster-manage-apis',
                collapsable: true
            },
            {
                title: '索引管理 API',
                path: '/databases/es/index-manage-apis',
                collapsable: true
            },
            {
                title: '定义字段类型：Mapping',
                path: '/databases/es/mapping',
                collapsable: true
            }

        ]
    }
    ]
