<template>
  <div class="container flex flex-col gap-4" v-if="currentPost">
    <div class="text-xs flex items-center gap-4">
      <h3>Created: {{ currentPost.publishedDate }}</h3>
      <h3>Author: {{ currentPost.author }}</h3>
    </div>
    <h1 class="text-2xl">{{ currentPost.title }}</h1>
    <h3 class="text-sm">{{ currentPost.category }}</h3>
    <p>{{ currentPost.content }}</p>
  </div>
  <div class="container" v-else>
    <h1 class="text-2xl">Post not found</h1>
  </div>
</template>

<script setup lang="ts">
import Post from "@/types/post";
import { postList } from "@/utils/usePosts";
import { onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import data from "../data/data.json";

const currentPost = ref<Post>();
const route = useRoute();
onBeforeMount(() => {
  if (postList.value.length) {
    currentPost.value = postList.value.find(
      (item) => item.id == Number(route.params.id)
    );
  } else {
    currentPost.value = data.find((item) => item.id == Number(route.params.id));
  }
});
</script>
