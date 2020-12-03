/*
 Defines the API route we are using.
 */
var api_url = "";

switch (process.env.NODE_ENV) {
  case "development":
    api_url = "http://localhost:5000/api/v1/";
    break;
  case "production":
    api_url = "https://atunje.com/api/v1";
    break;
}

export const DEVCAMPER_CONFIG = {
  API_URL: api_url
};
