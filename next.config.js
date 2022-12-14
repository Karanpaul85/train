const withPWA = require('next-pwa')({
  dest: 'public',
});
module.exports = withPWA({
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  env: {
    apiUrl: 'https://irctc1.p.rapidapi.com/api/v1/liveTrainStatus',
    apiKey: '85768926f4msh834848b433540d7p1ec315jsnbc178347bb2a',
    apiHost: 'irctc1.p.rapidapi.com',
  },
});
