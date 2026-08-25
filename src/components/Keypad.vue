<script lang="ts" setup>
defineProps<{
  onDigit: (digit: string) => void;
  onSubmit: () => void;
  submitDisabled: boolean;
}>();

const NUMBER_KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];
</script>

<template>
  <div>
    <button v-for="key in NUMBER_KEYS" :key="key" @click="onDigit(key)">
      {{ key }}
    </button>
    <button @click="onDigit('0')">0</button>
    <button :disabled="submitDisabled" @click="onSubmit">Submit</button>
  </div>
</template>
