<script setup lang="ts">
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '../index'
</script>

<template>
  <div class="w-full flex flex-col gap-6">
    <Tabs default-value="tab-1" :theme="{ size: 'sm' }">
      <TabsList class="w-80">
        <TabsTrigger value="tab-1">
          Small
        </TabsTrigger>
        <TabsTrigger value="tab-2">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab-3">
          Tab 3
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="tab-1">
        size=sm
      </TabsContent>
      <TabsContent value="tab-2">
        Content 2
      </TabsContent>
      <TabsContent value="tab-3">
        Content 3
      </TabsContent>
    </Tabs>

    <Tabs default-value="tab-1" :theme="{ size: 'base' }">
      <TabsList class="w-80">
        <TabsTrigger value="tab-1">
          Base
        </TabsTrigger>
        <TabsTrigger value="tab-2">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab-3">
          Tab 3
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="tab-1">
        size=base
      </TabsContent>
      <TabsContent value="tab-2">
        Content 2
      </TabsContent>
      <TabsContent value="tab-3">
        Content 3
      </TabsContent>
    </Tabs>

    <Tabs default-value="tab-1" :theme="{ size: 'lg' }">
      <TabsList class="w-80">
        <TabsTrigger value="tab-1">
          Large
        </TabsTrigger>
        <TabsTrigger value="tab-2">
          Tab 2
        </TabsTrigger>
        <TabsTrigger value="tab-3">
          Tab 3
        </TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="tab-1">
        size=lg
      </TabsContent>
      <TabsContent value="tab-2">
        Content 2
      </TabsContent>
      <TabsContent value="tab-3">
        Content 3
      </TabsContent>
    </Tabs>
  </div>
</template>
