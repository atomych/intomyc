<template>
  <div class="wrapper" v-if="work">
    <div class="dots">
      <div class="dot d1"></div>
      <div class="dot d2"></div>
      <div class="dot d3"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes download1 {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

@keyframes download2 {
  30% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

@keyframes download3 {
  60% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}
.wrapper {
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 100;

  background-color: #ffffffd6;

  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
}

.dots {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot {
  width: 30px;
  height: 30px;
  background-color: #ad6cff;
  border-radius: 50%;

  margin-right: 20px;

  transition: all 0.1s linear;

  &:last-child {
    margin-right: 0;
  }

  &.d1 {
    animation: 1s infinite reverse download3;
  }

  &.d2 {
    animation: 1s infinite reverse download2;
  }

  &.d3 {
    animation: 1s infinite reverse download1;
  }
}
</style>

<script>
export default {
  name: "DownloadDisplay",

  props: {
    text: {
      type: String,
      default: "",
      required: false,
    },
    work: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
};
</script>
