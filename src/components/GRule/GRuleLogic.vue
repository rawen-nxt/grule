<script setup>
import GRuleCompare from '@/components/GRule/GRuleCompare.vue'
import GRuleOperator from '@/components/GRule/GRuleOperator.vue'
import useRulesStore from '@/stores/Rules'

const props = defineProps({
  isRoot: {
    type: Boolean,
    default: false
  },
  expressionId: {
    type: String,
    required: true
  },
  deep: {
    type: Number,
    required: true
  }
})

const rulesStore = useRulesStore()
const expression = rulesStore.getExpressionById(props.expressionId)

function addExpression(operator) {
  rulesStore.addExpression(operator)
}

function updateOperator({ operator, index, grouping }) {
  rulesStore.updateOperator(props.expressionId, operator, index, grouping)
}
</script>

<template>
  <template v-if="['and', 'or'].includes(expression.operator)">
    <div
      class="parent flex p-4 flex-col items-stretch rounded-md relative"
      :class="{
        'bg-green-100 shadow-md': expression.operator === 'and',
        'bg-yellow-100 shadow-md': expression.operator === 'or'
      }"
    >
      <template v-for="(operand, index) in expression.operands" :key="operand">
        <GRuleOperator
          v-if="index > 0"
          :index="expression.operands.length > 2 ? index : 0"
          :type="'logic'"
          :operator="expression.operator"
          @update-operator="updateOperator($event)"
        />

        <GRuleLogic :expression-id="operand" :deep="deep + 1" />
      </template>
    </div>
  </template>
  <template v-else>
    <GRuleCompare :expression-id="props.expressionId" :hideClose="!deep" />
  </template>
  <div v-if="isRoot" class="flex justify-center">
    <GRuleOperator :type="'logic'" @add-expression="addExpression" operator="" />
  </div>
</template>

<style scoped></style>
