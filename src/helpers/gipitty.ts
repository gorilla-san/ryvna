import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function makeGPTCall(messages: any[]) {
  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-4",
  });

  return completion.choices[0].message.content;
}

export { makeGPTCall };
