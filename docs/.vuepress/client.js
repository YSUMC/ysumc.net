import {defineClientConfig} from 'vuepress/client'
import Layout from "./layout/Layout.vue";
import AutoLink from "./component/public/AutoLink.vue";

import './style/index.scss'

export default defineClientConfig({
  // we provide some blog layouts
  layouts: {
    Layout,
  },
  // enhance({app}) {
  //   app.component("AutoLink", AutoLink)
  // }
})
