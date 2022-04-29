import Axios from 'axios'
import getConfig from 'next/config'
import { ModelSchema } from './models'
const { publicRuntimeConfig = {} } = getConfig() || {}

const API_URL = publicRuntimeConfig.API_URL

export const getCategories = async () => {
  const response = await Axios({ url: `${API_URL}/api/categories` })
  return response
}

export const getProducts = async () => {
  const response = await Axios({ url: `${API_URL}/api/products` })
  return response
}

export const getProductById = async (id:string) => {
  const response = await Axios({ url: `${API_URL}/api/products?id=${id}` })
  return response
}

export const getRecommendations = async (productId:string) => {
  const response = await Axios({ url: `${API_URL}/api/recommendations?product_id=${productId}` })
  return response
}

const cartKey:string = 'challenge-cart-siempre-en-casa'

export const updateCart = (cart: ModelSchema['productsCartSchema']) => {
  // Object.assign({}, cart) to avoid problems with return stringify [] otherwise its gonna return empty
  const obj:any = Object.assign({}, cart)
  window.localStorage.setItem(cartKey, JSON.stringify(obj))
}

export const getCart = (): ModelSchema['productsCartSchema'] | {} => {
  const item = window.localStorage.getItem(cartKey)
  return item ? JSON.parse(item) : []
}
