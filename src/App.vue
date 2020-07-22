<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-app-bar
            app
            clipped-right
            color="blue-grey"
            dark
        >
          <v-toolbar-title>behavior-builder</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" ref="dialog" width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn @click="updateEntityJson()" icon
                     v-bind="attrs"
                     v-on="on">
                <v-icon>mdi-code-json</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Behavior JSON</span>
              </v-card-title>
              <v-card-text>
                <div style="display: flex">
                  <v-textarea :value="entityJson" ref="textarea" dense rows="1"/>
                  <v-btn @click="copyJson()" icon>
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </div>
                <json-viewer :value="data" :expand-depth=5></json-viewer>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-app-bar>

        <v-main>
          <v-snackbar
              v-model="snackbar"
              multi-line
              top
              color="red"
              timeout="-1"
          >
            {{ errorMessage }}
            <template v-slot:action="{ attrs }">
              <v-btn
                  dark
                  text
                  v-bind="attrs"
                  @click="snackbar = false;errorMessage = null"
              >
                Close
              </v-btn>
            </template>
          </v-snackbar>
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
                    <EntityComponent v-for="comp in filteredComponentLibrary" :key="comp.id" :comp="comp" read-only>
                    </EntityComponent>
                  </transition-group>
                </draggable>
              </v-col>
              <v-col class="col-9 scrollable">
                <draggable
                    handle=".handle"
                    class="fill-height"
                    :list="entity"
                    v-bind="dragOptions"
                    group="library"
                    @start="drag = true"
                    @end="drag = false">
                  <transition-group ref="entityComponents" class="fill-height" type="transition"
                                    :name="!drag ? 'flip-list' : null" tag="div">
                    <EntityComponent v-for="comp in entity" :key="comp.uniqueId" :comp="comp"
                                     v-on:remove-component="removeComponent(comp)">
                    </EntityComponent>
                  </transition-group>
                </draggable>
              </v-col>
            </v-row>
          </v-container>
        </v-main>

        <v-footer
            app
            color="blue-grey"
            class="white--text"
        >
          <v-spacer></v-spacer>
          <span>&copy; Piotr "stirante" Brzozowski {{ new Date().getFullYear() }}</span>
        </v-footer>
      </v-app>
    </v-app>
  </div>
</template>

<style>

.component-column {
  min-width: 20em;
}

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
import EntityComponent from "@/components/EntityComponent";
import {componentLibrary, componentList} from "./MinecraftComponent"
import JsonViewer from 'vue-json-viewer'
import stripJsonComments from "strip-json-comments";

export default {
  props: {
    source: String,
  },
  components: {
    EntityComponent,
    draggable,
    JsonViewer
  },
  beforeMount() {
    let dropZone = document.getElementsByTagName('body')[0];
    let ctx = this;
    dropZone.addEventListener('dragover', function (evt) {
      ctx.handleDragOver(evt);
    }, false);
    dropZone.addEventListener('drop', function (evt) {
      ctx.handleJSONDrop(evt);
    }, false);
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
      for (let i = 0; i < this.entity.length; i++) {
        if (this.entity[i].uniqueId === comp.uniqueId) {
          this.entity.splice(i, 1);
        }
      }
    },
    cloneComponent({id}) {
      return componentLibrary[id].clone();
    },
    updateEntityJson() {
      if (!this.$refs.entityComponents) return "";
      let data = {};
      for (const child in this.$refs.entityComponents.$children) {
        let vue = this.$refs.entityComponents.$children[child];
        data[vue.comp.id] = vue.getData();
      }
      this.data = data;
      this.entityJson = JSON.stringify(data, null, 2);
    },
    copyJson() {
      let element = this.$refs.textarea.$el.querySelector('textarea');
      element.select();
      element.setSelectionRange(0, 99999);
      document.execCommand("copy");
    },
    loadBehavior(behaviors) {
      this.snackbar = false;
      this.data = behaviors;
      this.entity = [];
      this.errorMessage = "";
      for (const key in behaviors) {
        if (!componentLibrary[key]) {
          this.errorMessage += "\nUndefined component \"" + key + "\"!";
          continue;
        }
        let items = componentLibrary[key].clone();
        items.data = behaviors[key];
        this.entity.push(items);
        if (this.errorMessage && this.errorMessage !== "") {
          this.snackbar = true;
        }
      }
    },
    handleDragOver(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'copy';
    },
    handleJSONDrop(evt) {
      evt.stopPropagation();
      evt.preventDefault();
      let files = evt.dataTransfer.files;
      for (let i = 0; files.length; i++) {
        let f = files[i];
        if (!f) {
          return;
        }
        if (!f.type.match('application/json')) {
          continue;
        }

        let reader = new FileReader();
        let ctx = this;
        reader.onload = (function () {
          return function (e) {
            let p = JSON.parse(stripJsonComments(e.target.result));
            ctx.loadBehavior(p["minecraft:entity"].components);
          };
        })(f);

        reader.readAsText(f);
      }
    }
  },
  data: () => ({
    componentLibrary: componentList,
    entity: [],
    drag: false,
    console: console,
    filter: "",
    dialog: false,
    entityJson: "",
    data: {},
    errorMessage: null,
    snackbar: false
  })
}

</script>
