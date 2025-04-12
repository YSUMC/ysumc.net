<script setup lang="ts">
import Button from './public/Button.vue';

const props = defineProps<{
  title: string;
  tags?: string[];
  color?: string;
  dark?: boolean;
  actionButton?: {
    text: string;
    link: string;
  };
  image?: string;
  buttonOffset?: number;
}>();
</script>

<template>
  <div
    class="not-prose relative shadow-md md:shadow-lg
      my-6 md:my-10 p-6 md:p-10 none-bg
      flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6"
    :class="
      props.dark
        ? 'bg-black'
        : props.color === 'red'
        ? 'bg-red-dark'
        : 'bg-white'
    "
    :style="props.image ? { backgroundImage: `url(${props.image})`, backgroundSize: 'contain', backgroundPosition: 'right', backgroundRepeat: 'no-repeat' } : {}"
  >
    <div>
      <div
        v-if="title"
        class="text-3xl md:text-4xl mb-4 font-ysumc"
        :class="props.dark || props.color ? 'text-white' : 'text-gray4'"
      >
        {{ props.title }}
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="tag in props.tags"
          :key="tag"
          class="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm"
        >
          {{ tag }}
        </span>
      </div>
      <div
        class="text-base"
        :class="props.dark || props.color ? 'text-white' : 'text-black'"
      >
        <slot />
      </div>
    </div>
    <Button
      v-if="props.actionButton"
      :text="props.actionButton.text"
      :link="props.actionButton.link"
      :color="props.dark || props.color"
      :style="{ marginRight: props.buttonOffset ? `${props.buttonOffset}` : '0' }"
    />
  </div>
</template>

<style lang="css" scoped>
@media (max-width: 767px) {
    .none-bg {
        background-image: none !important;
    }
}
</style>
