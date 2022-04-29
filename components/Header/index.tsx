import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ContainerHeader,
  ContainerNav,
  CartSide
} from './Header.styled'
import {
  LabelBox
} from './../Common.styled'
import Modal from '../Modal'
import CartList from '../ProductList/CartList'
import { useAppContext } from '../../libs/context-lib'
import { APP_ACTIONS } from '../../libs/reducerAction-lib'
import { getCart } from '../../libs/services'
import { ModelSchema } from '../../libs/models'
import { ButtonBox } from '../Common.styled'

const getTotal = (cart:ModelSchema['productsCartSchema']) => {
  const cartArr = Object.values(cart)
  let total:number = 0
  cartArr.forEach((item) => {
    total += item.quantity * Number(item.product.price_per_unit)
  })
  return Number(total).toFixed(2)
}
export default function Header () {
  const { state, dispatch } = useAppContext()
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  useEffect(() => {
    if (state.cart && Object.values(state.cart).length === 0) {
      const cart:ModelSchema['productsCartSchema'] = getCart()
      dispatch({ type: APP_ACTIONS.UPDATE_PRODUCT_CART, data: cart })
    }
  }, [])

  return (
      <ContainerHeader>
        <ContainerNav>
            <Link href="/">
              <a>
                <Image
                src="/assets/logo-siempre-en-casa.svg"
                alt="Siempre en casa"
                width={130}
                height={130}
                />
              </a>
            </Link>
            <CartSide>
              <LabelBox>Total: {getTotal(state.cart)} $</LabelBox>
              <Image
                src="/assets/cart-shopping-solid.svg"
                alt="Show cart"
                width={50}
                height={50}
                style={{ cursor: 'pointer' }}
                onClick={() => setModalVisible(true)}
              />
            </CartSide>
        </ContainerNav>
        {modalVisible && <Modal margin="2%" onBackgroundClick={() => setModalVisible(false) }>
          <ButtonBox onClick={() => setModalVisible(false) }>Cerrar detalle</ButtonBox>
          <CartList />
        </Modal>}

      </ContainerHeader>
  )
};
