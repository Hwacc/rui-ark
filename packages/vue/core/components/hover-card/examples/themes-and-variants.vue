<script setup lang="ts">
import { Button } from '../../button'
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardTrigger } from '../index'
</script>

<template>
  <div class="w-full flex flex-wrap items-center gap-6">
    <HoverCard :theme="{ size: 'sm' }" :positioning="{ placement: 'top' }">
      <HoverCardTrigger as-child>
        <Button variant="outline">
          sm
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        Small content
      </HoverCardContent>
    </HoverCard>

    <HoverCard :theme="{ size: 'base' }" :positioning="{ placement: 'top' }">
      <HoverCardTrigger as-child>
        <Button variant="outline">
          base
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        Base content
      </HoverCardContent>
    </HoverCard>

    <HoverCard :theme="{ size: 'lg' }" :positioning="{ placement: 'top' }">
      <HoverCardTrigger as-child>
        <Button variant="outline">
          lg
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        Large content
      </HoverCardContent>
    </HoverCard>

    <HoverCard :theme="{ bordered: false }" :positioning="{ placement: 'top' }">
      <HoverCardTrigger as-child>
        <Button variant="outline">
          no border
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        bordered=false
      </HoverCardContent>
    </HoverCard>

    <HoverCard :theme="{ surface: 'dark' }" :positioning="{ placement: 'top' }">
      <HoverCardTrigger as-child>
        <Button variant="outline">
          dark skin
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <HoverCardArrow />
        skin=dark
      </HoverCardContent>
    </HoverCard>
  </div>
</template>
