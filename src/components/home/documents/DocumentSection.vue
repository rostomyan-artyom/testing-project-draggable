<template>
  <div class="document-section-item">
    <DocumentItem
      :statuses="getStatuses(documentsElement.statuses)"
      class="document-section-item__category"
    >
      <template v-slot:show-btn>
        <VButton
          :class="[
            'document-section-item__btn',
            { 'document-section-item__btn_opened': categoryShow },
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

      <template v-if="documentsElement.require" v-slot:warning>
        Обязательный
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
        { 'document-section-item__documents-container_opened': categoryShow },
      ]"
    >
      <Draggable
        ref="section-documents"
        handle=".document-item__action-item_draggable"
        ghostClass="on-drag"
        group="documents"
        animation="400"
        @add="add"
        @remove="$emit('removeCategoryDocuments', $event)"
        @choose="$emit('chooseCategoryDocuments', $event)"
        @end="move"
        @dragleave.native="calculateHeight"
      >
        <DocumentItem
          v-for="documentItem in documentsElement.data"
          :statuses="getStatuses(documentItem.statuses)"
          :key="documentItem.id"
          class="document-section-item__document"
        >
          <template v-slot:title-little>
            {{ documentItem.name }}
          </template>

          <template v-if="documentItem.require" v-slot:warning>
            Обязательный
          </template>

          <template v-slot:description>
            {{ documentItem.description }}
          </template>
        </DocumentItem>
      </Draggable>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';
import DocumentItem from '@/components/home/documents/DocumentItem';
import VButton from '@/components/common/ui/VButton';
import ArrowIcon from '@/assets/icons/common/arrow.svg';

import statusesMixin from '@/mixins/statuses';

export default {
  name: 'DocumentSection',
  components: {
    Draggable,
    DocumentItem,
    VButton,
    ArrowIcon,
  },
  mixins: [statusesMixin],

  props: {
    documentsElement: {
      type: Object,
      default: () => ({}),
    },
    categoriesMoving: {
      type: Boolean,
      default: false,
    },
    searchingProcess: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    actualHeight: '0px',
  }),
  computed: {
    documentsContainerHeight() {
      if(this.categoryShow) return this.actualHeight;

      return '0px';
    },
    categoryShow() {
      return this.documentsElement.opened ||
        this.searchingProcess ||
        this.documentsElement.dragenter &&
        !this.categoriesMoving
    }
  },

  mounted() {
    this.calculateHeight();
  },

  watch: {
    'documentsElement.dragenter'() {
      this.calculateHeight();
    },
    'documentsElement.opened'() {
      this.calculateHeight();
    },
    searchingProcess() {
      this.calculateHeight();
    }
  },

  methods: {
    calculateHeight() {
      let blockHeight = this.$refs['section-documents'].$el.clientHeight
      if(this.documentsElement.dragenter) blockHeight += 35;

      this.actualHeight = blockHeight + 'px';
    },
    toggleDocumentsShow() {
      this.$emit('toggleDocumentsShow');
      this.calculateHeight();
    },
    add(e) {
      this.$emit('showDocuments');
      this.$emit('addInCategoryDocuments', e);

      this.$nextTick(() => {
        this.calculateHeight();
      })
    },
    move(e) {
      this.$emit('moveCategoryDocuments', e);

      this.$nextTick(() => {
        this.calculateHeight();
      })
    }
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
