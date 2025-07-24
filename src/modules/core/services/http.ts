import axios, { type CreateAxiosDefaults } from "axios"

export const createHttpClient = (config: CreateAxiosDefaults) => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    ...config,
  })

  // Add any interceptors or additional configuration here if needed

  return instance
}
