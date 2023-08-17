<template>
  <div
    class="message"
    :class="{
      left: side == 'left',
      unwatched: unwatched,
      right: side == 'right',
    }"
  >
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
.message {
  background-color: #fff;
  color: #000;
  font-weight: 400;
  font-size: 18px;

  padding: 5px 10px;
  clear: both;

  position: relative;

  &.unwatched:after {
    display: block;
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    width: 10px;
    height: 10px;

    border-radius: 50%;
    background-color: #ffffff8d;
  }

  &.left {
    float: left;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 8px;
    &:after {
      right: -20px;
    }
  }

  &.right {
    float: right;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 8px;
    &:after {
      left: -20px;
    }
  }

  &.start {
    display: none;
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
    unwatched: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
};
</script>
