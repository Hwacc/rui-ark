<script setup lang="ts">
import { Button } from '@rui-ark/vue-core/components/button'
import { Menu, MenuArrow, MenuContent, MenuTrigger } from '@rui-ark/vue-core/components/menu'
</script>

<template>
  <div class="flex items-center gap-4">
    <Menu>
      <MenuTrigger as-child>
        <Button>Menu</Button>
      </MenuTrigger>
      <MenuContent>
        <MenuArrow />
        test
      </MenuContent>
    </Menu>
  </div>
</template>
