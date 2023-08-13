<template>
  <button class="btn-in" @click="$emit('clickIn')">{{ text }}</button>
</template>

<style lang="scss" scoped>
.btn-in {
  font-weight: 500;
  font-size: 18px;
  color: #000;
  padding: 5px 15px;

  border: 1px solid #000;
  border-radius: 5px;
  background-color: #fff;

  cursor: pointer;
  outline: none;
}
</style>

<script>
export default {
  name: "DefaultButton",

  props: {
    text: {
      type: String,
      default: "button",
      required: false,
    },
  },

  emits: {
    clickIn: null,
  },
};
</script>
