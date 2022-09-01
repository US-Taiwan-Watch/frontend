/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  autoLastmod: false,
  changefreq: undefined,
  alternateRefs: [
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/en`,
      hreflang: 'en',
    },
    {
      href: `${process.env.NEXT_PUBLIC_BASE_URL}/zh`,
      hreflang: 'zh',
    },
  ],
  additionalPaths: async config => {
    const paths = ['/podcast'];
    return Promise.all(paths.map(path => config.transform(config, path)));
  },
  transform: async (config, path) => {
    const includePaths = [
      {rule: /^\/$/, priority: 1},
      {rule: /^\/newsletters$/, priority: 0.9},
      {rule: /^\/podcast$/, priority: 0.9},
      // {rule: /^\/podcast(\/.*)?$/}, what's wrong?
    ];
    const pathWithPrio = includePaths.find(iPath => iPath.rule.test(path));
    if (!pathWithPrio) {
      return null;
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: pathWithPrio.priority || config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs,
    }
  },
}
