<script setup lang="ts">
import { ref } from 'vue'
import { RatingGroup, RatingGroupItem } from '../index'

const sm = ref(2)
const base = ref(3)
const lg = ref(4)
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hcc">
      sm / base / lg
    </div>

    <div class="w-full max-w-[520px] flex flex-col gap-3 rounded-md border border-h33 p-3">
      <RatingGroup v-model="sm" size="sm" :count="5">
        <template #default="{ items }">
          <RatingGroupItem v-for="item in items" :key="item" :index="item" />
        </template>
      </RatingGroup>

      <RatingGroup v-model="base" size="base" :count="5">
        <template #default="{ items }">
          <RatingGroupItem v-for="item in items" :key="item" :index="item" />
        </template>
      </RatingGroup>

      <RatingGroup v-model="lg" size="lg" :count="5">
        <template #default="{ items }">
          <RatingGroupItem v-for="item in items" :key="item" :index="item" />
        </template>
      </RatingGroup>
    </div>
  </div>
</template>

