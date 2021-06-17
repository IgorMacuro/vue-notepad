<template>
  <div id="app" class="page grey lighten-5">
    <Navbar />
    <div class="container ">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
export default {
  components: { Navbar },
};
</script>

<style>
.page{
  height: 100vh;
}

@import "~materialize-css/dist/css/materialize.min.css";
</style>
