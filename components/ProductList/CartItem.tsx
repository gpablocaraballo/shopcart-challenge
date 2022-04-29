import { useState } from 'react'
import get from 'lodash.get'
import {
  CartListItem,
  CartListBody,
  ImgUnvavailable,
  ItemName,
  ItemPrice,
  ItemPriceValue,
  ItemPriceCurrency,
  ItemQuantity,
  CartLabels,
  CartOperationsContainer
} from './ProductList.styled'
import { ModelSchema } from '../../libs/models'
import CartOperations from './CartOperations'

interface ItemProp {
    item: ModelSchema['cartSchema']
}

const getSubTotal = (price:string, quantity:number) => {
  return Number(Number(price) * Number(quantity)).toFixed(2)
}

export default function CartItem ({ item }: ItemProp) {
  const [imageFailed, setImageFailed] = useState(false)

  return (
    <CartListItem>
      <CartListBody>
        {item.product.image_url && !imageFailed
          ? (
              <img width={50} height={50} src={get(item.product, 'image_url', '')} onError={() => setImageFailed(true)} />
            )
          : (
              <ImgUnvavailable width={50} height={50} src="/assets/no-image.png" alt="unavailable" />
            )}
        <CartLabels>
          <ItemName style={{ height: '20px' }}>{item.product.name && item.product.name.substring(0, 45)}...</ItemName>
          <ItemPrice style={ { fontWeight: '700' } }>
            <ItemPriceValue>Precio/Unidad: {item.product.price_per_unit}</ItemPriceValue>
            <ItemPriceCurrency>$</ItemPriceCurrency>
            <ItemQuantity style={ { marginLeft: '30px' } }>Cantidad: {item.quantity}</ItemQuantity>
          </ItemPrice>
        </CartLabels>
      </CartListBody>
      <CartOperationsContainer>
        <CartOperations item={item.product} />
        <ItemPriceValue style={{ width: '200px' }}>SubTotal: {getSubTotal(item.product.price_per_unit, item.quantity)} $</ItemPriceValue>
      </CartOperationsContainer>
    </CartListItem>
  )
}
