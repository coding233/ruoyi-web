import type { FilesCardProps } from 'vue-element-plus-x/types/FilesCard';
// 对话聊天的文件上传列表
import { defineStore } from 'pinia';

export type ChatFileItem = FilesCardProps & {
  file: File;
  /** 后端文件解析 API 返回的 file_id，上传成功后才有值 */
  fileId?: string;
};

export const useFilesStore = defineStore('files', () => {
  const filesList = ref<ChatFileItem[]>([]);

  // 本次对话可随消息发送的 file_id 列表
  const fileIds = computed(() => filesList.value
    .map(file => file.fileId)
    .filter((id): id is string => Boolean(id)));

  // 是否还有文件正在解析中
  const uploadingCount = ref(0);

  // 设置文件列表
  const setFilesList = (list: ChatFileItem[]) => {
    filesList.value = list;
  };

  // 根据索引删除 文件
  const deleteFileByIndex = (index: number) => {
    const removed = filesList.value.splice(index, 1)[0];
    if (removed?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(removed.url);
    }
  };

  // 上传成功后写入 file_id
  const markUploaded = (uid: string, fileId: string) => {
    const item = filesList.value.find(file => file.uid === uid);
    if (item) {
      item.fileId = fileId;
      item.status = 'done';
    }
  };

  // 上传失败，标记错误并阻止随消息发送
  const markUploadFailed = (uid: string, errorTip: string) => {
    const item = filesList.value.find(file => file.uid === uid);
    if (item) {
      item.fileId = undefined;
      item.status = 'error';
      item.errorTip = errorTip;
    }
  };

  // 消息发送后清空附件，避免文件卡片跨消息残留
  const clearFiles = () => {
    filesList.value.forEach((item) => {
      if (item.url?.startsWith('blob:')) {
        URL.revokeObjectURL(item.url);
      }
    });
    filesList.value = [];
    uploadingCount.value = 0;
  };

  return {
    filesList,
    fileIds,
    uploadingCount,
    setFilesList,
    deleteFileByIndex,
    markUploaded,
    markUploadFailed,
    clearFiles,
  };
});
