<script setup>
const props = defineProps({
  rules: {
    type: Object,
    default: () => {}
  },
  activeIndex: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['setActive', 'deleteRule'])

function setActive(index) {
  emit('setActive', index)
}
function deleteRule(index) {
  emit('deleteRule', index)
}
</script>

<template>
  <div>
    <div
      v-for="(rule, index) in props.rules"
      :key="rule.id"
      class="rule-item"
      :class="{
        'bg-blue-400 text-white border-transparent': index === activeIndex,
        'bg-blue-50 cursor-pointer': index !== activeIndex
      }"
      @click="setActive(index)"
    >
      <div class="text-2xl">{{ rule.name }}</div>
      <div>{{ rule.desc }}</div>
      <button class="absolute right-4 top-8" @click.stop="deleteRule(index)">x</button>
    </div>
  </div>
</template>

<style scoped></style>
