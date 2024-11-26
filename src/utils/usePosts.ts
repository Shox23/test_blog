import Post from "@/types/post";
import data from "../data/data.json";
import { computed, ref } from "vue";

export const authorList: string[] = [];
export const categoryList: string[] = [];
export const limit = ref<number>(5);
export const postList = ref<Post[]>([]);
const sortType = ref<"new" | "old" | "none">("none");
const filters = ref({
  category: "none",
  author: "none",
});

export const filteredPostList = ref<Post[]>([]);

export const searchValue = ref<string>("");

export const searchPost = (value: string) => {
  searchValue.value = value;
};

export const filterPosts = (filter: "category" | "author", value: string) => {
  filters.value[filter] = value;
};

export const sortPosts = (type: "new" | "old" | "none") => {
  sortType.value = type;
};

export const visiblePostList = computed(() => {
  const filteredAndSortedPosts = applyFiltersAndSort();
  return filteredAndSortedPosts.slice(0, limit.value);
});

const applyFiltersAndSort = () => {
  let result = postList.value;

  if (searchValue.value.trim()) {
    const query = searchValue.value.toLowerCase();
    result = result.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content?.toLowerCase().includes(query)
    );
  }

  result = result.filter((post) => {
    const matchesCategory =
      filters.value.category === "none" ||
      post.category === filters.value.category;
    const matchesAuthor =
      filters.value.author === "none" || post.author === filters.value.author;
    return matchesCategory && matchesAuthor;
  });

  if (sortType.value !== "none") {
    const direction = sortType.value === "new" ? -1 : 1;
    result = result.sort(
      (a, b) =>
        (new Date(a.publishedDate).valueOf() -
          new Date(b.publishedDate).valueOf()) *
        direction
    );
  }

  return result;
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
