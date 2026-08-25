<script lang="ts" setup>
defineProps<{
  onDigit: (digit: string) => void;
  onSubmit: () => void;
  submitDisabled: boolean;
}>();

const NUMBER_KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];
</script>

<template>
  <div class="keypad">
    <button v-for="key in NUMBER_KEYS" :key="key" @click="onDigit(key)">
      {{ key }}
    </button>
    <button class="zero" @click="onDigit('0')">0</button>
    <button @click="onSubmit" :class="{ submitDisabled }">Submit</button>
  </div>
</template>

<style scoped>
.keypad {
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
button {
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: #ffffff;
  cursor: pointer;
}
button.zero {
  grid-column: 1 / span 2;
}
.submitDisabled {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
