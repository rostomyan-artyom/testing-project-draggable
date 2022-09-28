<template>
  <div class="document-section-item">
    <div class="document-section-item__content">
      <slot />
    </div>

    <div class="document-section-item__actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocumentSectionItem',
}
</script>

<style lang="scss" scoped>
.document-section-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 0 0 16px;
  background: #fff;
  border: 1px solid #DFE4EF;
  overflow: hidden;
}

.document-section-item__content {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: calc(100% - 121px);
  overflow: hidden;

  &:before {
    position: absolute;
    content: '';
    right: 0;
    height: 100%;
    width: 20px;
    top: 0;
    background: linear-gradient(270deg, #FFFFFF 0%, rgba(255, 255, 255, 0) 50%);
  }
}

.document-section-item__actions {
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  right: 0;
  padding: 0 16px 0 0;
  top: 50%;
  transform: translate(0, -50%);
  background-color: #fff;
}
</style>
