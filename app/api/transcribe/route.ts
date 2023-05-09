import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!request.body) {
    return new Response("Audio required", { status: 400 });
  }
  const formData = await request.formData();
  const response = await fetch(
    "https://api.openai.com/v1/audio/transcriptions",
    {
      method: "POST",
      // headers with authorizaiton and content type
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    }
  );
  const data = await response.json();
  return NextResponse.json({ data });
}