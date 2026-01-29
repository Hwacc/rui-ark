<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-4">
    <ToggleGroup :default-value="['b']" :theme="{ size: 'sm' }">
      <ToggleGroupItem value="a">
        A
      </ToggleGroupItem>
      <ToggleGroupItem value="b">
        B
      </ToggleGroupItem>
      <ToggleGroupItem value="c">
        C
      </ToggleGroupItem>
    </ToggleGroup>

    <ToggleGroup :default-value="['b']" :theme="{ size: 'base' }">
      <ToggleGroupItem value="a">
        A
      </ToggleGroupItem>
      <ToggleGroupItem value="b">
        B
      </ToggleGroupItem>
      <ToggleGroupItem value="c">
        C
      </ToggleGroupItem>
    </ToggleGroup>

    <ToggleGroup :default-value="['b']" :theme="{ size: 'lg' }">
      <ToggleGroupItem value="a">
        A
      </ToggleGroupItem>
      <ToggleGroupItem value="b">
        B
      </ToggleGroupItem>
      <ToggleGroupItem value="c">
        C
      </ToggleGroupItem>
    </ToggleGroup>
  </div>
</template>
