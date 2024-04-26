<template>
  <div
      class="max-w-7xl px-6 xl:px-0 mt-20 md:mt-0 mb-14 mx-auto md:flex md:gap-10 xl:gap-16 items-center"
  >
    <div class="md:w-1/2">
      <slot name="left"></slot>
    </div>
    <div class="md:w-1/2 mt-8 md:mt-0">
      <slot name="right"></slot>
    </div>
  </div>
</template>