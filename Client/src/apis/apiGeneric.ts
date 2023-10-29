import CONFIG from '../config/config'

export const unprotectedGetRequest = async (apiEndpoint: string) => {
    const res = await fetch(`${CONFIG.api}/${apiEndpoint}`)
  
    return res.json()
  }