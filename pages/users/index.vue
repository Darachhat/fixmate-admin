<template>
  <div>
    <h1>Users Management</h1>
    <p>List of users will appear here.</p>
  </div>
</template>
<script setup>
definePageMeta({ middleware: 'auth' })
</script>
