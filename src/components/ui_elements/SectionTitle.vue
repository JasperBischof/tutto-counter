<script lang="ts" setup>
defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="flex justify-center items-center p-4">
    <h1 class="text-3xl">{{ title }}</h1>
  </section>
</template>
