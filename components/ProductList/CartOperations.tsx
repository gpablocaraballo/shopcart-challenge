import Image from 'next/image'
import {
  OperationContainer
} from './ProductList.styled'
import { useAppContext } from '../../libs/context-lib'
import { APP_ACTIONS } from '../../libs/reducerAction-lib'
import { ModelSchema } from '../../libs/models'
import { updateCart } from '../../libs/services'

interface ItemProp {
    item: ModelSchema['productSchema']
}

export default function CartOperations ({ item }: ItemProp) {
  const { state, dispatch } = useAppContext()

  const onAddItemClicked = () => {
    const cart:any = state.cart

    if (cart[item.product_id]) {
      cart[item.product_id].quantity++
    } else {
      cart[item.product_id] = {
        product: item,
        quantity: 1
      }
    }
    dispatch({ type: APP_ACTIONS.UPDATE_PRODUCT_CART, data: cart })
    updateCart(cart)
  }
  const onRemoveItemClicked = () => {
    const cart:any = state.cart

    if (cart[item.product_id] && cart[item.product_id].quantity >= 1) {
      cart[item.product_id].quantity--
      dispatch({ type: APP_ACTIONS.UPDATE_PRODUCT_CART, data: cart })
      updateCart(cart)
    }
  }

  return (
    <OperationContainer className="OperationBlock">
      <Image style={{ cursor: 'pointer' }} src="/assets/plus-solid.svg" onClick={onAddItemClicked} width={25} height={25} alt="Agregar unidad" />
      <Image style={{ cursor: 'pointer' }} src="/assets/minus-solid.svg" onClick={onRemoveItemClicked} width={25} height={25} alt="Sacar unidad" />
    </OperationContainer>
  )
}
