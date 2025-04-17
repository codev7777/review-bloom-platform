const env = {
  development: {
    apiUrl: "http://localhost:3000/v1",
  },
  production: {
    apiUrl: "https://reviewbrothers.com/api/v1",
  },
};

// Determine the current environment
const isDevelopment = process.env.NODE_ENV === "development";
const currentEnv = isDevelopment ? env.development : env.production;

export const API_URL = currentEnv.apiUrl;
