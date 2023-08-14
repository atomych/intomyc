<template>
  <header class="wrapper">
    <img class="photo" :src="photoSrc" alt="" v-if="photoSrc" />
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #811dff;
  width: 100%;
  max-width: 300px;
  padding: 10px 0;

  box-shadow: 0 0 10px #000;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.title {
  color: #fff;
  font-weight: 700;
  font-size: 20px;
  text-align: center;
}

.photo {
  width: 50px;
  margin-right: 10px;
}
</style>

<script>
export default {
  name: "DefaultHeader",

  props: {
    title: {
      type: String,
      default: "Title",
      required: true,
    },
    photoSrc: {
      type: String,
      default: "",
      required: false,
    },
  },
};
</script>
