import {blogPlugin} from '@vuepress/plugin-blog'
import {defineUserConfig} from 'vuepress'
import {viteBundler} from '@vuepress/bundler-vite'
import {getDirname, path} from 'vuepress/utils'
import {activeHeaderLinksPlugin} from '@vuepress/plugin-active-header-links'
import {mdEnhancePlugin} from "vuepress-plugin-md-enhance";

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'zh-Hans-CN',
  title: ' 燕山大学MC社',
  description: '燕山大学Minecraft学生同好者协会官方网站',
  head: [
    ['link', {rel: 'icon', href: '/favicon.svg', type: 'image/svg'}],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    }],
  ],
  alias: {
    '@': path.resolve(__dirname, './'),
    '~': path.resolve(__dirname, '../'),
  },

  theme: (app) => {
    return {
      name: 'theme-ysumc',
      clientConfigFile: path.resolve(__dirname, 'client.js'),
      plugins: [
        activeHeaderLinksPlugin({
          // 配置项
        }),
      ]
    }
  },

  plugins: [
    // @vuepress/plugin-blog@next https://ecosystem.vuejs.press/zh/plugins/blog/blog/
    blogPlugin({
      hotReload: true,
      filter: ({ filePathRelative, frontmatter }) => {
        // 舍弃那些不是从 Markdown 文件生成的页面
        if (!filePathRelative) return false

        // 舍弃 `archieve` 文件夹的页面
        if (!filePathRelative.startsWith('archieve/')) return false

        // 舍弃那些没有使用默认布局的页面
        if (frontmatter.home || frontmatter.layout) return false

        return true
      },
      category: [ // 分类
        {
          key: 'tag',
          getter: ({ frontmatter }) => frontmatter.tag || [],
          path: '/tag/',
          layout: 'TagMap',
          frontmatter: () => ({ title: '标签页' }),
          itemPath: '/tag/:name/',
          itemLayout: 'TagList',
          itemFrontmatter: (name) => ({ title: `${name}标签` }),
        },
      ],
      type: [ // 类型
        {
          key: 'project', // Only article with date should be added to timeline
          filter: (page) =>
            page.filePathRelative.startsWith('project/') && !page.frontmatter.archive, // Sort pages with time
          sorter: (pageA, pageB) => new Date(pageB.frontmatter.date).getTime() - new Date(pageA.frontmatter.date).getTime(),
        }
      ],
    }),
    mdEnhancePlugin({
      // Enable attrs support
      attrs: true,
    }),
  ],

  markdown: {},
  // extendsMarkdown: md => {
  //   md.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => {
  //     return '<p class="hzsb-passage-paragraph">';
  //   };
  //   md.renderer.rules.paragraph_close = (tokens, idx, options, env, self) => {
  //     return "</p>";
  //   };
  // },

  bundler: viteBundler(),
})
