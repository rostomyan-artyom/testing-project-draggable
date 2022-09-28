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
        @start="hideDocuments"
      >
        <DocumentSection
          v-for="documentSection in documentsCategories"
          :key="documentSection.id"
          :documents="documents"
          :documentsElement="documentSection"
          class="view-home__document-item"
          @toggleDocumentsShow="toggleDocumentsShow(documentSection.id)"
          @showDocuments="showDocuments(documentSection.id)"
        />
      </Draggable>

      <Draggable
        handle=".document-item__action-item_draggable"
        ghostClass="on-drag"
        group="documents"
        animation="400"
        class="view-home__documents-separate"
        @add="add"
        @remove="remove"
        @update="update"
        @choose="choose"
        @unchoose="unchoose"
        @sort="sort"
        @filter="filter"
        @clone="clone"
        @end="move"
      >
        <DocumentItem
          v-for="documentItem in documentsSeparated"
          :key="documentItem.id"
          class="view-home__document-item view-home__document-item_separate"
        >
          <template v-slot:title-little>
            {{ documentItem.name }}
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

  data() {
    return  {
      documents: [],
      searchInput: {
        placeholder: 'Поиск',
        value: '',
        focused: false,
      },
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
              const findSearchInDocumentsName =  item.data.find(item => {
                return this.searchTextStatus(searchedValue, item.name) !== -1;
              })

              if(findSearchInDocumentsName) acc.push(item);
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
  },

  mounted() {
    this.documents = DOCUMENTS.map(item => {
      item.type === 'category' ? item.maxHeight = '0px' : '';

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
    move(data) {
      console.log(data);
    },
    add() {
      console.log('add');
    },
    remove() {
      console.log('remove');
    },
    update() {
      console.log('update');
    },
    choose() {
      console.log('choose');
    },
    unchoose() {
      console.log('unchoose');
    },
    sort(data) {
      console.log(data);
    },
    filter() {
      console.log('filter');
    },
    clone() {
      console.log('clone');
    },
  },
}
</script>

@<style lang="scss" scoped>
.view-home {
  padding-top: 33px;
}

.view-home__search-input-section {
  margin-top: 23px;
}

.view-home__search-input {
  width: 564px;
  display: inline-block;
}

.view-home__documents-container {
  width: 1160px;
  margin-top: 17px;
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
