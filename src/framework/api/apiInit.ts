export type APIError = string;


export const axiosParams = {
  headers: {
    // 'Access-Control-Allow-Origin': 'production_url'
  }
}

export const baseUrl = process.env.NODE_ENV === 'production'
  ? 'https://genfireapp-ete7o5a4vq-uc.a.run.app'
  : 'http://127.0.0.1:5001/gen-fireapp/us-central1/genfireapp'

export const websiteUrl = process.env.NODE_ENV === 'production'
  ? 'https://gen-fireapp.web.app/'
  : 'http://localhost:3000'

