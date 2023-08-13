<template>
  <div class="container">
    <default-header :title="'User'" />
    <ul class="list">
      <dialog-message :side="'left'" :text="'Hello'" class="mess" />
      <dialog-message :side="'right'" :text="'Hello1'" class="mess" />
      <dialog-message :side="'left'" :text="'Hello2'" class="mess" />
    </ul>
    <message-input />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-bottom: 50px;
}

.list {
  width: 100%;
  max-width: 800px;

  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: end;

  padding: 20px 0;

  position: relative;
}

.mess {
  margin-bottom: 10px;
}
</style>

<script>
import DefaultHeader from "../components/DefaultHeader.vue";
import DialogMessage from "../components/DialogMessage.vue";
import MessageInput from "../components/MessageInput.vue";

export default {
  name: "DialogPage",

  components: {
    DefaultHeader,
    DialogMessage,
    MessageInput,
  },
};
</script>
