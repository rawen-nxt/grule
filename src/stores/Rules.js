import {defineStore} from 'pinia';
import {computed, reactive, ref} from 'vue';
import {cloneDeep} from 'lodash/lang';
import { uuid } from "vue-uuid";

const useRulesStore = defineStore('rules', () => {
  const blankRule =  {
    name: '',
    desc: '',
    silence: 0,
    when: {},
    then: {},
  }

  const blankCondition = {
    operator: "eq",
    operands: [{obj: ""}, {obj: ""}],
  }

  const ruleGroupName = ref(''),
        rules = reactive([]),
        activeIndex = ref(0),
        rule = computed(() => rules[activeIndex.value])

  function addRule(){
    const newRule = cloneDeep(blankRule)
    newRule.name = 'Rule ' + (rules.length + 1)
    newRule.id = uuid.v1()

    const condition = cloneDeep(blankCondition)
    const id = uuid.v1()
    newRule.rootId = id

    newRule.when[id] = condition
    rules.push(newRule)
    activeIndex.value= rules.length - 1
  }

  function deleteRule(index){
    rules.splice(index, 1);
    if(index <= activeIndex.value && activeIndex.value > 0) {
      activeIndex.value--
    }
  }

  function setActiveIndex(index) {
    activeIndex.value = index
  }

  function getRootId(){
    return rules[activeIndex.value].ruleId
  }
  function getRuleById(id){
    const rule = rules[activeIndex]
    return rule.when[id]
  }

  return {ruleGroupName, rules, rule, activeIndex, addRule, deleteRule, setActiveIndex, getRootId, getRuleById}
})

export default useRulesStore
