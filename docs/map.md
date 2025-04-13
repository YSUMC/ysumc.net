---
layout: Blank
---

<script setup>
import MapCanva from '@/component/MapCanva.vue'
import {inject} from 'vue'

const setNavBar = inject('setNavBar')

setNavBar(true)
</script>

<MapCanva />
