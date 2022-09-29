<template>
  <div class="view-home">
    <HomeHeader class="view-home__header">
      <template v-slot:title>
        Документы
      </template>

      <template v-slot:actions>
        <HomeActions />
      </template>
    </HomeHeader>

    <div class="view-home__search-input-section">
      <VInput
        :value="searchInput.value"
        :focused="searchInput.focused"
        class="view-home__search-input"
        @focus="searchInput.focused = true"
        @blur="searchInput.focused = false"
        @input="event => updateValue(event.target.value)"
        @clearInput="clearInput"
      >
        <template v-slot:icon>
          <MagnifierIcon />
        </template>

        <template
          v-if="searchInput.value"
          v-slot:delete
        >
          <CrossIcon />
        </template>
      </VInput>
    </div>

    <div class="view-home__documents-container">
      <Draggable
        v-model="documents"
        handle=".document-item__action-item_draggable"
        ghostClass="on-drag"
        group="categories"
        animation="400"
        class="view-home__documents-categories"
        @start="categoriesStart"
        @end="categoriesEnd"
      >
        <DocumentSection
          v-for="(documentSection, index) in documentsCategories"
          :key="documentSection.id"
          :documents="documents"
          :documentsElement="documentSection"
          :categoriesMoving="categoriesMoving"
          :searchingProcess="searchingProcess"
          class="view-home__document-item"
          @toggleDocumentsShow="toggleDocumentsShow(documentSection.id)"
          @showDocuments="showDocuments(documentSection.id)"
          @addInCategoryDocuments="addInCategoryDocuments($event, index)"
          @removeCategoryDocuments="removeCategoryDocuments($event, index)"
          @moveCategoryDocuments="moveCategoryDocuments($event, index)"
          @chooseCategoryDocuments="chooseCategoryDocuments($event, index)"
          @dragenter.native="documentsDragenter($event, index)"
        />
      </Draggable>

      <Draggable
        handle=".document-item__action-item_draggable"
        ghostClass="on-drag"
        group="documents"
        animation="400"
        class="view-home__documents-separate"
        @add="addInSeparateDocument"
        @remove="removeSeparateDocument"
        @choose="chooseSeparate"
        @end="moveSeparate"
      >
        <DocumentItem
          v-for="documentItem in documentsSeparated"
          :statuses="getStatuses(documentItem.statuses)"
          :key="documentItem.id"
          class="view-home__document-item view-home__document-item_separate"
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
import HomeHeader from '@/components/home/HomeHeader';
import HomeActions from '@/components/home/HomeActions';
import DocumentSection from '@/components/home/documents/DocumentSection';
import DocumentItem from '@/components/home/documents/DocumentItem';
import VInput from '@/components/common/ui/VInput';
import MagnifierIcon from '@/assets/icons/common/magnifier.svg';
import CrossIcon from '@/assets/icons/common/cross.svg';

import statusesMixin from '@/mixins/statuses';
import { DOCUMENTS } from '@/utils/database-emulation/documents';

export default {
  name: 'ViewHome',
  components: {
    Draggable,
    HomeHeader,
    HomeActions,
    DocumentSection,
    DocumentItem,
    VInput,
    MagnifierIcon,
    CrossIcon,
  },
  mixins: [statusesMixin],

  data() {
    return  {
      documents: [],
      searchInput: {
        placeholder: 'Поиск',
        value: '',
        focused: false,
      },
      actualElementData: null,
      categoriesMoving: false,
    };
  },
  computed: {
    searchedDocuments() {
      const searchedValue = this.searchInput.value;

      if(searchedValue) {
        return this.documents.reduce((acc, item) => {
          if(item.type === 'category') {
            if(this.searchTextStatus(searchedValue, item.name) !== -1) {
              acc.push(item);

              return acc;
            }

            if(item.data.length) {
              const newDataList = [];

              item.data.forEach(dataItem => {
                 const status = this.searchTextStatus(searchedValue, dataItem.name) !== -1;

                 status ? newDataList.push(dataItem) : '';
              })

              if(newDataList.length) acc.push({ ...item, data: newDataList});
            }
          } else if (item.type === 'document-item') {
            if(this.searchTextStatus(searchedValue, item.name) !== -1) acc.push(item);
          }

          return acc;
        }, [])
      }
      return this.documents
    },
    documentsCategories() {
      return this.searchedDocuments.filter(item => item.type === 'category');
    },
    documentsSeparated() {
      return this.searchedDocuments.filter(item => item.type === 'document-item');
    },
    searchingProcess() {
      return !!(this.searchInput.value)
    }
  },

  created() {
    this.documents = DOCUMENTS.map(item => {
      if(item.type === 'category') {
        item.maxHeight = '35px';
        item.dragenter = false;
      }

      return item;
    })
  },

  methods: {
    updateValue(newValue) {
      this.searchInput.value = newValue;
    },
    clearInput() {
      this.searchInput.value = '';
    },
    toggleDocumentsShow(id) {
      const actualItem = this.documents.find(item => item.id === id);

      actualItem ? actualItem.opened = !actualItem.opened : '';
    },
    searchTextStatus(searchedText, text) {
      return text.toLowerCase().indexOf(searchedText.toLowerCase());
    },
    hideDocuments() {
      this.documents.forEach(item => item.opened ? item.opened = false : '');
    },
    showDocuments(id) {
      const actualElement = this.documents.find(item => item.id === id);

      actualElement ? actualElement.opened = true : '';
    },
    categoriesStart() {
      this.hideDocuments();
      this.clearDragenter();
      this.categoriesMoving = true;
    },
    categoriesEnd() {
      this.clearDragenter();
      this.categoriesMoving = false;
    },

    addInCategoryDocuments({ pullMode, newIndex, }, index) {
      let elIndex = index;

      if(this.searchingProcess) {
        const actualElement = this.searchedDocuments[index];
        this.documents.indexOf(actualElement) !== -1 ? elIndex = this.documents.indexOf(actualElement) : ''
      }

      if(pullMode) this.documents[elIndex].data.splice(newIndex, 0, this.actualElementData);
    },
    removeCategoryDocuments({ pullMode, oldIndex }, index) {
      if(pullMode) this.documents[index].data.splice(oldIndex, 1);
    },
    chooseCategoryDocuments({ oldIndex }, parentIndex) {
      this.actualElementData = this.documents[parentIndex].data[oldIndex];
    },
    moveCategoryDocuments({ pullMode, oldIndex, newIndex }, index) {
      if(!pullMode) {
        const item = this.documents[index].data.splice(oldIndex, 1);
        this.documents[index].data.splice(newIndex, 0, item[0]);
      }

      this.clearDragenter();
    },
    addInSeparateDocument({ pullMode, newIndex }) {
      if(pullMode) {
        if(newIndex >= this.documentsSeparated.length) {
          this.documents.push(this.actualElementData);

          return;
        }

        const actualIndex = this.documents.indexOf(this.documentsSeparated[newIndex]);
        this.documents.splice(actualIndex, 0, this.actualElementData);
      }
    },
    removeSeparateDocument({ pullMode }) {
      if(pullMode) {
        const elementIndex = this.documents.indexOf(this.actualElementData);

        if(elementIndex !== -1) this.documents.splice(elementIndex, 1);
      }
    },
    chooseSeparate({ oldIndex }) {
      const elementIndex = this.documents.indexOf(this.documentsSeparated[oldIndex]);

      if(elementIndex !== -1) {
        this.actualElementData = this.documents[elementIndex];
      }
    },
    moveSeparate({ pullMode, oldIndex, newIndex }) {
      const oldElement = this.documentsSeparated[oldIndex];
      const newElement = this.documentsSeparated[newIndex];

      const oldElementIndex = this.documents.indexOf(oldElement);
      const newElementIndex = this.documents.indexOf(newElement);

      if(!pullMode) {
        const item = this.documents.splice(oldElementIndex, 1);
        this.documents.splice(newElementIndex, 0, item[0]);
      }

      this.clearDragenter();
    },

    documentsDragenter(event, index) {
      this.documents[index].dragenter = true;
    },
    clearDragenter() {
      this.documents.forEach(item => item.dragenter ? item.dragenter = false : '');
    },
  },
}
</script>

<style lang="scss" scoped>
.view-home {
  padding-top: 33px;
}

.view-home__search-input-section {
  margin-top: 23px;
}

.view-home__search-input {
  width: 564px;
  display: inline-block;

  @media (max-width: 600px) {
    width: 100%;
  }
}

.view-home__documents-container {
  max-width: 1190px;
  margin-top: 17px;

  @media (max-width: 1220px) {
    max-width: 1160px;
  }
}

.view-home__document-item {

  &:not(:first-child) {
    margin-top: -1px;
  }

  &_separate {
    height: 35px;
  }
}

.view-home__documents-separate {
  margin-top: 14px;
}

.view-home__separated-document-item {


  &:not(:first-child) {
    margin-top: -1px;
  }
}

::v-deep .sortable-chosen {
  //opacity: 0.2;
  margin-right: -16px;
  margin-left: 16px;
  & .document-item__action-item_draggable {
    path {
      fill: #0066FF;
    }
  }
}

::v-deep .on-drag {
  box-shadow: 0 3px 16px rgba(0, 102, 255, 0.7);
}
</style>
