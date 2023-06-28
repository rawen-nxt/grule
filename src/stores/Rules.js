import {defineStore} from 'pinia';
import {reactive, ref} from 'vue';
import {cloneDeep} from 'lodash/lang';
import { uuid } from "vue-uuid";

const useRulesStore = defineStore('rules', () => {
  const blankRule =  {
    name: '',
    desc: '',
    conditions:{},
    actions: {}
  }
  const ruleGroupName = ref(''),
        rules = reactive([]),
        activeIndex = ref(0)

  function addRule(){
    const newRule = cloneDeep(blankRule)
    newRule.name = 'Rule ' + (rules.length + 1)
    newRule.id = uuid.v1()
    rules.push(newRule)
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

  return {ruleGroupName, rules, activeIndex, addRule, deleteRule, setActiveIndex}
})

export default useRulesStore
