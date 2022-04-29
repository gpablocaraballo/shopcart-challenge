import { useState } from 'react'
import { useRouter } from 'next/router'
import get from 'lodash.get'
import {
  ListItem,
  ImgUnvavailable,
  ItemName,
  ItemPrice,
  ItemPriceValue,
  ItemPriceCurrency,
  ItemFooter
} from './ProductList.styled'
import {
  ButtonBox
} from '../Common.styled'
import { useAppContext } from '../../libs/context-lib'
import { APP_ACTIONS } from '../../libs/reducerAction-lib'
import { ModelSchema } from '../../libs/models'
import CartOperations from './CartOperations'

interface ItemProp {
    item: ModelSchema['productSchema']
}

export default function Item ({ item }: ItemProp) {
  const { dispatch } = useAppContext()
  const router = useRouter()
  const [imageFailed, setImageFailed] = useState(false)

  const onItemClicked = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    dispatch({ type: APP_ACTIONS.SET_PRODUCT, data: item })
    const path = `/products/${item.product_id}`
    router.push(path, undefined, { shallow: true })
  }

  return (
    <ListItem>
      {item.image_url && !imageFailed
        ? (
            <img width={200} height={200} src={get(item, 'image_url', '')} onError={() => setImageFailed(true)} />
          )
        : (
            <ImgUnvavailable width={200} height={200} src="/assets/no-image.png" alt="unavailable" />
          )}
      <ItemName>{item.name}</ItemName>
      <ItemFooter>
        <ItemPrice>
          <ItemPriceValue>{item.price_per_unit}</ItemPriceValue>
          <ItemPriceCurrency>$</ItemPriceCurrency>
        </ItemPrice>
        <ButtonBox onClick={onItemClicked}>Ir al detalle</ButtonBox>
      </ItemFooter>
      <CartOperations item={item} />
    </ListItem>
  )
}
