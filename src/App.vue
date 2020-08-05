<template>
  <div id="app">
    <v-app id="inspire">
      <v-app-bar app clipped-right color="blue-grey" dark>
        <v-btn v-if="currentComponentGroup !== null" @click="goBack()" icon>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title>behavior-builder</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="clearAll()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-dialog v-model="dialog" ref="dialog" width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
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
              <json-viewer :value="entity" :expand-depth=5></json-viewer>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-app-bar>

      <v-main>
        <v-snackbar v-model="snackbar" multi-line top color="red" timeout="-1">
          {{ errorMessage }}
          <template v-slot:action="{ attrs }">
            <v-btn dark text v-bind="attrs" @click="snackbar = false;errorMessage = null">
              Close
            </v-btn>
          </template>
        </v-snackbar>
        <BehaviorOverview v-if="!currentComponentGroup" :loaded="entity" v-on:change="entity = $event"
                          v-on:open="showComponentGroup($event)" v-on:error="showErrorMessage($event)"/>
        <EditBehavior ref="editBehavior" v-if="currentComponentGroup" :group-name="currentComponentGroupName"
                      :loaded="currentComponentGroup" v-on:error="showErrorMessage($event)"/>
      </v-main>

      <v-footer app color="blue-grey" class="white--text">
        <v-spacer></v-spacer>
        <span>&copy; Piotr "stirante" Brzozowski {{ new Date().getFullYear() }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<style>

.scrollable {
  overflow-y: auto;
  max-height: calc(100vh - 124px);
}
</style>

<script>
import JsonViewer from 'vue-json-viewer'
import stripJsonComments from "strip-json-comments";
import EditBehavior from "@/pages/EditBehavior";
import BehaviorOverview from "@/pages/BehaviorOverview";

export default {
  props: {
    source: String,
  },
  components: {
    BehaviorOverview,
    EditBehavior,
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
  methods: {
    clearAll() {
      this.entity = {
        "format_version": "1.16.0",
        "minecraft:entity": {
          "description": {},
          "component_groups": {},
          "components": {},
          "events": {}
        }
      };
      this.dialog = false;
      this.snackbar = false;
      this.errorMessage = "";
      this.currentComponentGroup = null;
      this.currentComponentGroupName = null;
    },
    goBack() {
      let componentGroup = this.$refs.editBehavior.getData();
      let groupName = this.currentComponentGroupName;
      if (groupName) {
        this.entity["minecraft:entity"].component_groups[groupName] = componentGroup;
      } else {
        this.entity["minecraft:entity"].components = componentGroup;
      }
      this.currentComponentGroup = null;
      this.currentComponentGroupName = null;
    },
    copyJson() {
      let element = this.$refs.textarea.$el.querySelector('textarea');
      element.select();
      element.setSelectionRange(0, this.entityJson.length);
      document.execCommand("copy");
    },
    showComponentGroup(groupName) {
      this.currentComponentGroupName = groupName;
      if (groupName) {
        this.currentComponentGroup = this.entity["minecraft:entity"].component_groups[groupName];
      } else {
        this.currentComponentGroup = this.entity["minecraft:entity"].components;
      }
    },
    showErrorMessage(msg) {
      this.snackbar = true;
      this.errorMessage = msg;
    },
    load(jsonFile) {
      this.snackbar = false;
      this.entity = jsonFile;
      this.errorMessage = "";
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
        reader.onload = function (e) {
          ctx.load(JSON.parse(stripJsonComments(e.target.result)));
        };

        reader.readAsText(f);
      }
    }
  },
  computed: {
    entityJson() {
      return JSON.stringify(this.entity, null, 2);
    }
  },
  data: () => ({
    dialog: false,
    entity: {
      "format_version": "1.16.0",
      "minecraft:entity": {
        "description": {},
        "component_groups": {},
        "components": {},
        "events": {}
      }
    },
    errorMessage: null,
    snackbar: false,
    currentComponentGroup: null,
    currentComponentGroupName: null
  })
}

</script>
