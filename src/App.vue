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
  user-select: none;
}

body {
  width: 100%;
  height: 100vh;
}

#app {
  height: 100%;
  width: 100%;
}

.scroll {
  overflow-y: scroll;

  &::-webkit-scrollbar-button {
    width: 0;
    display: none;
  }

  &::-webkit-scrollbar {
    background-color: #ad6cff;
    width: 6px;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fff;
    width: 4px;
    border-radius: 5px;
  }
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
 ** TODO 1) Регистрация пользователей
 ** TODO 2) Регистрация диалогов в поиске людей
 ** TODO 3) Быстрый вход, запоминание
 ** TODO 4) Подписка на обновление имени и авы пользователей
 ** TODO 5) Дизайн скрола
 ** TODO 6) Обработка размеров авы
 * TODO 7) Защита от входа на 2ух устройствах на один акк сразу, кнопка exit, статус в сети
 ** TODO 8) Экран загрузки
 ** TODO 9) Экран автовхода в аккаунт
 ** TODO 10) Дизайн аватарок
 ** TODO 11) Мобильный дизайн
 * TODO 12) Дизайн чата
 ** TODO 13) Непросмотренные сообщения
 * TODO 14) Сообщения в чате идут снизу вверх и при это чтоб работал скрол
 */
</script>
