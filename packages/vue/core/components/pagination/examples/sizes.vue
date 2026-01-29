<script setup lang="ts">
import { ref } from 'vue'
import { Pagination } from '../index'

const sm = ref(1)
const base = ref(2)
const lg = ref(3)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hcc">
      sm / base / lg
    </div>

    <div class="w-full max-w-[720px] flex flex-col gap-3 rounded-md border border-h33 p-3">
      <Pagination
        v-model:page="sm"
        :theme="{ size: 'sm' }"
        :count="200"
        :default-page-size="10"
        :sibling-count="1"
      />
      <Pagination
        v-model:page="base"
        :theme="{ size: 'base' }"
        :count="200"
        :default-page-size="10"
        :sibling-count="1"
      />
      <Pagination
        v-model:page="lg"
        :theme="{ size: 'lg' }"
        :count="200"
        :default-page-size="10"
        :sibling-count="1"
      />
    </div>
  </div>
</template>
