<script setup lang="ts">
import { Slider, SliderMarker, SliderMarkerGroup, SliderThumb, SliderTooltipThumb } from '@rui-ark/vue-core/components/slider'
import { ref } from 'vue'

const value = ref([0])
</script>

<template>
  <div class="flex items-center gap-2">
    <Slider v-model="value" class="w-75">
      <SliderTooltipThumb :index="0" />
    </Slider>

    <Slider class="w-75" size="sm" :default-value="[10, 20]">
      <SliderThumb :index="0" />
      <SliderThumb :index="1" />
    </Slider>
    <Slider v-model="value" class="w-75" size="lg">
      <SliderTooltipThumb
        :index="0"
        :open="() => true"
        skin="razer"
      />
      <template #suffix>
        <SliderMarkerGroup>
          <SliderMarker :value="10">
            10
          </SliderMarker>
        </SliderMarkerGroup>
      </template>
    </Slider>
  </div>
</template>
