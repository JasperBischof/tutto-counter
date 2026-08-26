<script lang="ts" setup>
defineProps<{
  onDigit: (digit: string) => void;
  onSubmit: () => void;
  submitDisabled: boolean;
}>();

const NUMBER_KEYS = ["7", "8", "9", "4", "5", "6", "1", "2", "3"];
</script>

<template>
  <section id="keypad" class="flex flex-1">
    <div class="grid grid-cols-3 grid-rows-4 gap-1 w-full h-full">
      <button
        class="border rounded"
        v-for="key in NUMBER_KEYS"
        :key="key"
        @click="onDigit(key)"
      >
        {{ key }}
      </button>
      <button class="border rounded" @click="onDigit('0')">0</button>
      <button
        class="col-span-2 border rounded"
        @click="onSubmit"
        :class="{ submitDisabled }"
      >
        Submit
      </button>
    </div>
  </section>
</template>
