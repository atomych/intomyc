<template>
  <div class="wrapper">
    <input type="text" class="input" v-model="message" />
    <button class="btn" @click="$emit('send', message)">Send</button>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  max-width: 800px;

  border-radius: 10px;
  border: 3px solid #000;

  box-shadow: 0 0 10px #000;

  display: flex;
  background-color: #fff;
}

.input {
  background-color: #fff;
  flex-grow: 1;
  border: none;
  outline: none;

  color: #000;
  font-weight: 700;
  font-size: 16px;

  padding: 10px 15px;

  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

.btn {
  flex-grow: 0;

  border: none;
  outline: none;

  color: #fff;
  font-weight: 700;
  font-size: 16px;
  background-color: #811dff;
  padding: 10px 15px;

  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;

  cursor: pointer;
}
</style>

<script>
export default {
  name: "MessageInput",

  data() {
    return {
      message: "",
    };
  },

  emits: {
    send: null,
  },
};
</script>
