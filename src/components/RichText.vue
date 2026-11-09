<script setup>
import { computed } from 'vue'

// 把文字中的「【待補：…】」切出來，用醒目的標記顯示
const props = defineProps({ text: { type: String, required: true } })

const parts = computed(() =>
  props.text
    .split(/(【待補[^】]*】)/)
    .filter(Boolean)
    .map((value) => ({ value, todo: value.startsWith('【待補') })),
)
</script>

<template>
  <template v-for="(part, i) in parts" :key="i">
    <mark v-if="part.todo" class="todo" title="這段內容還沒寫">{{ part.value }}</mark>
    <template v-else>{{ part.value }}</template>
  </template>
</template>
