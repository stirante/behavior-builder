<!--suppress JSUnfilteredForInLoop -->
<template>
  <v-card v-if="isObject" style="margin: 1em;">
    <v-card-title>
      <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      {{ name }}
    </v-card-title>
    <v-card-text>
      <div v-for="prop in allProps" :key="prop.name">
        <DataEditor v-if="!prop.condition" :schema="prop.value" :name="prop.name" ref="editor"></DataEditor>
        <ConditionalEditor v-if="prop.condition" :schema="prop.condition" ref="conditional">
          <DataEditor v-for="(schema, name) in prop.value" :schema="schema" :name="name" :key="name" ref="editor"/>
        </ConditionalEditor>
      </div>
    </v-card-text>
  </v-card>
  <v-card ref="arr" v-else-if="isArray" style="margin: 1em;">
    <v-card-title>
      <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      {{ name }}
    </v-card-title>
    <v-card-text>
      <DataEditor v-for="n in items" :schema="inlinedItemSchema" :key="n" :index="n" ref="editor"
                  v-on:remove-item="removeItem(n)"></DataEditor>
      <v-btn @click="items.push(itemIdCounter++)">Add</v-btn>
    </v-card-text>
  </v-card>
  <div style="display: flex;" v-else-if="isBoolean">
    <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-checkbox v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint></v-checkbox>
  </div>
  <div style="display: flex;" v-else-if="isEnum">
    <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-combobox :items="enums" v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint
                dense></v-combobox>
  </div>
  <div style="display: flex;" v-else-if="isString">
    <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-text-field v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint dense></v-text-field>
  </div>
  <div style="display: flex;" v-else-if="isNumber">
    <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-text-field v-model="data" :label="name" type="number" :hint="inlinedSchema.description"
                  persistent-hint></v-text-field>
  </div>
  <div style="display: flex;" v-else-if="isNumber">
    <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-text-field v-model="data" :label="name" type="number" :hint="inlinedSchema.description"
                  persistent-hint></v-text-field>
  </div>
  <div style="display: flex;" v-else>
    <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-text-field v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint></v-text-field>
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
      if (this.isArray) {
        this.data = [];
        for (const i in this.$refs.editor) {
          let d = this.$refs.editor[i].getData();
          if (d !== undefined) {
            this.data.push(d);
          }
        }
        if (this.data.length === 0) {
          return undefined;
        }
      }
      return this.data;
    },
    conditionProps(schema) {
      if (schema.then.allOf) {
        let result = {};
        for (const i in schema.then.allOf) {
          Object.assign(result, schema.then.allOf[i].properties);
        }
        return result;
      }
      return schema.then.properties;
    },
    removeItem(n) {
      console.log(n);
      this.items.splice(this.items.indexOf(n), 1);
    }
  },
  data: () => ({
    show: false,
    data: undefined,
    items: [],
    itemIdCounter: 0
  }),
  computed: {
    inlinedSchema() {
      if (this.schema["$ref"]) {
        return Object.assign({}, this.schema, resolvePath(fullScheme, this.schema["$ref"]));
      }
      //TODO: support "anyOf" schema
      //For now, dirty fix
      if (this.schema.anyOf && !this.schema.properties) {
        return Object.assign({}, this.schema, this.schema.anyOf[0]);
      }
      return this.schema;
    },
    inlinedItemSchema() {
      if (!this.isArray) return {};
      let result;
      if (this.schema.items instanceof Array) result = this.schema.items[0];
      else result = this.schema.items;
      if (!result.type && !result['$ref'] && result.default) {
        if (typeof (result.default[0]) === "number") return {"type": "number"};
        if (typeof (result.default[0]) === "string") return {"type": "string"};
      }
      if (result['$ref']) {
        return Object.assign({}, result, resolvePath(fullScheme, result['$ref']));
      }
      return result;
    },
    allProps() {
      let result = [];
      for (const name in this.inlinedSchema.properties) {
        result.push({"name": name, "value": this.inlinedSchema.properties[name]});
      }
      for (const name in this.inlinedSchema.allOf) {
        let index = result.length;
        for (let i = 0; i < result.length; i++) {
          if (result[i].name === Object.keys(this.inlinedSchema.allOf[name].if.properties)[0]) {
            index = i;
            break;
          }
        }
        result.splice(index + 1, 0, {
          "name": name,
          "condition": this.inlinedSchema.allOf[name],
          "value": this.conditionProps(this.inlinedSchema.allOf[name])
        });
      }

      return result;
    },
    isObject() {
      return this.inlinedSchema.type === "object" || this.inlinedSchema.properties;
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
    name: String,
    index: Number
  }
}
</script>
