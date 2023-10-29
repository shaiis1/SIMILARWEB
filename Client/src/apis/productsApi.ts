import { unprotectedGetRequest } from "./apiGeneric"

export const GetProducts = async () => {
    const users = await unprotectedGetRequest(
      `products/getProducts`
    )
    
    return users
  }