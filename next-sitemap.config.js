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
  robotsTxtOptions: {
    additionalSitemaps: [
      `${process.env.NEXT_PUBLIC_BASE_URL}/server-sitemap.xml`,
    ],
  },
  transform: async (config, path) => {
    const includePaths = [
      { rule: /^\/$/, priority: 1 },
      { rule: /^\/podcast$/, priority: 0.9 },
      ...(!!parseInt(process.env.IS_LAUNCHED || "0")
        ? [
            { rule: /^\/about$/, priority: 0.9 },
            { rule: /^\/support-us$/, priority: 0.9 },
            { rule: /^\/articles$/, priority: 0.9 },
          ]
        : [{ rule: /^\/newsletters$/, priority: 0.9 }]),
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
