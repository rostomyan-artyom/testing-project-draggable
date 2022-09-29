<template>
  <div class="home-header">
    <h1 class="home-header__title">
      <slot name="title" />
    </h1>

    <div class="home-header__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeHeader',
}
</script>


<style lang="scss" scoped>
.home-header {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.home-header__title {
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 108%;
  color: #000000;
}
</style>
