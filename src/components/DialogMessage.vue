<template>
  <div class="message" :class="side">{{ text }}</div>
</template>

<style lang="scss" scoped>
.message {
  background-color: #fff;
  color: #000;
  font-weight: 400;
  font-size: 18px;

  padding: 5px 10px;

  &.left {
    align-self: start;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
  }

  &.right {
    align-self: end;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
  }
}
</style>

<script>
export default {
  name: "DialogMessage",

  props: {
    text: {
      type: String,
      default: "text",
      required: true,
    },
    side: {
      type: String,
      default: "right",
      required: true,
    },
  },
};
</script>
