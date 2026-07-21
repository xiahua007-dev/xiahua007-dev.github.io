export const profile = {
  name: 'Xiahua',
  role: '工程实践、开源学习与长期写作',
  intro: '我会在这里整理自己的开源项目、工程实践记录和工作思考。先把主页搭成一个可持续更新的入口，后面内容会逐步替换成更完整的项目复盘与文章。',
  github: 'https://github.com/xiahua007-dev',
  avatar: 'https://avatars.githubusercontent.com/u/17287324?v=4',
  handle: '@xiahua007-dev',
  domain: 'xiahua007.com',
}

export const focusAreas = ['开源项目', '工程实践', '工作思考']

export const projects = [
  {
    name: 'xiahua007-dev.github.io',
    type: '个人主页',
    language: 'React / Vite / CSS',
    description: '当前这个站点本身。用于沉淀个人介绍、项目入口和长期写作内容。',
    url: 'https://github.com/xiahua007-dev/xiahua007-dev.github.io',
    status: 'Active',
  },
  {
    name: 'rocketmq',
    type: '开源关注',
    language: 'Java',
    description: 'Apache RocketMQ 是云原生消息与流处理平台，适合事件驱动系统学习和工程实践参考。',
    url: 'https://github.com/xiahua007-dev/rocketmq',
    status: 'Reading',
  },
  {
    name: 'devpod',
    type: '开源关注',
    language: 'Go',
    description: '一个开源开发环境工具，关注云端开发、Kubernetes、Docker 与本地开发体验的结合。',
    url: 'https://github.com/xiahua007-dev/devpod',
    status: 'Reading',
  },
  {
    name: 'v2rayN',
    type: '工具关注',
    language: 'C#',
    description: 'Windows 客户端工具项目，适合观察桌面端配置、网络工具和客户端工程组织方式。',
    url: 'https://github.com/xiahua007-dev/v2rayN',
    status: 'Saved',
  },
]


export const about = {
  summary: '这个主页会优先服务三个目标：让别人快速知道我在关注什么、让我能持续展示项目进展、把工作中的技术判断沉淀下来。',
  principles: ['先上线，再迭代', '用真实项目说话', '把思考写成可复用的记录'],
  contact: [
    { label: 'GitHub', value: profile.handle, url: profile.github },
    { label: 'Domain', value: profile.domain, url: 'https://xiahua007.com' },
  ],
}
