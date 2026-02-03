<script setup lang="ts">
import vAria from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-3">
    <p class="text-sm text-hcc">
      使用 <code>pt</code> 把 aria/role/tabindex 应用到指定子元素（querySelector）
    </p>

    <div
      v-aria:0="{
        pt: '.target',
        role: 'button',
        label: 'Target is the inner element',
      }"
      class="rounded border border-h55 p-3"
    >
      <div class="text-xs text-hcc">
        wrapper (not focusable)
      </div>
      <div class="target mt-2 w-fit rounded bg-h22 px-3 py-2 text-sm text-hff">
        inner (.target) is focusable
      </div>
    </div>
  </div>
</template>

