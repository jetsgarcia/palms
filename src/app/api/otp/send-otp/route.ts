import { OTPEmailTemplate } from "@/emails/otp-template";
import { type NextRequest } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, otp, email } = body;

  if (!name) {
    return Response.json({ error: "Missing name" }, { status: 400 });
  }

  if (!otp) {
    return Response.json({ error: "Missing OTP" }, { status: 400 });
  }

  if (!email) {
    return Response.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "PALMS <noreply@jettergarcia.com>",
      to: [email],
      subject: "Change Password OTP",
      react: await OTPEmailTemplate({ firstName: name, OTP: otp }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
