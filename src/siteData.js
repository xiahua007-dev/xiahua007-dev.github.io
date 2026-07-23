export const profile = {
  name: 'Xiahua',
  role: '工程实践、开源学习与长期写作',
  intro: '我会在这里整理自己的开源阅读、工程实践记录和长期写作，把项目观察、技术判断与个人思考沉淀成可以持续回看的资料。',
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
    type: '源码阅读',
    language: 'Java',
    description: '围绕消息队列、事件驱动系统和云原生架构，持续阅读 Apache RocketMQ 的工程组织与核心设计。',
    url: 'https://github.com/xiahua007-dev/rocketmq',
    status: 'Reading',
  },
  {
    name: 'devpod',
    type: '源码阅读',
    language: 'Go',
    description: '关注云端开发环境、Kubernetes、Docker 与本地开发体验的结合方式，记录工具型项目的产品和工程设计。',
    url: 'https://github.com/xiahua007-dev/devpod',
    status: 'Reading',
  },
  {
    name: 'v2rayN',
    type: '工具研究',
    language: 'C#',
    description: '从 Windows 客户端工具项目入手，观察桌面端配置管理、网络工具体验和客户端工程组织方式。',
    url: 'https://github.com/xiahua007-dev/v2rayN',
    status: 'Saved',
  },
]


export const about = {
  summary: '这个主页服务三个目标：让别人快速知道我在关注什么，持续展示项目和阅读进展，把工作中的技术判断沉淀下来。',
  principles: ['先上线，再迭代', '用真实项目说话', '把思考写成可复用的记录'],
  contact: [
    { label: 'GitHub', value: profile.handle, url: profile.github },
    { label: 'Domain', value: profile.domain, url: 'https://xiahua007.com' },
  ],
}
