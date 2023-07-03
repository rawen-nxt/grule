<script setup>
import { operations } from '@/helpers/constants'
import { computed, ref } from 'vue'

defineOptions({
  operations
})

const emit = defineEmits(['updateOperator', 'addExpression'])

const props = defineProps({
  operator: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    required: true
  }
})

const showVariants = ref(false)

const groupOperator = computed(
  () => Object.keys(operations.groupLogic).filter((key) => key !== props.operator)[0]
)

const variants = computed(() => {
  if (props.index > 0) {
    return operations.groupLogic[groupOperator.value]
  }
  return operations[props.type]
})

function changeOperator(operator, index, grouping) {
  showVariants.value = false
  if (props.operator) {
    emit('updateOperator', { operator, index, grouping })
  } else {
    emit('addExpression', operator)
  }

}
</script>

<template>
  <div class="cursor-pointer my-2 self-start">
    <span
      class="text-center py-2 px-4 rounded-md inline-block relative shadow-md whitespace-nowrap"
      :class="{
        'bg-blue-400  w-48': props.type === 'compare',
        'w-24': props.type !== 'compare',
        'bg-green-300 ml-12': props.operator === 'and',
        'bg-yellow-200 ml-12': props.operator === 'or',
        'border-2': props.operator === ''
      }"
      @click="showVariants = !showVariants"
      >{{ operations[type][operator]?.str || 'Add' }}</span
    >
    <div
      v-show="showVariants"
      class="variants bg-white border rounded-md absolute w-auto text-center z-10"
    >
      <template v-if="index > 0">
        <div
          v-for="value in variants"
          :key="value.toString()"
          class="p-2 whitespace-nowrap"
          @click="changeOperator(groupOperator, index, value.grouping)"
        >
          {{ value.str }}
        </div>
      </template>
      <template v-else>
        <div
          v-for="(value, key) in variants"
          :key="key"
          class="p-2 whitespace-nowrap"
          @click="changeOperator(key, index, null)"
        >
          {{ value.str }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
