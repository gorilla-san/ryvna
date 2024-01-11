import { Database } from "bun:sqlite";
import { randomUUID } from "crypto";

interface ChatSession {
  chat_id: string;
  chat_name: string;
}

interface Message {
  message_id: string;
  chat_id: string;
  sender: string;
  message: string;
}

const db = new Database("chats.sqlite");

export const getChatSession = (chat_id: string): ChatSession => {
  const query = db.query(
    "SELECT * FROM chat_sessions WHERE chat_id = $chat_id",
  );
  const chatSession = query.values({ $chat_id: chat_id })[0];
  if (!chatSession) throw new Error("No chat session found");

  return {
    chat_id: chatSession[0],
    chat_name: chatSession[1],
  } as ChatSession;
};

export const getMessagesInChat = (chat_id: string): Message[] => {
  const query = db.query("SELECT * FROM messages WHERE chat_id = $chat_id");
  return query.values({ $chat_id: chat_id }).map((msg) => ({
    message_id: msg[0],
    chat_id: msg[1],
    sender: msg[2],
    message: msg[3],
  })) as Message[];
};

export const addChatSession = (chat_name: string): ChatSession => {
  const insertQuery = db.query(
    "INSERT INTO chat_sessions (chat_id, chat_name) VALUES ($chat_id, $chat_name)",
  );
  const chat_id = randomUUID();
  insertQuery.all({ $chat_id: chat_id, $chat_name: chat_name });

  return getChatSession(chat_id);
};

export const addMessageToChat = (
  chat_id: string,
  sender: string,
  message: string,
): Message => {
  const insertQuery = db.query(
    "INSERT INTO messages (message_id, chat_id, sender, message) VALUES ($message_id, $chat_id, $sender, $message)",
  );
  const message_id = randomUUID();

  insertQuery.all({
    $message_id: message_id,
    $chat_id: chat_id,
    $sender: sender,
    $message: message,
  });

  return { message_id, chat_id, sender, message } as Message;
};

// Add other necessary methods like updating and deleting chats and messages as needed.

export const getAllChatSessions = () => {
  // get all chat sessions (ids and titles)
  const query = db.query("SELECT * FROM chat_sessions");
  const chatSessions = query.values().map((chat) => ({
    chat_id: chat[0],
    chat_name: chat[1],
  })) as ChatSession[];
  return chatSessions;
};
