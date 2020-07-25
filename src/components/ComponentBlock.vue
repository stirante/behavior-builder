<template>
  <v-card class="component-item" ref="card">
    <v-card-title class="component-item handle">
      <v-btn icon @click="$emit('remove-component')" v-if="!readOnly.valueOf()">
        <v-icon color="white">mdi-close</v-icon>
      </v-btn>
      <span class="component-name">{{ comp.id }}</span>
      <v-btn icon @click="show = !show" v-if="!readOnly.valueOf() && comp.hasProperties()" right>
        <v-icon color="white">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-subtitle class="component-item-subtitle handle" v-if="readOnly.valueOf()">
      {{ comp.description }}
    </v-card-subtitle>
    <v-expand-transition v-if="!readOnly.valueOf()" v-show="comp.hasProperties()">
      <div v-show="show">
        <v-card-text>
          <DataEditor ref="editor" name="" :schema="comp.schema" :loaded="comp.data"></DataEditor>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<style>
.component-item {
  background: #607d8b;
  color: white;
  margin-bottom: 0.5em;
}

.component-item-subtitle {
  color: white !important;
  background: #607d8b;
}

.handle {
  cursor: grab;
}

.component-name {
  flex-grow: 1;
}
</style>

<script>
import {EntityComponent} from "@/EntityComponent";
import DataEditor from "@/components/DataEditor";

export default {
  name: 'ComponentBlock',
  components: {DataEditor},
  mounted() {
    this.$refs.card.$el.onmouseup = this.onCardClick;
  },
  methods: {
    getData() {
      return this.$refs.editor.getData();
    },
    onCardClick(e) {
      if (!this.readOnly.valueOf() && e && (e.which === 2 || e.button === 4)) {
        this.$emit('remove-component');
      }
    }
  },
  data: () => ({
    show: false
  }),
  props: {
    comp: EntityComponent,
    readOnly: Boolean
  }
}
</script>
