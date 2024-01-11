import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import Chat from "./controllers/Chat";
import baseHtml from "./controllers/baseHtml";
import { html } from "@elysiajs/html";
import {
  addChatSession,
  addMessageToChat,
  getMessagesInChat,
  getAllChatSessions,
} from "./database/dbMethods";
import { makeGPTCall } from "./helpers/gipitty";
import { staticPlugin } from "@elysiajs/static";
import Chats from "./controllers/Chats";

const app = new Elysia();

app
  .use(swagger())
  .use(html())
  .use(staticPlugin())
  .onError(({ code, error }) => {
    return new Response(error.toString());
  });

app.get("/", () => {
  return baseHtml({ name: "Le chatte" });
});

app.post("/chat", async ({ body }: any) => {
  console.log(body);

  let chatSessionId = body.session;

  // Check if the session ID is provided and valid
  if (!chatSessionId) {
    // Create a new chat session if no valid session ID is provided
    const newChatSession = addChatSession("New Chat Session");
    chatSessionId = newChatSession.chat_id;
  }

  // Now that we have a valid chat session ID, proceed with adding messages
  addMessageToChat(chatSessionId, "user", body.message);
  let messages = getMessagesInChat(chatSessionId);

  let chatHistory = messages.map((message) => {
    return { role: message.sender, content: message.message };
  });

  let response = await makeGPTCall(chatHistory);
  addMessageToChat(chatSessionId, "assistant", response || "");

  messages = getMessagesInChat(chatSessionId);
  return Chat({ chat: messages, sessionId: chatSessionId });
});

app.get("/retrieve-chat", ({ query }: any): any => {
  console.log(query);
  const chatSessionId = query.session;
  let messages = getMessagesInChat(chatSessionId);
  return Chat({ chat: messages, sessionId: chatSessionId });
});

app.get("/chats", () => {
  // Endpoint to get all chat sessions
  const chatSessions = getAllChatSessions();
  console.log(chatSessions);
  return Chats({ chats: chatSessions });
});

app.post("/create-chat-session", ({ body }: any) => {
  // Endpoint to create a new chat session
  const chatSession = addChatSession(body.chatName || "New Chat Session");
  return chatSession;
});

// Add other endpoints as needed, e.g., to update or delete chat sessions/messages

app.listen(3000, () => console.log("Server running on port 3000"));
