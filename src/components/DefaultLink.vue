<template>
  <a class="link-in" @click="$emit('clickIn')">{{ text }}</a>
</template>

<style lang="scss" scoped>
.link-in {
  font-weight: 500;
  color: #000;
  font-size: 14px;
  cursor: pointer;
}
</style>

<script>
export default {
  name: "DefaultLink",

  props: {
    text: {
      type: String,
      default: "link",
      required: true,
    },
  },

  emits: {
    clickIn: null,
  },
};
</script>
