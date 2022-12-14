<template>
  <DocumentSectionItem class="document-item">
    <slot name="show-btn" />

    <p v-if="$slots['title-big']" class="document-item__title document-item__title_big">
      <slot name="title-big" />
    </p>

    <p v-if="$slots['title-little']" class="document-item__title document-item__title_little">
      <slot name="title-little" />
    </p>

    <div v-if="statuses.length" class="document-item__circle-statuses">
      <span
        v-for="(item, index) in statuses"
        :style="item.style"
        :key="index"
        class="document-item__circle-item"
      >
        <component :is="item.icon" />
      </span>
    </div>

    <p v-if="$slots.warning"  class="document-item__warning">
      <slot name="warning" />
    </p>

    <p v-if="$slots.description" class="document-item__description">
      <slot name="description" />
    </p>

    <template v-slot:actions>
      <div class="document-item__actions">
        <button
          v-for="actionItem in actions"
          :key="'d' + actionItem.id"
          :class="[
            'document-item__action-item',
             `document-item__action-item_${ actionItem.className }`,
           ]"
        >
          <component :is="actionItem.icon" />
        </button>
      </div>
    </template>
  </DocumentSectionItem>
</template>

<script>
import DocumentSectionItem from '@/components/home/documents/DocumentSectionItem';
import RedigereIcon from "@/assets/icons/home/redigere.svg";
import DeleteIcon from "@/assets/icons/home/delete.svg";
import SpostareIcon from "@/assets/icons/home/spostare.svg";

export default {
  name: 'DocumentItem',
  components: {
    DocumentSectionItem,
  },

  props: {
    statuses: {
      type: Array,
      default: () => ([]),
    },
  },
  data() {
    return {
      actions: [
        {
          id: 1,
          icon: RedigereIcon,
        },
        {
          id: 2,
          icon: DeleteIcon,
        },
        {
          id: 3,
          icon: SpostareIcon,
          className: 'draggable'
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.document-item__description {
  font-weight: 400;
  font-size: 11px;
  line-height: 108%;
  color: #8E9CBB;
  margin: 0 0 0 15px;
  white-space: nowrap;
}

.document-item__actions {
  display: flex;
  background-color: #fff;
}

.document-item__action-item {
  display: flex;
  transition: $transition;

  &:hover {
    transform: translate(0, -2px);
  }

  &:not(:first-child) {
    margin-left: 22px;
  }
}

.document-item__title {
  line-height: 108%;
  color: #000000;
  white-space: nowrap;

  &_big {
    font-weight: 500;
    font-size: 15px;
    margin: 0 0 0 14px;
  }
}

.document-item__circle-statuses {
  display: flex;
  align-items: center;
  margin-left: 16px;
  gap: 6px;
}

.document-item__circle-item {
  display: flex;
  align-items: center;
  height: 100%;
}

.document-item__warning {
  font-weight: 400;
  font-size: 11px;
  line-height: 108%;
  color: #FF238D;
  margin-left: 15px;
}
</style>
