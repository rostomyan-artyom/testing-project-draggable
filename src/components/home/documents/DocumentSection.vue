<template>
  <div class="document-section-item">
    <DocumentItem class="document-section-item__category">
      <template v-slot:show-btn>
        <VButton
          :class="[
            'document-section-item__btn',
            { 'document-section-item__btn_opened': documentsElement.opened },
          ]"
          @click.native="toggleDocumentsShow"
        >
          <template v-slot:icon>
            <ArrowIcon class="document-section-item__arrow-icon" />
          </template>
        </VButton>
      </template>

      <template v-slot:title-big>
        {{ documentsElement.name }}
      </template>

      <template v-slot:description>
        {{ documentsElement.description }}
      </template>
    </DocumentItem>

    <div
      v-if="documentsElement.data"
      :style="{
        'max-height': documentsContainerHeight
      }"
      :class="[
        'document-section-item__documents-container',
        { 'document-section-item__documents-container_opened': documentsElement.opened },
      ]"
    >
      <Draggable
        ref="section-documents"
        handle=".document-item__action-item_draggable"
        ghostClass="on-drag"
        group="documents"
        animation="400"
        class="document-section-item__documents-list"
        @add="add"
        @end="move"
      >
        <template v-if="documentsElement.data.length">
          <DocumentItem
            v-for="documentItem in documentsElement.data"
            :key="documentItem.id"
            class="document-section-item__document"
          >
            <template v-slot:title-little>
              {{ documentItem.name }}
            </template>

            <template v-slot:description>
              {{ documentsElement.description }}
            </template>
          </DocumentItem>
        </template>
      </Draggable>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import DocumentItem from '@/components/home/documents/DocumentItem';
import VButton from '@/components/common/ui/VButton';
import ArrowIcon from '@/assets/icons/common/arrow.svg';

export default {
  name: 'DocumentSection',
  components: {
    Draggable,
    DocumentItem,
    VButton,
    ArrowIcon,
  },

  props: {
    documentsElement: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    actualHeight: '0px',
  }),

  computed: {
    documentsContainerHeight() {
      if(!this.documentsElement.opened) return '0px';

      return this.actualHeight;
    }
  },

  methods: {
    calculateHeight() {
      this.actualHeight = this.$refs['section-documents'].$el.clientHeight + 'px';
    },
    toggleDocumentsShow() {
      this.$emit('toggleDocumentsShow');
      this.calculateHeight();
    },
    add() {
      this.calculateHeight();
      this.$emit('showDocuments');
    },
    move(data) {
      console.log(data);
      this.calculateHeight();
    },
  },
}
</script>

<style lang="scss" scoped>
.document-section-item {
}

.document-section-item__category {
  width: 100%;
  height: 48px;
  z-index: 2;
}

.document-section-item__btn {
  display: flex;
  justify-content: center;
  min-width: 22px;
  width: 22px;
  height: 22px;
}

.document-section-item__arrow-icon {
  transition: $transition;
}

.document-section-item__btn_opened .document-section-item__arrow-icon {
  transform: scaleY(-1);
}

.document-section-item__description {
  font-weight: 400;
  font-size: 11px;
  line-height: 108%;
  color: #8E9CBB;
  margin: 0 0 0 15px;
  white-space: nowrap;
}

.document-section-item__documents-container {
  padding-left: 16px;
  transition: $transition;
  margin-top: -1px;
  opacity: 0;

  &_opened {
    opacity: 1;
  }
}

.document-section-item__document {
  height: 35px;
  &:not(:first-child) {
    margin-top: -1px;
  }
}
</style>
