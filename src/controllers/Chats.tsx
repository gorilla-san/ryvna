const Chats = ({ chats }) => {
  return (
    <div class="w-[20rem] flex flex-col gap-4 items-center h-[50rem] overflow-auto">
      <button
        x-on:click="reset = true"
        class="px-6 py-4 border-[1px] cursor-pointer bg-slate-100 border-slate-500 w-full"
      >
        New Chat
      </button>
      {chats.map((chat) => (
        <button
          id={chat.chat_id}
          value={chat.chat_id}
          name="session"
          safe
          hx-get="/retrieve-chat"
          hx-target="#chat"
          hx-swap="innerHTML"
          x-on:click="reset = false"
          class="px-6 py-4 border-[1px] cursor-pointer bg-slate-100 border-slate-500 w-full"
        >
          {chat.chat_name}
        </button>
      ))}
    </div>
  );
};

export default Chats;
