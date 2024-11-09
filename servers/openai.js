// server/openai.js
const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
module.exports = new OpenAIApi(configuration);
