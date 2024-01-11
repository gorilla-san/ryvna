import { Database } from "bun:sqlite";
import { randomUUID } from "crypto";

const db = new Database("chats.sqlite", { create: true });

// Create a table for chat sessions
db.run(
  "CREATE TABLE chat_sessions (chat_id TEXT PRIMARY KEY UNIQUE, chat_name TEXT);",
);

// Create a table for messages
db.run(
  "CREATE TABLE messages (message_id TEXT PRIMARY KEY UNIQUE, chat_id TEXT, sender TEXT, message TEXT, FOREIGN KEY (chat_id) REFERENCES chat_sessions(chat_id));",
);

// Example data insertion (this part is optional and for demonstration)
const insertChat = db.prepare(
  "INSERT INTO chat_sessions (chat_id, chat_name) VALUES ($chat_id, $chat_name)",
);

const insertMessage = db.prepare(
  "INSERT INTO messages (message_id, chat_id, sender, message) VALUES ($message_id, $chat_id, $sender, $message)",
);

const addSampleData = db.transaction(() => {
  // Add a chat session
  const chatId = randomUUID();
  insertChat.run({ $chat_id: chatId, $chat_name: "Sample Chat" });

  // Add messages to the chat session
  insertMessage.run({
    $message_id: randomUUID(),
    $chat_id: chatId,
    $sender: "Alice",
    $message: "Hello!",
  });
  insertMessage.run({
    $message_id: randomUUID(),
    $chat_id: chatId,
    $sender: "Bob",
    $message: "Hi Alice!",
  });
});

addSampleData();
