export const PLATFORMS = [
  {
    name: 'dolphin',
    baseUrl: '/gologin',
    loginUrl: function () {
      return `${this.baseUrl}/login`;
    },
    getAllProfileUrl: function () {
      return `${this.baseUrl}/get-all-profiles`;
    },
  },
  {
    name: 'go login',
    baseUrl: '/gologin',
    loginUrl: function () {
      return `${this.baseUrl}/login`;
    },
    getAllProfileUrl: function () {
      return `${this.baseUrl}/get-all-profiles`;
    },
  },
  // {
  //   name: 'ads power',
  //   baseUrl: '/gologin',
  //   loginUrl: function () {
  //     return `${this.baseUrl}/login`;
  //   },
  //   getAllProfileUrl: function () {
  //     return `${this.baseUrl}/get-all-profiles`;
  //   },
  // },
];
