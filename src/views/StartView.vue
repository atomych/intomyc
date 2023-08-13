<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ad6cff;

  height: 100%;
}
</style>

<script>
export default {
  name: "StartView",

  created() {
    this.$router.push({ name: "entry" });
  },
};
</script>
