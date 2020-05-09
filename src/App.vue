<template>
  <div id="app">
    <TextComponent />
    <MapComponent />
    <ContactComponent />
  </div>
</template>

<script>
import TextComponent from './components/TextComponent.vue'
import MapComponent from './components/MapComponent.vue'
import ContactComponent from './components/ContactComponent.vue'

export default {
  name: 'App',
  components: {
    TextComponent,
    ContactComponent,
    MapComponent
  }
}
</script>

<style>
</style>
