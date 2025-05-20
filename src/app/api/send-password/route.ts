import { PasswordEmailTemplate } from "@/emails/password-template";
import { type NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { firstName, password, email } = body;

  if (!firstName) {
    return Response.json({ error: "Missing name" }, { status: 400 });
  }

  if (!password) {
    return Response.json({ error: "Missing password" }, { status: 400 });
  }

  if (!email) {
    return Response.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "PALMS <noreply@jettergarcia.com>",
      to: [email],
      subject: "Your PALMS Account Has Been Created",
      react: await PasswordEmailTemplate({
        firstName: firstName,
        password: password,
      }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
