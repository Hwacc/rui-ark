<script setup lang="ts">
import { Slider } from '@rui-ark/vue-core/components/slider'
import { ref } from 'vue'

const value = ref([0])
</script>

<template>
  <Slider v-model="value" />
</template>
