import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_SECRET);

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_ID,
  });
  const payload = ticket.getPayload();
  console.log({ payload });

  return payload;
}

export { verify };
