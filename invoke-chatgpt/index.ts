import { Context } from "@azure/functions";

const params = {
  messages: [
    {
      role: "user",
      content: "何か面白いことを言ってください",
    },
  ],
  temperature: 0.7,
  top_p: 0.95,
  frequency_penalty: 0,
  presence_penalty: 0,
  max_tokens: 800,
  stop: null,
};

const httpTrigger = async function (context: Context): Promise<void> {
  const url = process.env.OPENAI_ENDPOINT;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify(params),
  };

  const res = await fetch(url, options);
  const completion = await res.json();

  // ChatGPT APIからの応答をHTTPレスポンスのレスポンスボディとして返す
  context.res = {
    body: completion.choices[0].message.content,
  };
};

export default httpTrigger;
