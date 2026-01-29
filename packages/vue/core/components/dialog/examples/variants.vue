<script setup lang="ts">
import { fakerEN } from '@faker-js/faker'
import { Button } from '../../button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '../index'

const content = fakerEN.lorem.sentences(3)
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-4">
    <Dialog :theme="{ size: 'sm' }">
      <DialogTrigger as-child>
        <Button variant="outline">
          Small
        </Button>
      </DialogTrigger>
      <DialogContent class="w-110">
        <DialogHeader>Small Dialog</DialogHeader>
        <DialogBody>{{ content }}</DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>

    <Dialog :theme="{ size: 'base' }">
      <DialogTrigger as-child>
        <Button variant="outline">
          Base
        </Button>
      </DialogTrigger>
      <DialogContent class="w-120">
        <DialogHeader>Base Dialog</DialogHeader>
        <DialogBody>{{ content }}</DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>

    <Dialog :theme="{ size: 'lg' }">
      <DialogTrigger as-child>
        <Button variant="outline">
          Large
        </Button>
      </DialogTrigger>
      <DialogContent class="w-140">
        <DialogHeader>Large Dialog</DialogHeader>
        <DialogBody>{{ content }}</DialogBody>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  </div>
</template>
