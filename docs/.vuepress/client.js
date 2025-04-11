import {defineClientConfig} from 'vuepress/client'
import Layout from "./layout/Layout.vue";
import BlankPage from "./layout/BlankPage.vue";
import AutoLink from "./component/public/AutoLink.vue";

import './style/index.scss'

export default defineClientConfig({
  // we provide some blog layouts
  layouts: {
    Layout,
    BlankPage,
  },
  async enhance({app}) {
    if (!__VUEPRESS_SSR__) {
      const jarallax = await import('jarallax')
      app.provide('jarallax', jarallax)
    }
  }
})
