<template>
  <router-view />
</template>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

body {
  width: 100%;
  height: 100vh;
}

#app {
  height: 100%;
}
</style>

<script>
export default {
  name: "App",

  created() {
    this.$router.push({ name: "start" });
  },
};
</script>
