<!--suppress JSUnfilteredForInLoop -->
<template>
  <v-container class="fill-height" fluid>
    <v-row class="fill-height">
      <v-col class="col-4">
        <v-card>
          <v-card-title>Entity description</v-card-title>
          <v-card-text>
            <v-text-field v-model="identifier" label="Identifier"/>
            <v-checkbox v-model="is_spawnable" label="Spawnable"/>
            <v-checkbox v-model="is_summonable" label="Summonable"/>
            <v-checkbox v-model="is_experimental" label="Experimental"/>
            <v-combobox :items="runtimeIdentifiers" v-model="runtime_identifier" label="Runtime identifier"
                        persistent-hint
                        hint="Used to imitate a vanilla entity's hard-coded elements. It accepts Vanilla Minecraft identifiers."></v-combobox>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="col-8">
        <v-card>
          <v-card-title>
            Component groups
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" ref="dialog" width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Add new component group</span>
                </v-card-title>
                <v-card-text>
                  <v-text-field label="Name" v-model="newGroupName" required/>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false;newGroupName = ''">Cancel</v-btn>
                  <v-btn color="blue darken-1" text @click="dialog = false;addComponentGroup()">Add</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-title>
          <v-card-text>
            <v-list two-line>
              <v-list-item
                  v-for="group in componentGroups"
                  :key="group.name"
                  @click="openComponentGroup(group.name)"
              >
                <v-list-item-content>
                  <v-list-item-title v-bind:class="{'root-group': isRootGroup(group.name)}"
                                     v-text="group.label"></v-list-item-title>
                  <v-list-item-subtitle v-text="group.components"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn v-if="!isRootGroup(group.name)" icon @click.stop="removeComponentGroup(group.name)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>

.root-group {
  font-weight: 700;
}

</style>

<script>

import {fullSchema} from "@/Schema";
import Vue from "vue";

export default {
  name: 'BehaviorOverview',
  props: {
    loaded: Object,
  },
  watch: {
    loaded: function (newVal) {
      this.entity = newVal;
    }
  },
  components: {},
  beforeMount() {
    this.entity = this.loaded;
  },
  computed: {
    runtimeIdentifiers() {
      return fullSchema.definitions.library.entities.examples;
    },
    componentGroups() {
      let result = [];
      result.push({
        "label": "Root",
        "name": "",
        "components": this.getComponentGroupDescription("")
      });
      for (const groupName in this.entity["minecraft:entity"].component_groups) {
        result.push({
          "label": groupName,
          "name": groupName,
          "components": this.getComponentGroupDescription(groupName)
        })
      }
      return result;
    },
    identifier: {
      get: function () {
        return this.entity["minecraft:entity"].description.identifier;
      },
      set: function (newValue) {
        this.entity["minecraft:entity"].description.identifier = newValue;
        this.emitChanges();
      }
    },
    is_spawnable: {
      get: function () {
        return this.entity["minecraft:entity"].description.is_spawnable;
      },
      set: function (newValue) {
        this.entity["minecraft:entity"].description.is_spawnable = newValue;
        this.emitChanges();
      }
    },
    is_summonable: {
      get: function () {
        return this.entity["minecraft:entity"].description.is_summonable;
      },
      set: function (newValue) {
        this.entity["minecraft:entity"].description.is_summonable = newValue;
        this.emitChanges();
      }
    },
    is_experimental: {
      get: function () {
        return this.entity["minecraft:entity"].description.is_experimental;
      },
      set: function (newValue) {
        this.entity["minecraft:entity"].description.is_experimental = newValue;
        this.emitChanges();
      }
    },
    runtime_identifier: {
      get: function () {
        return this.entity["minecraft:entity"].description.runtime_identifier;
      },
      set: function (newValue) {
        this.entity["minecraft:entity"].description.runtime_identifier = newValue;
        if (newValue === "") {
          Vue.delete(this.entity["minecraft:entity"].description, "runtime_identifier");
        }
        this.emitChanges();
      }
    }
  },
  methods: {
    addComponentGroup() {
      if (!this.newGroupName) {
        this.$emit("error", "You can't add component group without name!");
        return;
      }
      Vue.set(this.entity["minecraft:entity"].component_groups, this.newGroupName, {});
      this.newGroupName = "";
      this.emitChanges();
    },
    removeComponentGroup(compName) {
      Vue.delete(this.entity["minecraft:entity"].component_groups, compName);
      this.emitChanges();
    },
    emitChanges() {
      this.$emit("change", this.entity);
    },
    openComponentGroup(groupName) {
      this.$emit("open", groupName);
    },
    getComponentGroupDescription(groupName) {
      let result = [];
      if (groupName) {
        for (const componentId in this.entity["minecraft:entity"].component_groups[groupName]) {
          result.push(componentId);
        }
      } else {
        for (const componentId in this.entity["minecraft:entity"].components) {
          result.push(componentId);
        }
      }
      return result.join(", ");
    },
    isRootGroup(groupName) {
      return !groupName;
    }
  },
  data: () => ({
    entity: {},
    dialog: false,
    newGroupName: ""
  })
}

</script>
