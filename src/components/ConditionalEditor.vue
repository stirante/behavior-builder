<!--suppress JSUnfilteredForInLoop -->
<template>
  <div v-if="isTrue">
    <slot/>
  </div>
</template>

<style>
</style>

<script>

import {resolvePath} from "@/SchemaUtils";
import {fullScheme} from "@/MinecraftComponent";

export default {
  name: 'ConditionalEditor',
  methods: {
    getData() {
      this.data = {};
      for (const i in this.$refs.editor) {
        let d = this.$refs.editor[i].getData();
        if (d !== undefined) {
          this.data[this.$refs.editor[i].name] = d;
        }
      }
    }
  },
  data: () => ({}),
  computed: {
    isTrue() {
      let fields = this.$parent.$children;
      let condition = this.schema.if.properties;
      for (const prop in condition) {
        let fieldEditor = fields.filter(value => value.name === prop)[0];
        if (!fieldEditor || !fieldEditor.getData()) return false;
        let conditionValue = condition[prop];
        if (conditionValue['$ref']) {
          let acceptable = resolvePath(fullScheme, conditionValue['$ref']).anyOf.map(value => value.const);
          return acceptable.indexOf(fieldEditor.getData()) !== -1;
        }
        if (conditionValue.anyOf) {
          let acceptable = conditionValue.anyOf.map(value => value.const);
          return acceptable.indexOf(fieldEditor.getData()) !== -1;
        }
      }
      return false;
    },
    allProps() {
      if (this.schema.then.allOf) {
        let result = {};
        for (const i in this.schema.then.allOf) {
          Object.assign(result, this.schema.then.allOf[i].properties);
        }
        return result;
      }
      return this.schema.then.properties;
    }
  },
  props: {
    schema: Object
  }
}
</script>
