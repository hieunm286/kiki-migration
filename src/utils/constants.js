export const PLATFORMS = [
  {
    name: 'Dolphin',
    baseUrl: '/dolphin',
    loginUrl: function () {
      return `${this.baseUrl}/login`;
    },
    getAllProfileUrl: function () {
      return `${this.baseUrl}/get-all-profiles`;
    },
  },
  {
    name: 'GoLogin',
    baseUrl: '/gologin',
    loginUrl: function () {
      return `${this.baseUrl}/login`;
    },
    getAllProfileUrl: function () {
      return `${this.baseUrl}/get-all-profiles`;
    },
  },
  {
    name: 'Ads power',
    baseUrl: '/adspower',
    loginUrl: function () {
      return `${this.baseUrl}/login`;
    },
    getAllProfileUrl: function () {
      return `${this.baseUrl}/get-all-profiles`;
    },
  },
];
