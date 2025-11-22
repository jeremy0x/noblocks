import { NextResponse } from "next/server";
import client from "@sendgrid/client";

export async function POST(request: Request) {
  const apiKey = process.env.SENDGRID_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "SendGrid API key is not configured" },
      { status: 500 }
    );
  }

  client.setApiKey(apiKey);
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const data = {
    contacts: [
      {
        email: email,
      },
    ],
  };

  const sendgridRequest = {
    url: "/v3/marketing/contacts",
    method: "PUT" as const,
    body: data,
  };

  try {
    const [response, body] = await client.request(sendgridRequest);

    if (response.statusCode >= 200 && response.statusCode < 300) {
      return NextResponse.json(
        { message: "Contact added successfully" },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { message: "Failed to add contact" },
      { status: response.statusCode },
    );
    // biome-ignore lint/suspicious/noExplicitAny: error is handled
  } catch (error: any) {
    return NextResponse.json(
      {
        message:
          error?.response?.body?.errors?.[0]?.message || "Internal server error",
      },
      { status: error?.code || 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
