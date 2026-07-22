import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_for_dev_change_in_prod";

export function signToken(payload: string | object | Buffer) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "10h" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
