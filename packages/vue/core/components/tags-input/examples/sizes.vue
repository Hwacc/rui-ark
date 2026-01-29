<script setup lang="ts">
import { TagsInput as ArkTagsInput } from '@ark-ui/vue/tags-input'
import { X } from 'lucide-vue-next'
import { ref } from 'vue'
import { TagsInput, TagsInputItem } from '../index'

const sm = ref<string[]>(['Vue', 'React'])
const base = ref<string[]>(['Vue', 'React'])
const lg = ref<string[]>(['Vue', 'React'])
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <div class="text-sm text-hcc">
      sm / base / lg
    </div>

    <div class="w-full max-w-[560px] flex flex-col gap-3">
      <div class="rounded-md border border-h33 p-3">
        <TagsInput v-model="sm" :theme="{ size: 'sm' }">
          <template #default="{ items }">
            <TagsInputItem
              v-for="(v, index) in items"
              :key="`${v}-${index}`"
              :index="index"
              :value="v"
            >
              <ArkTagsInput.ItemDeleteTrigger class="ml-1 text-h55 hover:text-hff">
                <X class="size-3" />
              </ArkTagsInput.ItemDeleteTrigger>
            </TagsInputItem>
          </template>
        </TagsInput>
      </div>

      <div class="rounded-md border border-h33 p-3">
        <TagsInput v-model="base" :theme="{ size: 'base' }">
          <template #default="{ items }">
            <TagsInputItem
              v-for="(v, index) in items"
              :key="`${v}-${index}`"
              :index="index"
              :value="v"
            >
              <ArkTagsInput.ItemDeleteTrigger class="ml-1 text-h55 hover:text-hff">
                <X class="size-3.5" />
              </ArkTagsInput.ItemDeleteTrigger>
            </TagsInputItem>
          </template>
        </TagsInput>
      </div>

      <div class="rounded-md border border-h33 p-3">
        <TagsInput v-model="lg" :theme="{ size: 'lg' }">
          <template #default="{ items }">
            <TagsInputItem
              v-for="(v, index) in items"
              :key="`${v}-${index}`"
              :index="index"
              :value="v"
            >
              <ArkTagsInput.ItemDeleteTrigger class="ml-1 text-h55 hover:text-hff">
                <X class="size-4" />
              </ArkTagsInput.ItemDeleteTrigger>
            </TagsInputItem>
          </template>
        </TagsInput>
      </div>
    </div>
  </div>
</template>
