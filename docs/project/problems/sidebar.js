module.exports = [
  {
    title: '问题记录',
    collapsable: false,
    children: [
      {
        title: 'Python 相关',
        // path: '/project/problems/python',
        collapsable: false,
        children: [
          {
            title: 'logging 日志重复输出',
            path: '/project/problems/python/logging-repeat-output',
          }
        ]
      },
      {
        title: 'Jmeter 相关',
        // path: '/project/problems/python',
        collapsable: false,
        children: [
          {
            title: 'JMeter 返回数据乱码问题',
            path: '/project/problems/Jmeter/jmeter-messy-code',
          }
        ]
      },
      {
        title: 'Docker 相关',
        // path: '/project/problems/python',
        collapsable: false,
        children: [
          {
            title: '解决 Jenkins 执行找不到 Pytest 命令',
            path: '/project/problems/docker/jenkins-notfound-pytest',
          }
        ]
      }
    ]
  }
]
