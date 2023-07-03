<script setup>
const props = defineProps({
  operand: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['update-operand'])

function updateValue(e) {
  emit('update-operand', {
    index: props.index,
    obj: { [key]: e.target.value }
  })
}

const key = Object.keys(props.operand)[0]
</script>

<template>
  <div class="flex items-center px-4">
    <input
      :value="operand[key]"
      @input="updateValue"
      class="font-bold p-2 text-center rounded-md bg-transparent border-b border-gray-500 focus:bg-white"
    />
  </div>
</template>

<style scoped></style>
