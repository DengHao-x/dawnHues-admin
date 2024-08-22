const createUserList = () => {
  return [
    {
      userId: 1,
      avatar: "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      username: "admin",
      password: "123456789",
      roles: ["admin"],
      buttons: ["cuser.detail"],
      routes: ["home"],
      accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
      refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
      expires: "2030/10/30 00:00:00",
    },
    {
      userId: 2,
      avatar: "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
      username: "system",
      password: "123456789",
      roles: ["system-admin"],
      buttons: ["cuser.detail", "cuser.user"],
      routes: ["home"],
      accessToken: "eyJhbGciOiJIUzUxMiJ9.system",
      refreshToken: "eyJhbGciOiJIUzUxMiJ9.systemRefresh",
      expires: "2030/10/30 00:00:00",
    },
  ];
};
export default [
  // 用户登录接口
  {
    url: "/user/login",
    method: "post",
    response: ({ body }: any) => {
      // 获取请求体携带过来的用户名与密码
      const { username, password } = body;
      // 调用获取用户信息函数，用于判断是否有此用户
      const checkUser = createUserList().find((item) => item.username === username && item.password === password);
      // 没有用户则返回失败信息
      if (!checkUser) {
        return {
          success: false,
          code: 201,
          data: {
            message: "账号或者密码不正确",
          },
        };
      }

      // 如果有返回成功信息
      return {
        code: 200,
        success: true,
        data: {
          ...checkUser,
        },
      };
    },
  },
  // 获取用户信息接口
  {
    url: "/user/info",
    method: "get",
    response: (request: any) => {
      // 获取请求头携带的 token
      const token = request.headers.accessToken;
      // 查看用户信息数据中是否包含有此 token 的用户
      const checkUser = createUserList().find((item) => item.accessToken === token);
      // 没有就返回失败信息
      if (!checkUser) {
        return {
          code: 201,
          data: {
            message: "获取用户信息失败",
          },
        };
      }
      // 有就返回成功信息
      return {
        code: 200,
        data: {
          checkUser,
        },
      };
    },
  },
];
