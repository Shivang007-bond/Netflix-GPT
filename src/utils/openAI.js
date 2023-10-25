import OpenAI from "openai";
import { gpt_key } from "./constants";

const openai = new OpenAI({
  apiKey: gpt_key,
  dangerouslyAllowBrowser: true,
});

export default openai;
