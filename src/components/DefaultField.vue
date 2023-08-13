<template>
  <div class="container">
    <p class="text">{{ text }}</p>
    <input
      class="field"
      :type="fieldType"
      :value="fieldValue"
      @input="$emit('update:fieldValue', $event.target.value)"
    />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
}

.text {
  font-weight: 700;
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
}

.field {
  font-weight: 700;
  font-size: 16px;
  color: #000;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 10px;
}
</style>

<script>
export default {
  name: "DefaultField.vue",
  props: {
    fieldValue: {
      type: String,
      default: "",
      required: true,
    },
    text: {
      type: String,
      default: "text for field",
      required: true,
    },
    fieldType: {
      type: String,
      default: "text",
      required: true,
    },
  },
};
</script>
