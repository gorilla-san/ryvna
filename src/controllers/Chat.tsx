const Chat = ({ chat, sessionId }) => {
  return `
    <div
      x-data="{ sessionId: '${sessionId}' }"
      x-init="$store.chat.sessionId = sessionId; loading = false"
      x-show="!reset"
      class="flex flex-col gap-2 w-full"
      
    >
      ${chat
        .map((message: any) => {
          return `
          <div
            id="${message.id}"
            class="${message.sender} py-4 border-b-[1px] border-slate-500"
          >
            ${message.message} <!-- Assuming message is already sanitized -->
          </div>
        `;
        })
        .join("")}
    </div>
  `;
};

export default Chat;
