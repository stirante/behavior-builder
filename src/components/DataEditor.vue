<template>
  <div v-if="isObject">
    <DataEditor v-for="(prop, name) in inlinedSchema.properties" :schema="prop" :name="name" :key="name"
                ref="editor"></DataEditor>
  </div>
  <div ref="arr" v-else-if="isArray">
    <DataEditor v-for="(prop, name) in inlinedSchema.properties" :schema="prop" :name="name" :key="name"
                ref="editor"></DataEditor>
  </div>
  <div v-else-if="isBoolean">
    <v-checkbox v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint></v-checkbox>
  </div>
  <div v-else-if="isString">
    <v-text-field v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint></v-text-field>
  </div>
  <div v-else-if="isNumber">
    <v-text-field v-model="data" :label="name" type="number" :hint="inlinedSchema.description"
                  persistent-hint></v-text-field>
  </div>
  <div v-else>
    <span>Unknown type {{ inlinedSchema.type }}!</span>
  </div>
</template>

<style>
</style>

<script>
import {resolvePath} from "@/SchemaUtils";
import {fullScheme} from "@/MinecraftComponent";

export default {
  name: 'DataEditor',

  methods: {
    getData() {
      if (this.isObject) {
        this.data = {};
        for (const i in this.$refs.editor) {
          let d = this.$refs.editor[i].getData();
          if (d !== undefined) {
            this.data[this.$refs.editor[i].name] = d;
          }
        }
      }
      if (this.isNumber) {
        return this.data ? Number.parseFloat(this.data) : undefined;
      }
      if (this.isString) {
        return this.data && this.data !== "" ? this.data : undefined;
      }
      // if (this.isArray) {
      //   this.data = {};
      //   for (const i in this.$refs.obj.$children) {
      //     this.data[this.$refs.obj.$children[i].name] = this.$refs.obj.$children[i].getData();
      //   }
      // }
      return this.data;
    }
  },
  data: () => ({
    show: false,
    data: undefined
  }),
  computed: {
    inlinedSchema() {
      if (this.schema["$ref"]) {
        return resolvePath(fullScheme, this.schema["$ref"]);
      }
      return this.schema;
    },
    isObject() {
      return this.inlinedSchema.type === "object";
    },
    isArray() {
      return this.inlinedSchema.type === "array" || this.inlinedSchema.type === "list";
    },
    isString() {
      return this.inlinedSchema.type === "string";
    },
    isBoolean() {
      return this.inlinedSchema.type === "boolean";
    },
    isNumber() {
      return this.inlinedSchema.type === "integer" || this.inlinedSchema.type === "number" || this.inlinedSchema.type === "decimal";
    },
  },
  props: {
    schema: Object,
    name: String
  }
}
</script>
