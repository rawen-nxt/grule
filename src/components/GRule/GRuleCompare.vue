<script setup>
import useRulesStore from '@/stores/Rules'
import GRuleOperand from '@/components/GRule/GRuleOperand.vue'
import GRuleOperator from '@/components/GRule/GRuleOperator.vue'

const props = defineProps({
  expressionId: {
    type: String,
    required: true
  },
  index: {
    type: Number,
    required: true
  },
  hideClose: {
    type: Boolean,
    default: false
  }
})

const rulesStore = useRulesStore()
const expression = rulesStore.getExpressionById(props.expressionId)

function updateOperand(obj) {
  rulesStore.updateOperand(props.expressionId, obj)
}

function updateOperator({ operator, index, grouping }) {
  rulesStore.updateOperator(props.expressionId, operator, index, grouping)
}

function deleteItem() {
  rulesStore.deleteExpression(props.expressionId)
}
</script>

<template>
  <div class="group p-2 bg-blue-200 flex justify-center rounded-md shadow-md relative">
    <GRuleOperand :operand="expression.operands[0]" :index="0" @update-operand="updateOperand" />
    <GRuleOperator
      :type="'compare'"
      :operator="expression.operator"
      @update-operator="updateOperator"
    />
    <GRuleOperand :operand="expression.operands[1]" :index="1" @update-operand="updateOperand" />

    <div
      v-if="!hideClose"
      class="opacity-0 group-hover:opacity-100 close px-1.5 bg-red-300 text-white absolute top-0 right-0 cursor-pointer rounded-md"
      @click="deleteItem"
    >
      x
    </div>
  </div>
</template>

<style scoped></style>
