<template>
  <div class="layout-empty">
    <div class="layout-empty__container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutEmpty',
}
</script>

<style lang="scss" scoped>
.layout-empty {
}

.layout-empty__container {
  max-width: 1800px;
  margin: 0 auto;

  @media (max-width: 1820px) {
    padding: 0 20px;
  }
}
</style>
