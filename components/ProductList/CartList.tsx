import {
  CartContainer
} from './ProductList.styled'
import {
  LabelBox
} from '../Common.styled'
import CartItem from './CartItem'
import { useAppContext } from '../../libs/context-lib'

export default function CartList () {
  const { state } = useAppContext()
  const arrCarts = Object.values(state.cart).filter((item) => item.quantity !== 0)

  return (
    <CartContainer>
      {(arrCarts.length > 0)
        ? (
        <>
          {arrCarts.map((row) => (
            <CartItem key={row.product.product_id} item={row} />
          ))}
        </>
          )
        : <LabelBox large light>Carrito vac&iacute;o.</LabelBox>}
    </CartContainer>
  )
}
