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
    <div class="save">
      <input type="checkbox" ref="check" />
      <div class="text">Remember me</div>
    </div>
    <default-button :text="'Sign in'" @clickIn="login()" class="btn-out" />
    <default-link
      :text="'Create account'"
      @clickIn="toCreate()"
      class="link-out"
    />
    <download-display :work="download" />
  </div>
</template>

<style lang="scss" scoped>
.window {
  padding: 20px 100px;
  background-color: #ffffff8d;
  border-radius: 20px;

  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.title {
  font-size: 30px;
  font-weight: 700;
  color: #000;
  margin-bottom: 35px;

  text-align: center;
}

.save {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 16px;
  color: #000;

  input {
    margin-right: 10px;
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
import DownloadDisplay from "../components/DownloadDisplay.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "EntryPage",

  components: {
    DefaultField,
    DefaultButton,
    DefaultLink,
    DownloadDisplay,
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  created() {
    const key = localStorage.getItem("AUTOENTRYKEY");
    const auto = localStorage.getItem("checkbox");

    if (key && auto) {
      this.work = true;
      this.autoEntry({
        key: key,
        cb: () => {
          this.$router.push({ name: "user" });
        },
      });
    }
  },

  methods: {
    ...mapActions(["auth", "autoEntry"]),

    login() {
      if (this.email != "" && this.password.length >= 6) {
        this.work = true;
        this.auth({
          email: this.email,
          password: this.password,
          cb: () => {
            this.$router.push({ name: "user" });
            localStorage.setItem(
              "checkbox",
              this.$refs.check.checked ? true : ""
            );
          },
        });
      }
    },

    toCreate() {
      this.$router.push({ name: "reg" });
    },
  },

  computed: {
    ...mapGetters(["download"]),
  },
};
</script>
