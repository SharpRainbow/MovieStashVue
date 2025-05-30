import { ref } from 'vue';

export function useSwiperData(fetchFn) {
  const items = ref([]);
  const page = ref(1);
  const isLoading = ref(false);

  const loadMore = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
      const { data } = await fetchFn(page.value);
      if (data.length === 0) return;
      items.value.push(...data);
      page.value++;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return { items, page, isLoading, loadMore };
}
