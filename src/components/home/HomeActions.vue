<template>
  <div class="home-actions">
    <VButton class="home-actions__action-item home-actions__action-item_flag">
      <template v-slot:icon>
        <FlagIcon  class="home-actions__action-icon_flag" />
      </template>
    </VButton>

    <VButton class="home-actions__action-item home-actions__action-item_new-type">
      <template v-slot:icon>
        <PlusIcon />
      </template>

      <template v-slot:title>
        Новый тип
      </template>
    </VButton>

    <VButton class="home-actions__action-item home-actions__action-item_new-document">
      <template v-slot:icon>
        <PlusIcon />
      </template>

      <template v-slot:title>
        Новый документ
      </template>
    </VButton>
  </div>
</template>

<script>
import VButton from '@/components/common/ui/VButton';
import FlagIcon from '@/assets/icons/common/flag.svg';
import PlusIcon from '@/assets/icons/common/plus.svg';


export default {
  name: 'HomeActions',
  components: {
    VButton,
    FlagIcon,
    PlusIcon,
  }
}
</script>

<style lang="scss" scoped>
.home-actions {
  display: flex;
  align-items: center;
}

.home-actions__action-item {
  height: 30px;

  &:not(:first-child) {
    margin-left: 10px;
  }

  &_flag {
    justify-content: center;
    width: 30px;
  }

  &_new-type {
    padding-left: 10px;
    width: 115px;
  }

  &_new-document {
    padding-left: 10px;
    width: 149px;
  }
}

.home-actions__action-icon {
  &_flag {
    width: 10px !important;
    height: auto !important;
  }
}
</style>
