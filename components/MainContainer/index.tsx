import { useEffect, useState } from 'react'

import Image from 'next/image'
import get from 'lodash.get'
import Container from './MainContainer.styled'
import {
  LoadingBox
} from '../Common.styled'
import ProductList from '../ProductList'
import { useAppContext } from '../../libs/context-lib'
import { APP_ACTIONS } from '../../libs/reducerAction-lib'
import { getProducts } from '../../libs/services'

export default function MainContainer () {
  const { state, dispatch } = useAppContext()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const response = await getProducts()
        const products = get(response, 'data', [])
        dispatch({ type: APP_ACTIONS.RESET_PRODUCTS, data: products })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    if (state.products.length === 0) {
      loadProducts()
    }
  }, [state.products])

  return (
    <Container>
      {loading
        ? (
        <LoadingBox >
          <Image src="/assets/loading.svg" width={100} height={100} alt="Cargando" />
        </LoadingBox>
          )
        : (
        <ProductList list={state.filtered_products} />
          )}
    </Container>
  )
}
