<!--suppress JSUnfilteredForInLoop -->
<template>
  <v-card v-if="isObject && !root" style="margin: 1em;">
    <v-card-title>
      <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      {{ name }}
    </v-card-title>
    <v-card-text>
      <v-radio-group v-model="versionIndex" row v-if="schemaVersions.length > 0">
        <v-radio v-for="(version, index) in schemaVersions" :label="'Version ' + index" :value="index"
                 :key="index"></v-radio>
      </v-radio-group>
      <div v-for="prop in allProps" :key="prop.name">
        <DataEditor v-if="!prop.condition" :schema="prop.value" :name="prop.name" :loaded="prop.data"
                    ref="editor"></DataEditor>
        <ConditionalEditor v-if="prop.condition" :schema="prop.condition" ref="conditional">
          <DataEditor v-for="(schema, name) in prop.value" :schema="schema" :name="name" :key="name" :loaded="prop.data"
                      ref="editor"/>
        </ConditionalEditor>
      </div>
    </v-card-text>
  </v-card>
  <div v-else-if="isObject && root">
    <v-radio-group v-model="versionIndex" row v-if="schemaVersions.length > 0">
      <v-radio v-for="(version, index) in schemaVersions" :label="'Version ' + index" :value="index"
               :key="index"></v-radio>
    </v-radio-group>
    <div v-for="prop in allProps" :key="prop.name">
      <DataEditor v-if="!prop.condition" :schema="prop.value" :name="prop.name" :loaded="prop.data"
                  ref="editor"></DataEditor>
      <ConditionalEditor v-if="prop.condition" :schema="prop.condition" ref="conditional">
        <DataEditor v-for="(schema, name) in prop.value" :schema="schema" :name="name" :key="name" :loaded="prop.data"
                    ref="editor"/>
      </ConditionalEditor>
    </div>
  </div>
  <v-card ref="arr" v-else-if="isArray" style="margin: 1em;">
    <v-card-title>
      <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
        <v-icon>mdi-close</v-icon>
      </v-btn>
      {{ name }}
      <v-spacer></v-spacer>
      <v-btn icon @click="items.push({id: itemIdCounter++, data:null})">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <DataEditor v-for="item in items" :schema="inlinedItemSchema" :key="item.id" :index="item.id" :loaded="item.data"
                  ref="editor"
                  v-on:remove-item="removeItem(item.id)"></DataEditor>
    </v-card-text>
  </v-card>
  <div style="display: flex;" v-else-if="isBoolean">
    <v-btn v-if="index !== undefined" @click="$emit('remove-item', index)" icon>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-checkbox :false-value="false" :true-value="true" :indeterminate="data === void 0" v-model="data" :label="name" :hint="inlinedSchema.description" persistent-hint></v-checkbox>
  </div>
  <div style="display: flex;" v-else-if="isConst">
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
    <v-text-field v-model.number="data" :label="name" type="number" :hint="inlinedSchema.description"
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
import {resolvePath} from "@/Schema";
import ConditionalEditor from "@/components/ConditionalEditor";

export default {
  name: 'DataEditor',
  components: {ConditionalEditor},
  beforeMount() {
    if (this.loaded !== void 0)
      this.data = this.loaded;

    if (this.isArray) {
      let nItems = [];
      if (this.data instanceof Array) {
        for (let i = 0; i < this.data.length; i++) {
          nItems.push({id: this.itemIdCounter++, data: this.data[i]});
        }
      } else if (this.data) {
        nItems.push({id: this.itemIdCounter++, data: this.data});
      }
      this.items = nItems;
    }
  },
  methods: {
    getData() {
      if (this.isConst) {
        if (this.inlinedSchema.const === void 0) {
          return this.inlinedSchema.enum[0];
        }
        return this.inlinedSchema.const;
      }
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
            let index = this.$refs.editor[i].index;
            for (let j = 0; j < this.items.length; j++) {
              if (this.items[j].id === index) {
                this.items[j].data = d;
                break;
              }
            }
          }
        }
        if (this.data.length === 0) {
          return undefined;
        }
      }
      return this.data;
    },
    conditionProps(schema) {
      //TODO: This might have multiple different properties, we need to handle that
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
      let i;
      for (i = 0; i < this.items.length; i++) {
        if (this.items[i].id === n) {
          break;
        }
      }
      this.items.splice(i, 1);
    }
  },
  data: () => ({
    show: false,
    data: undefined,
    items: [],
    itemIdCounter: 0,
    versionIndex: 0
  }),
  computed: {
    inlinedSchema() {
      if (this.schema["$ref"]) {
        return Object.assign({}, this.schema, resolvePath(this.schema["$ref"]));
      }
      if (this.schema.anyOf && !this.schema.properties) {
        return Object.assign({}, this.schema, this.schema.anyOf[this.versionIndex]);
      }
      return this.schema;
    },
    inlinedItemSchema() {
      if (!this.isArray) return {};
      let result;
      if (this.schema.items instanceof Array) result = this.schema.items[0];
      else result = this.schema.items;
      if (!result && this.schema.default) {
        if (typeof (this.schema.default[0]) === "number") return {"type": "number"};
        if (typeof (this.schema.default[0]) === "string") return {"type": "string"};
      }
      if (!result.type && !result['$ref'] && result.default) {
        if (typeof (result.default[0]) === "number") return {"type": "number"};
        if (typeof (result.default[0]) === "string") return {"type": "string"};
      }
      if (result['$ref']) {
        return Object.assign({}, result, resolvePath(result['$ref']));
      }
      return result;
    },
    allProps() {
      let result = [];
      for (const name in this.inlinedSchema.properties) {
        result.push({
          "name": name,
          "value": this.inlinedSchema.properties[name],
          "data": this.data ? this.data[name] : null
        });
      }
      for (const name in this.inlinedSchema.allOf) {
        let index = result.length;
        for (let i = 0; i < result.length; i++) {
          if (result[i].name === Object.keys(this.inlinedSchema.allOf[name].if.properties)[0]) {
            index = i;
            break;
          }
        }
        //TODO: This might have multiple properties, we need to handle that
        let prop = this.conditionProps(this.inlinedSchema.allOf[name]);
        result.splice(index + 1, 0, {
          "name": name,
          "condition": this.inlinedSchema.allOf[name],
          "value": prop,
          "data": this.data ? this.data[Object.keys(prop)[0]] : null
        });
      }

      return result;
    },
    isObject() {
      return this.inlinedSchema.type === "object" || (this.inlinedSchema.type instanceof Array && this.inlinedSchema.type[0] === "object") || this.inlinedSchema.properties;
    },
    isArray() {
      return this.inlinedSchema.type === "array" || this.inlinedSchema.type === "list" ||
          (this.inlinedSchema.type instanceof Array && (this.inlinedSchema.type[0] === "array" || this.inlinedSchema.type[0] === "list"));
    },
    isString() {
      return this.inlinedSchema.type === "string" || (this.inlinedSchema.type instanceof Array && this.inlinedSchema.type[0] === "object");
    },
    isEnum() {
      return this.inlinedSchema.enum;
    },
    isBoolean() {
      return this.inlinedSchema.type === "boolean" || (this.inlinedSchema.type instanceof Array && this.inlinedSchema.type[0] === "boolean");
    },
    isNumber() {
      return this.inlinedSchema.type === "integer" || this.inlinedSchema.type === "number" || this.inlinedSchema.type === "decimal" ||
          (this.inlinedSchema.type instanceof Array && (this.inlinedSchema.type[0] === "integer" || this.inlinedSchema.type[0] === "number" || this.inlinedSchema.type[0] === "decimal"));
    },
    isConst() {
      return this.inlinedSchema.const || (this.inlinedSchema.enum && this.inlinedSchema.enum.length === 1);
    },
    schemaVersions() {
      return this.inlinedSchema.anyOf ? this.inlinedSchema.anyOf : [];
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
    index: Number,
    loaded: null,
    root: Boolean
  }
}
</script>
