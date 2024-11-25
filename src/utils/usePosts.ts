import Post from "@/types/post";
import data from "../data/data.json";
import { ref, watch } from "vue";

export const authorList: string[] = [];
export const categoryList: string[] = [];
export const limit = ref<number>(5);
export const postList = ref<Post[]>([]);

export const filteredPostList = ref<Post[]>([]);

export const searchValue = ref<string>("");

export const searchPost = () => {
  filteredPostList.value = postList.value.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.content.toLowerCase().includes(searchValue.value.toLowerCase())
  );
};

export const filterPosts = (filter: "category" | "author", value: string) => {
  filteredPostList.value = postList.value.filter(
    (item) => item[filter] === value
  );
};

export const fetchPosts = () => {
  postList.value = data;
  filteredPostList.value = postList.value.slice(0, limit.value);
  postList.value.forEach((item) => {
    if (item.category) {
      if (!categoryList.includes(item.category))
        categoryList.push(item.category);
    }
    if (item.category) {
      if (!categoryList.includes(item.author)) authorList.push(item.author);
    }
  });
};

export const loadMorePosts = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1) {
    limit.value += 5;
    filteredPostList.value = postList.value.slice(0, limit.value);
  }
};

watch(searchValue, () => {
  searchPost();
});
