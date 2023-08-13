<template>
  <div class="container">
    <default-header :title="'Settings'" class="head" />
    <ul class="list">
      <li class="list__item">
        <div class="text">Change your photo:</div>
        <default-button :text="'Choose'" />
      </li>
      <li class="list__item">
        <div class="text">Change your name:</div>
        <input type="text" class="input" />
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.head {
  margin-bottom: 25px;
}

.list {
  list-style: none;
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 800px;

  &__item {
    display: block;

    padding: 10px 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    background-color: #ffffff8d;
    border-radius: 10px;

    .text {
      font-weight: 500;
      font-size: 18px;
      color: #000;
    }

    .input {
      background-color: #fff;
      border: none;
      outline: none;
      border-radius: 5px;

      font-weight: 500;
      font-size: 18px;
      color: #000;

      padding: 5px 10px;
    }
  }
}
</style>

<script>
import DefaultHeader from "../components/DefaultHeader.vue";
import DefaultButton from "../components/DefaultButton.vue";

export default {
  name: "SettPage",

  components: {
    DefaultHeader,
    DefaultButton,
  },
};
</script>
