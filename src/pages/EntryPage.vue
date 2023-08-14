<template>
  <div class="window">
    <h1 class="title">Intomyc</h1>
    <default-field
      :fieldType="'text'"
      :text="'Your email'"
      v-model:fieldValue="email"
      class="field-out"
    />
    <default-field
      :fieldType="'password'"
      :text="'Your password'"
      v-model:fieldValue="password"
      class="field-out"
    />
    <default-button :text="'Sign in'" @clickIn="login()" class="btn-out" />
    <default-link
      :text="'Create account'"
      @clickIn="toCreate()"
      class="link-out"
    />
  </div>
</template>

<style lang="scss" scoped>
.window {
  padding: 20px 100px;
  background-color: #ffffff8d;
  border-radius: 20px;
}

.title {
  font-size: 30px;
  font-weight: 700;
  color: #000;
  margin-bottom: 35px;

  text-align: center;
}

.field-out {
  margin-bottom: 30px;
}

.btn-out {
  margin: 0 auto;
  display: block;
  margin-bottom: 20px;
}

.link-out {
  text-align: center;
  margin: 0 auto;
  display: block;
}
</style>

<script>
import DefaultField from "../components/DefaultField.vue";
import DefaultButton from "../components/DefaultButton.vue";
import DefaultLink from "../components/DefaultLink.vue";

import { mapActions } from "vuex";

export default {
  name: "EntryPage",

  components: {
    DefaultField,
    DefaultButton,
    DefaultLink,
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    ...mapActions(["auth"]),

    login() {
      if (this.email != "" && this.password.length >= 6) {
        this.auth({ email: this.email, password: this.password });
        this.$router.push({ name: "user" });
      }
    },

    toCreate() {
      this.$router.push({ name: "reg" });
    },
  },
};
</script>
