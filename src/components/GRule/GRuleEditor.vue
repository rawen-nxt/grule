<script setup>
import useRulesStore from '@/stores/Rules';
import {storeToRefs} from 'pinia';

const rulesStore = useRulesStore()
const {rule} = storeToRefs(rulesStore)

</script>

<template>
  <div>
    <div class="row flex">
      <div class="form-block flex flex-col">
        <label>Rule Name</label>
        <input
            type="text"
            class=""
            name="name"
            v-model="rule.name"
        />
      </div>
      <div class="form-block flex flex-col">
        <label>Description</label>
        <input
            type="text"
            name="desc"
            v-model="rule.desc"/>
      </div>
      <div class="form-block flex flex-col">
        <label>Silence</label>
        <input
            type="number"
            name="silence"
            v-model="rule.silence"
        />
      </div>
    </div>
    <div class="row">
      <div class="title">Conditions</div>

    </div>

  </div>
</template>

<style scoped></style>

