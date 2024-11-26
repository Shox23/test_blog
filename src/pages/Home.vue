<template>
  <div
    class="container p-8 flex flex-col gap-4 overflow-y-auto"
    v-if="visiblePostList.length"
  >
    <Card v-for="item in visiblePostList" :key="item.id">
      <CardHeader>
        <RouterLink :to="`/post/${item.id}`">
          <CardTitle>{{ item.title }}</CardTitle>
        </RouterLink>
        <CardDescription>{{ item.category }}</CardDescription>
      </CardHeader>
      <CardContent> {{ item.content.slice(0, 100) }}...</CardContent>
      <CardFooter class="flex items-center justify-between">
        <CardDescription class="text-xs">{{ item.author }}</CardDescription>
        <CardDescription class="text-xs">{{
          item.publishedDate
        }}</CardDescription>
      </CardFooter>
    </Card>
  </div>
  <div class="container" v-else>
    <h1 class="text-2xl">Posts not found</h1>
  </div>
</template>

<script setup lang="ts">
import { fetchPosts, loadMorePosts, visiblePostList } from "@/utils/usePosts";
import { onBeforeMount, onUnmounted } from "vue";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

onBeforeMount(() => {
  fetchPosts();
  window.addEventListener("scroll", loadMorePosts);
});

onUnmounted(() => {
  window.removeEventListener("scroll", loadMorePosts);
});
</script>
