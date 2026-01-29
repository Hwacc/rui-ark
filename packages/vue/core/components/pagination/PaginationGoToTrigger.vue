<script lang="ts">
export interface PaginationGoToTriggerProps extends PolymorphicProps {}
</script>

<script setup lang="ts">
import type { PolymorphicProps } from '@ark-ui/vue/factory'
import { ark } from '@ark-ui/vue/factory'
import { inject } from 'vue'
import { PAGINATION_GO_TO_PROVIDE_KEY } from './PaginationGoTo.vue'

const props = defineProps<PaginationGoToTriggerProps>()
const { goInputPage } = inject(PAGINATION_GO_TO_PROVIDE_KEY, { goInputPage: () => {} })
</script>

<template>
  <ark.button
    v-bind="props"
    @click="() => goInputPage()"
  >
    <slot :go="goInputPage" />
  </ark.button>
</template>
