type internalMessage = {
  success: boolean;
  message: string;
  error?: boolean;
};

const messageData = ref<internalMessage>({
  success: false,
  message: "",
  error: false,
});

export function useMessageData() {
  return messageData;
}
