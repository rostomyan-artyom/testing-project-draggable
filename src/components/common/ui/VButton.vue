<template>
  <button class="v-button">
    <slot name="icon" />

    <span v-if="$slots.title" class="v-button__title">
      <slot name="title" />
    </span>
  </button>
</template>

<script>
export default {
  name: 'VButton',
}
</script>

<style lang="scss" scoped>
.v-button {
  display: flex;
  align-items: center;
  border: 1px solid #D3D8DF;
  border-radius: 50px;
  transition: $transition;
  &:hover {
    transform: translate(0, -2px);
    border: 1px solid #0049b0;
  }
}

.v-button__title {
  font-weight: 500;
  font-size: 12px;
  line-height: 108%;
  color: #000000;
  margin-left: 10.43px;
  transition: .2s;
}
</style>
