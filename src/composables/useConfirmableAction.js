import { ref } from 'vue';

export function useConfirmableAction(dialogRef) {
  const selectedItem = ref(null);

  const requestAction = (item) => {
    selectedItem.value = item;
    dialogRef.value?.show();
  };

  const confirmAction = async (actionFn) => {
    if (!selectedItem.value) return;
    await actionFn(selectedItem.value);
    selectedItem.value = null;
  };

  return { selectedItem, requestAction, confirmAction };
}
