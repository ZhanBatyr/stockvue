<template>
  <li class="nav-item">
    <router-link :to="to" exact class="nav-link">
      <i :class="'nav-icon ' + icon "></i>
      <p><slot></slot></p>
    </router-link>
  </li>
</template>

<script>
export default {
  name: "NavItem",
  props: [
      'to', 'icon'
  ]
}
</script>

<style scoped>

</style>