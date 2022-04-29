import { useReducer } from 'react'
import { APP_ACTIONS } from './reducerAction-lib'
import { ItemState, Action, appDefaultState } from '../libs/models'

function appReducer (state: ItemState, action: Action): any {
  switch (action.type) {
    case APP_ACTIONS.RESET_PRODUCTS:
      return { ...state, products: action.data, filtered_products: action.data }
    case APP_ACTIONS.SET_PRODUCTS:
      return { ...state, filtered_products: action.data }
    case APP_ACTIONS.SET_PRODUCT:
      return { ...state, product: action.data }
    case APP_ACTIONS.UPDATE_PRODUCT_CART:
      return { ...state, cart: action.data }
    default:
      throw new Error()
  }
}

export function useAppReducer () {
  return useReducer(appReducer, appDefaultState)
}

export default { useAppReducer }
