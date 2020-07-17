<template>
  <v-card v-if="isObject" style="margin: 1em;">
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
      <DataEditor v-for="(prop, name) in inlinedSchema.properties" :schema="prop" :name="name" :key="name"
                  ref="editor"></DataEditor>
      <ConditionalEditor v-for="cond in inlinedSchema.allOf" :schema="cond" :key="JSON.stringify(cond)"
                         ref="conditional">
        <DataEditor v-for="(prop, name) in allProps(cond)" :schema="prop" :name="name" :key="name" ref="editor"/>
      </ConditionalEditor>
    </v-card-text>
  </v-card>
  <v-card ref="arr" v-else-if="isArray" style="margin: 1em;">
    <v-card-title>{{ name }}</v-card-title>
    <v-card-text>
      <DataEditor v-for="(prop, name) in inlinedSchema.properties" :schema="prop" :name="name" :key="name"
                  ref="editor"></DataEditor>
    </v-card-text>
  </v-card>
  <div v-else-if="isBoolean">
    <v-checkbox v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint></v-checkbox>
  </div>
  <div v-else-if="isEnum">
    <v-combobox :items="enums" v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint
                    dense></v-combobox>
  </div>
  <div v-else-if="isString">
    <v-text-field v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint dense></v-text-field>
  </div>
  <div v-else-if="isNumber">
    <v-text-field v-model="data" :label="name" type="number" :hint="inlinedSchema.description"
                  persistent-hint></v-text-field>
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
import ConditionalEditor from "@/components/ConditionalEditor";

export default {
  name: 'DataEditor',
  components: {ConditionalEditor},
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
        for (const i in this.$refs.conditional) {
          let d = this.$refs.conditional[i].getData();
          console.log(d);
          if (d !== undefined) {
            Object.assign(this.data, d);
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
    },
    allProps(schema) {
      if (schema.then.allOf) {
        let result = {};
        for (const i in schema.then.allOf) {
          Object.assign(result, schema.then.allOf[i].properties);
        }
        return result;
      }
      return schema.then.properties;
    }
  },
  data: () => ({
    show: false,
    data: undefined
  }),
  computed: {
    inlinedSchema() {
      if (this.schema["$ref"]) {
        return Object.assign({}, this.schema, resolvePath(fullScheme, this.schema["$ref"]));
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
    isEnum() {
      return this.inlinedSchema.enum;
    },
    isBoolean() {
      return this.inlinedSchema.type === "boolean";
    },
    isNumber() {
      return this.inlinedSchema.type === "integer" || this.inlinedSchema.type === "number" || this.inlinedSchema.type === "decimal";
    },
    enums() {
      if (!this.isEnum) {
        return [];
      }
      let collected = this.inlinedSchema.enum || [];
      for (const key in this.inlinedSchema) {
        if (this.inlinedSchema[key] instanceof Object && this.inlinedSchema[key].anyOf) {
          collected = collected.concat(this.inlinedSchema[key].anyOf.map(value => value.const))
        }
      }
      return collected;
    }
  },
  props: {
    schema: Object,
    name: String
  }
}
</script>
