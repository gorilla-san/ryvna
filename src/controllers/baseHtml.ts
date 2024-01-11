const baseHtml = ({ name }: any) => {
  return `
    <!DOCTYPE html>
      <html>
        <head>
        <script src="https://unpkg.com/htmx.org@1.9.10" integrity="sha384-D1Kt99CQMDuVetoL1lrYwg5t+9QdHe7NLX/SoJYkXDFfX37iInKRy5xLSi8nO7UC" crossorigin="anonymous"></script>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="//unpkg.com/alpinejs" defer></script>
        <title>Home</title>
        <link rel="stylesheet" href="public/styles.css">
         </head>
        <body x-data="{reset: false, loading: null, sessionId: ''}" x-on:session-id-updated.window="sessionId = $event.detail; console.log("event", $event)" class="flex gap-4 justify-center items-start">
          <side id="sidebar" class="w-[20rem] pt-[10rem]" hx-trigger="load" hx-get="/chats" hx-target="#sidebar" hx-swap="innerHTML">
          </side>
          <main class="flex flex-col gap-4">
            <h1 class="text-6xl bold mb-20 mt-20">${name}</h1>
            <div id="chat" class="w-[60rem] border-[1px] border-slate-500 bg-slate-200 h-[30rem] overflow-auto px-6 py-4">
            </div>
            <form x-data
              class="flex gap-4 w-[40rem] flex items-center gap-4 w-full"
              hx-post="/chat"
              hx-target="#chat"
              hx-swap="innerHTML"
              hx-on="htmx:afterRequest: this.reset()">
              <input type="hidden" name="session" x-bind:value="$store.chat.sessionId"/>        <input class="border-b-2 grow px-4 py-2 focus:outline-0" name="message" placeholder="Message"/>
              <button class="px-4 py-2 bg-black text-white text-xl bold flex gap-2 items-center" x-on:click="loading = true" type="submit">
                Send
                <img src="public/spinner.gif" class="w-4 h-4" x-show="loading !== null && loading"/>
              </button>
            </form>
          </main>
        <script>
            document.addEventListener('alpine:init', () => {
                Alpine.store('chat', { sessionId: '' });
            });
        </script>
        </body>
      </html>
  `;
};

export default baseHtml;
