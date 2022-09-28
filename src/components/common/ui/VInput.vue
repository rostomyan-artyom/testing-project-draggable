<template>
  <label
    :class="[
      'v-input',
      { 'v-input_icon-mode': $slots.icon },
      { 'v-input_focused': focused },
   ]"
  >
    <i class="v-input__icon">
      <slot name="icon" />
    </i>

    <input
      v-bind="$attrs"
      v-on="$listeners"
      class="v-input__hero"
    />

    <button
      v-if="$slots.delete"
      class="v-input__delete"
      @click="$emit('clearInput')"
    >
      <slot name="delete" />
    </button>
  </label>
</template>

<script>
export default {
  name: 'VInput',

  model: {
    prop: 'search',
    event: 'change',
  },
  props: {
    focused: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.v-input {
  position: relative;
  padding-bottom: 12px;
  border-bottom: 1px solid #BFC9E0;
  transition: $transition;

  &:before {
    position: absolute;
    content: '';
    width: 0;
    height: 1px;
    left: 0;
    bottom: -1px;
    background-color: #0066FF;
    transition: $transition;
  }

  &_icon-mode {
    padding-left: 27px;
  }
}

.v-input_focused {
  &:before {
    width: 100%;
  }
}

.v-input__icon {
  position: absolute;
  left: 0;
  top: 0;
}

.v-input__hero {
  font-weight: 400;
  font-size: 15px;
  line-height: 108%;
  color: #000000;
  outline:none;

  &::placeholder {
    font-style: italic;
    font-weight: 400;
    font-size: 15px;
    line-height: 108%;
    color: #8E9CBB;
  }

  ::-moz-selection {
    background-color: transparent;
  }

  ::selection {
    background-color: transparent;
  }
}

.v-input__delete {
  position: absolute;
  display: flex;
  right: 0;
  top: 4px;
  transition: $transition;

  &:hover {
    transform: translate(0, -2px);
  }
}
</style>
