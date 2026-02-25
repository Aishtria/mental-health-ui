<template>
  <div id="app">
    <h1 style="text-align:center;">Mental Health Tracker</h1>
    <MoodForm />
  </div>
</template>

<script>
import MoodForm from './components/MoodForm.vue';

export default {
  name: 'App',
  components: {
    MoodForm
  }
}
</script>

<style>
body { background-color: #f0f2f5; margin: 0; padding: 20px; }
</style>