<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import '@/assets/styles/style.scss';

export default {
  name: 'App',

  computed: {
    layout() {
      try {
        const layoutPath = 'layouts';
        const ln  = this.$route.meta.layout || 'empty';

        return () => import(`@/${layoutPath}/${ln}.vue`);

      } catch (e) {
        console.error(e);
        return  '';
      }
    },
  },
};
</script>

<style lang="scss">
</style>
