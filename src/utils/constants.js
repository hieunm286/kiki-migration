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
    transferProfilesUrl: function () {
      return `${this.baseUrl}/start-migrate`;
    },
    getTransferProfilesProgressUrl: function () {
      return `/status`;
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
    transferProfilesUrl: function () {
      return `${this.baseUrl}/start-migrate`;
    },
    getTransferProfilesProgressUrl: function () {
      return `/status`;
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
    transferProfilesUrl: function () {
      return `${this.baseUrl}/start-migrate`;
    },
    getTransferProfilesProgressUrl: function () {
      return `/status`;
    },
  },
];
