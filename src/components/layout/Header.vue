<template>
  <header class="py-8">
    <div class="container">
      <div class="flex sm:flex-row flex-col items-center gap-2 md:gap-4">
        <Input
          @update:model-value="searchPost"
          placeholder="Search post"
          v-if="route.fullPath === '/'"
        />
        <div class="flex w-full md:gap-4 gap-2" v-if="route.fullPath === '/'">
          <Select @update:model-value="filter($event, 'author')" class="w-full">
            <SelectTrigger>
              <SelectValue placeholder="Author" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">None</SelectItem>
                <SelectItem v-for="item in authorList" :value="item" :key="item"
                  >{{ item }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            @update:model-value="filter($event, 'category')"
            class="w-full"
          >
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectGroup>
                <SelectItem
                  v-for="item in categoryList"
                  :value="item"
                  :key="item"
                  >{{ item }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select @update:model-value="sort" class="w-full">
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="new"> New </SelectItem>
                <SelectItem value="old"> Old </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex items-center justify-between w-full" v-else>
          <RouterLink to="/">Back</RouterLink>
          <Button @click="copylink">Copy post link</Button>
        </div>
        <Select @update:model-value="updateMode">
          <SelectTrigger>
            <SelectValue placeholder="Select a color mode" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="light"> Light </SelectItem>
              <SelectItem value="dark"> Dark </SelectItem>
              <SelectItem value="system"> System </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
    <Toaster />
  </header>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Toaster from "@/components/ui/toast/Toaster.vue";
import { Button } from "@/components/ui/button";
import { useColorMode } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";
import {
  authorList,
  categoryList,
  filterPosts,
  searchPost,
  sortPosts,
} from "@/utils/usePosts";

const { toast } = useToast();
const mode = useColorMode();
const route = useRoute();

const updateMode = (value: string) => {
  if (value === "light" || value === "dark" || value === "auto") {
    mode.value = value;
  }
};

const filter = (value: string, type: "category" | "author") => {
  filterPosts(type, value);
};

const sort = (value: string) => {
  console.log(value);

  if (value === "new" || value === "old" || value === "none") {
    sortPosts(value);
  }
};

const copylink = () => {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      toast({
        title: "Post link copied to clipboard",
      });
    })
    .catch((err) => {
      toast({
        title: err,
      });
    });
};
</script>
