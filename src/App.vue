<template>
  <router-view />
</template>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

body {
  width: 100%;
  height: 100vh;
}

#app {
  height: 100%;
}
</style>

<script>
export default {
  name: "App",

  created() {
    this.$router.push({ name: "start" });
  },
};

/**
 *! TODO 1) Регистрация пользователей
 *! TODO 2) Регистрация диалогов в поиске людей
 *! TODO 3) Быстрый вход, запоминание
 * TODO 4) Подписка на обновление имени и авы пользователей
 * TODO 5) Дизайн скрола
 * TODO 6) Обработка размеров авы
 * TODO 7) Защита от входа на 2ух устройствах на один акк сразу, кнопка exit, статус в сети
 */
</script>
