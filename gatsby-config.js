/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

// 增强环境变量加载：确保构建/开发环境都能读取 .env 文件
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`, // 区分开发/生产环境
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
    siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
  },
  // 关键：添加环境变量到客户端，让页面组件能访问 Giscus/WordPress 配置
  flags: {
    DEV_SSR: false, // 禁用开发环境服务端渲染（避免 framer-motion 提前报错）
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-react-helmet`,
    // 1. 配置本地图片目录（原有配置保留）
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // 2. 新增：加载本地 JSON 数据（用于 contact 页面兜底）
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`, // 存放 contact.json 等兜底数据
      },
    },
    // 3. 新增：解析 JSON 文件为 GraphQL 数据（关键：让页面能查询兜底数据）
    `gatsby-transformer-json`,
    // 4. 原有配置保留
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`,
      },
    },
    // 5. 可选：添加 WordPress 数据源插件（若需要拉取 WP 数据）
    process.env.GATSBY_WORDPRESS_URL && {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: process.env.GATSBY_WORDPRESS_URL,
        schema: {
          perPage: 20, // 避免数据过多导致超时
          requestConcurrency: 5,
        },
      },
    },
    // 过滤掉未配置 WP URL 时的空插件
  ].filter(Boolean),
};
