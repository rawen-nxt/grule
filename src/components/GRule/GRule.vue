<script setup>
import GRuleHeader from '@/components/GRule/GRuleHeader.vue';

function addRule() {
  console.log('add rule')
}
</script>

<template>
<GRuleHeader @add-rule="addRule"></GRuleHeader>
</template>

<style scoped>

</style>
