import {defineStore} from 'pinia';
import {reactive, ref} from 'vue';

const useRulesStore = defineStore('rules', () => {
  const ruleGroupName = ref('')
  const rules = reactive([
      {name: 'Rule 1', desc: 'rule 1 description'}
    ]
  )
  const activeIndex = ref(0)

  function addRule(){
    rules.push(rules[0])
  }
  function deleteRule(){
    console.log('delete rule')
  }

  function setActiveIndex(index) {
    activeIndex.value = index
  }

  return {ruleGroupName, rules, activeIndex, addRule, deleteRule, setActiveIndex}
})

export default useRulesStore
