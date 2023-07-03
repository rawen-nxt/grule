<script setup>
const emit = defineEmits(['add-rule'])

function addRule() {
  emit('add-rule')
}
</script>

<template>
  <header class="header">
    <div class="container flex justify-between align-center py-4 mx-auto">
      <h1 class="h1">Add/Edit Rules</h1>
      <div class="btn-block flex gap-2">
        <button class="btn light" @click.prevent="addRule">Add New Rule</button>
        <button class="btn light">Save Rule Group</button>
        <button class="btn light">Back</button>
      </div>
    </div>
  </header>
</template>

<style scoped></style>
