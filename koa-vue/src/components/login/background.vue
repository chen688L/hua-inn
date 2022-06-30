<template>
  <vue-particles class="vue_particles"></vue-particles>
</template>

<script>

export default {
  name: "background",
  
};
</script>

<style>
.vue_particles {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(to left top, #0099cc, #996699, #336699);
}
</style>