<template>
  <div class="window">
    <default-field
      :fieldType="'text'"
      :text="'Write email'"
      v-model:fieldValue="email"
      class="field-out"
    />
    <default-field
      :fieldType="'text'"
      :text="'Write name'"
      v-model:fieldValue="name"
      class="field-out"
    />
    <default-field
      :fieldType="'password'"
      :text="'Write password'"
      v-model:fieldValue="password"
      class="field-out"
    />
    <default-field
      :fieldType="'password'"
      :text="'Repeat password'"
      v-model:fieldValue="password2"
      class="field-out"
    />
    <default-button :text="'Create one'" @clickIn="create()" class="btn-out" />
    <default-link
      :text="'Back to entry'"
      @clickIn="toLogin()"
      class="link-out"
    />
  </div>
</template>

<style lang="scss" scoped>
.window {
  padding: 20px 100px;
  background-color: #ffffff8d;
  border-radius: 20px;

  @media (max-width: 600px) {
    height: 100%;
    width: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
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
  name: "RegPage",

  components: {
    DefaultField,
    DefaultButton,
    DefaultLink,
  },

  data() {
    return {
      name: "",
      email: "",
      password: "",
      password2: "",
    };
  },

  methods: {
    ...mapActions(["loginNewUser"]),

    create() {
      if (this.password == this.password2 && this.password.length >= 6) {
        this.loginNewUser({
          email: this.email,
          password: this.password,
          name: this.name,
        });
        this.$router.push({ name: "entry" });
      }
    },

    toLogin() {
      this.$router.push({ name: "entry" });
    },
  },
};
</script>
