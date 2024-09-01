import { ChatGPTMessage } from "@/lib/openai-stream";
import { MessageArraySchema } from "@/lib/validators/message";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parsedMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessage[];

  return NextResponse.json({});
}
