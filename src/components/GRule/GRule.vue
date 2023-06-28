<script setup>
import {ref} from 'vue';
import useRulesStore from '@/stores/Rules';
import {storeToRefs} from 'pinia';
import GRuleHeader from '@/components/GRule/GRuleHeader.vue';
import GRuleList from '@/components/GRule/GRuleList.vue'
import GRuleEditor from '@/components/GRule/GRuleEditor.vue';

const rulesStore = useRulesStore()
const {ruleGroupName, rules, activeIndex} = storeToRefs(rulesStore)
const mode = ref('edit')
</script>

<template>
<GRuleHeader @add-rule="rulesStore.addRule()"></GRuleHeader>
  <div class="container mx-auto relative">
    <div class="b-group-name w100 flex justify-end py-4">
      <label class="font-medium">Rule Group Name:</label>
      <input
          class="input"
          type="text"
          name="groupName"
          v-model="ruleGroupName"
      />
    </div>
    <div
        v-if="rules.length"
        class="switcher absolute right-0 flex justify-center border rounded"
    >
      <div
          :class="{ 'bg-blue-400 text-white': mode === 'edit' }"
          class="rounded py-1 px-4 cursor-pointer"
          @click="mode = 'edit'"
      >
        Visual
      </div>
      <div
          :class="{ 'bg-blue-400 text-white': mode === 'code' }"
          class="py-1 px-4 rounded cursor-pointer"
          @click="mode = 'code'"
      >
        Code
      </div>
    </div>

    <div v-if="rules.length" class="flex gap-8">
      <GRuleList
          class="w-1/5"
          :rules="rules"
          :activeIndex="activeIndex"
          @set-active="rulesStore.setActiveIndex($event)"
          @delete-rule="rulesStore.deleteRule($event)"
      ></GRuleList>
      <GRuleEditor
          v-show="mode === 'edit'"></GRuleEditor>
    </div>

    <div v-else class="text-center">NO RULES</div>
  </div>
</template>

<style scoped>

</style>
