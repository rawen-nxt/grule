import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { cloneDeep } from 'lodash/lang'
import { uuid } from 'vue-uuid'

const useRulesStore = defineStore('rules', () => {
  const blankRule = {
    name: '',
    desc: '',
    silence: 0,
    when: new Map(),
    then: {}
  }

  const blankCondition = {
    operator: 'eq',
    operands: [{ obj: '' }, { obj: '' }]
  }

  const ruleGroupName = ref(''),
    rules = reactive([]),
    activeIndex = ref(0),
    rule = computed(() => rules[activeIndex.value]),
    conditions = computed(() => rule.value.when)

  function _findParentExpression(id) {
    for (const [key, value] of conditions.value) {
      if (value.operands.includes(id)) {
        return key
      }
    }
  }
  function addRule() {
    const newRule = cloneDeep(blankRule)
    const condition = cloneDeep(blankCondition)
    const id = uuid.v1()

    newRule.name = 'Rule ' + (rules.length + 1)
    newRule.id = uuid.v1()
    newRule.rootId = id
    newRule.when.set(id, condition)

    rules.push(newRule)
    activeIndex.value = rules.length - 1
  }

  function deleteRule(index) {
    rules.splice(index, 1)
    if (index <= activeIndex.value && activeIndex.value > 0) {
      activeIndex.value--
    }
  }

  function setActiveIndex(index) {
    activeIndex.value = index
  }

  function getExpressionById(id) {
    return conditions.value.get(id)
  }

  function updateOperand(expressionId, obj) {
    const expr = conditions.value.get(expressionId)
    expr.operands[obj.index] = obj.obj
  }

  function updateOperator(expressionId, operator, index = 0, grouping = false) {

    const expression = conditions.value.get(expressionId)
  

    if (index > 0) {
      if (grouping) {
        _createGroupingExpression(expression, operator, index)
        return
      } else {
        _createDividingExpression(expression, expression.operator, index)
      }
    }
    
    expression.operator = operator

    if (['or', 'and'].includes(operator)) {
      const condition = conditions.value.get(rule.value.rootId)
      condition.operands = combineSameNested(rule.value.rootId)
    }

  }

  function _createExpression(operands, operator) {
    
    const expressionId = uuid.v1(),
    expression = { operator, operands }
    
    if (operands.length === 1) {
      return operands[0]
    }
  
    conditions.value.set(expressionId, expression)
    return expressionId
  }

  function _createDividingExpression(expression, operator, index) {
    const operands = expression.operands,
          operand1 = operands.slice(0, index),
          operand2 = operands.slice(index, operands.length),
          newOperands = [_createExpression(operand1, operator), _createExpression(operand2, operator)]

    operands.splice(0, operands.length, ...newOperands)
  }

  function _createGroupingExpression(expression, operator, index) {
    const operands = expression.operands,
          newOperands = [operands[index - 1], operands[index]],
          newExpressionId = _createExpression(newOperands, operator)

    operands.splice(index - 1, 2, newExpressionId)
    
    const condition = conditions.value.get(rule.value.rootId)
    condition.operands = combineSameNested(rule.value.rootId)
  }

  function addExpression(operator) {
    const id = uuid.v1(),
      rootId = rule.value.rootId,
      newRootId = uuid.v1(),
      operands = [rootId, id]

    conditions.value.set(id, cloneDeep(blankCondition))
    conditions.value.set(newRootId, {
      operator,
      operands
    })

    rule.value.rootId = newRootId
    const condition = conditions.value.get(newRootId)
    condition.operands = combineSameNested(rule.value.rootId)
  }

  function deleteExpression(id, childMoveToParent = null) {
    const parentExpressionId = _findParentExpression(id)

    if (parentExpressionId) {
    
      const parentExpression = conditions.value.get(parentExpressionId)
      const index = parentExpression.operands.indexOf(id)
    
      if (childMoveToParent) {
        parentExpression.operands[index] = childMoveToParent
      } else {
        parentExpression.operands.splice(index, 1)
      }
    
      if (parentExpression.operands.length === 1) {
        deleteExpression(parentExpressionId, parentExpression.operands[0])
      }

    } else {

      rule.value.rootId = childMoveToParent
      
    }
    conditions.value.delete(id)
  }

  function combineSameNested(id) {
    const { operator, operands } = conditions.value.get(id)
    operands.splice(
      0,
      operands.length,
      ...operands
        .map((el) => {
          const elOperator = conditions.value.get(el).operator
          if (['and', 'or'].includes(elOperator)) {
            const updatedOperands = combineSameNested(el)
            if (elOperator === operator) {
              conditions.value.delete(el)
              return updatedOperands
            }
            el.operands = combineSameNested(el)
            return el
          } else {
            return el
          }
        })
        .flat()
    )
    return operands
  }

  return {
    ruleGroupName,
    rules,
    rule,
    activeIndex,
    addRule,
    deleteRule,
    setActiveIndex,
    getExpressionById,
    updateOperand,
    updateOperator,
    deleteExpression,
    addExpression
  }
})

export default useRulesStore
