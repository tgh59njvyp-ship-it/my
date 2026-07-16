import { generateServerCode } from "../../lib/gemini";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const result = await generateServerCode(prompt);

  if (result.success) {
    return res.status(200).json(result);
  } else {
    return res.status(500).json({ error: result.error });
  }
}
