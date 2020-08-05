<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="col-3 scrollable">
        <v-text-field label="Filter" prepend-inner-icon="mdi-filter" v-model="filter" clearable
                      v-on:click:clear="filter = ''"></v-text-field>
        <draggable
            handle=".handle"
            :list="filteredComponentLibrary"
            v-bind="dragOptions"
            :clone="cloneComponent"
            :group="{ name: 'library', pull: 'clone', put: false }"
            @start="drag = true"
            @end="drag = false">
          <transition-group class="fill-height" type="transition" :name="!drag ? 'flip-list' : null" tag="div">
            <ComponentBlock v-for="comp in filteredComponentLibrary" :key="comp.id" :comp="comp" read-only>
            </ComponentBlock>
          </transition-group>
        </draggable>
      </v-col>
      <v-col class="col-9 scrollable">
        <draggable
            handle=".handle"
            class="fill-height"
            :list="components"
            v-bind="dragOptions"
            group="library"
            @start="drag = true"
            @end="drag = false">
          <transition-group ref="entityComponents" class="fill-height" type="transition"
                            :name="!drag ? 'flip-list' : null" tag="div">
            <ComponentBlock v-for="comp in components" :key="comp.uniqueId" :comp="comp"
                            v-on:remove-component="removeComponent(comp)">
            </ComponentBlock>
          </transition-group>
        </draggable>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.flip-list-move {
  transition: transform 0.5s;
}

.ghost {
  opacity: 0.5;
}

.scrollable {
  overflow-y: auto;
  max-height: calc(100vh - 124px);
}
</style>

<script>
import draggable from "vuedraggable";
import ComponentBlock from "@/components/ComponentBlock";
import {componentLibrary, componentList, loadComponentData, processData} from "@/Schema"

export default {
  name: 'EditBehavior',
  props: {
    loaded: Object,
    groupName: String
  },
  components: {
    ComponentBlock,
    draggable
  },
  beforeMount() {
    this.load(this.loaded);
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost"
      };
    },
    filteredComponentLibrary() {
      if (!this.filter || this.filter === "") {
        return componentList;
      }
      return componentList.filter(value => value.id.toLowerCase().indexOf(this.filter.toLowerCase()) !== -1);
    }
  },
  methods: {
    removeComponent(comp) {
      for (let i = 0; i < this.components.length; i++) {
        if (this.components[i].uniqueId === comp.uniqueId) {
          this.components.splice(i, 1);
        }
      }
    },
    cloneComponent({id}) {
      return componentLibrary[id].clone();
    },
    load(jsonData) {
      let errorMessage = "";
      this.components = loadComponentData(jsonData, function (msg) {
        errorMessage += msg;
      });
      this.data = jsonData;
      if (errorMessage && errorMessage !== "") {
        this.$emit("error", errorMessage)
      }
    },
    getData() {
      if (!this.$refs.entityComponents) return "";
      let data = {};
      for (const child in this.$refs.entityComponents.$children) {
        let vue = this.$refs.entityComponents.$children[child];
        data[vue.comp.id] = vue.getData();
      }
      this.data = processData(data);
      return this.data;
    }
  },
  data: () => ({
    componentLibrary: componentList,
    components: [],
    drag: false,
    filter: "",
    data: {}
  })
}

</script>
