export type APIError = string;


export const axiosParams = {
  headers: {
    // 'Access-Control-Allow-Origin': 'production_url'
  }
}

export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'production_url'
  : 'http://127.0.0.1:5001/rest1-255e4/us-central1/v1'

export const websiteUrl = process.env.NODE_ENV === 'production'
  ? 'production_url'
  : 'http://localhost:3000'

