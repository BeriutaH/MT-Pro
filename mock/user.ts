import { MockMethod } from 'vite-plugin-mock';

// 模拟的用户数据
const users = [
    {
      userId: 1,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'admin',
      password: 'admin123',
      desc: '系统超级管理员',
      roles: ['系统超级管理员'],
      buttons: ['admin.detail', 'admin.manage'],
      routes: ['home', 'dashboard'],
      token: 'Admin Token'
    },
    {
      userId: 2,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'system',
      password: '111111',
      desc: '系统管理员',
      roles: ['系统管理员'],
      buttons: ['cuser.detail', 'cuser.user'],
      routes: ['home'],
      token: 'System Token'
    },
    {
      userId: 3,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'user1',
      password: 'user123',
      desc: '普通用户',
      roles: ['用户'],
      buttons: ['user.view'],
      routes: ['home', 'profile'],
      token: 'User1 Token'
    },
    {
      userId: 4,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'guest',
      password: 'guest123',
      desc: '访客',
      roles: ['访客'],
      buttons: [],
      routes: ['home'],
      token: 'Guest Token'
    },
    {
      userId: 5,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      username: 'operator',
      password: 'operator123',
      desc: '系统操作员',
      roles: ['操作员'],
      buttons: ['operator.run', 'operator.stop'],
      routes: ['home', 'operations'],
      token: 'Operator Token'
    }
];

export default [
  // 登录接口
  {
    url: '/api/login',
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body;
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
        return {
          code: 200,
          message: '登录成功',
          data: {
            userId: user.userId,
            username: user.username,
            desc: user.desc,
            token: user.token,
          },
        };
      } else {
        return {
          code: 401,
          message: '用户名或密码错误',
        };
      }
    },
  },

  // 获取用户信息接口
  {
    url: '/api/users',
    method: 'get',
    response: (request: any) => {
      // 从请求头中获取 token
      const token = request.headers['Authorization'] || request.headers['authorization'];

      // 检查 token 是否存在
      if (!token) {
        return {
          code: 401,
          message: '未提供Token',
          data: ''
        };
      }

      // 验证 token 是否有效
      const user = users.find((u) => u.token === token);

      if (user) {
        return {
          code: 200,
          message: '获取用户信息成功',
          data: user,
        };
      } else {
        return {
          code: 403,
          message: 'Token无效',
          data: ''
        };
      }
    },
  },
] as MockMethod[];
