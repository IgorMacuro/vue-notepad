<template>
  <nav class="#ab47bc purple darken-2">
    <div class="nav-wrapper">
      <router-link to="/" class="brand-logo">Notes</router-link>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <router-link tag="li" to="/" exact active-class="active">
          <a href="#">Create</a>
        </router-link>
        <router-link tag="li" to="/list">
          <a href="#">List</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  padding: 0 2rem;
}
</style>
