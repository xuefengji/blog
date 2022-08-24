module.exports = [
  {
    title: '安全基础',
	// path: '/test/theory/safety-test/',
    collapsable: false,
    children: [
        {
            title: '了解 CSRF',
            path: '/test/theory/safety-test/csrf.md',
            collapsable: true
        },
        {
            title: 'SQL 注入初识',
            path: '/test/theory/safety-test/sql-injection-principle.md',
            collapsable: true
        },

    ]
  },
  {
	 title: '安全实践',
	// path: '/test/theory/safety-test/',
    collapsable: false,
    children: [
        {
            title: '常见安全测试点',
            path: '/test/theory/safety-test/common-test-points.md',
            collapsable: true
        },

    ]  
  }
]
