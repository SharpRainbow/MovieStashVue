import { ref } from 'vue'

export function useListData(fetchFn) {
  const items = ref([]);
  const isLoading = ref(false);
  const totalPages = ref(0);
  const currentPage = ref(1);

  const loadPage = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
    try {
      const { data } = await fetchFn(currentPage.value);
      items.value = []
      items.value.push(...data);
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  return { items, totalPages, isLoading, loadPage, currentPage };
}