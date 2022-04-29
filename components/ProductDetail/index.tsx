import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import get from 'lodash.get'
import {
  Container,
  DetailContainer,
  BodyContainer,
  DataContainerImage,
  DataContainerText,
  ImgUnvavailable,
  ImgDetail,
  ItemName,
  ItemDescription,
  ItemPrice,
  ItemPriceValue,
  ItemPriceCurrency,
  CartOperationsContainer
} from './ProductDetail.styled'
import { LoadingBox, LabelBox } from '../Common.styled'
import { useAppContext } from '../../libs/context-lib'
import { APP_ACTIONS } from '../../libs/reducerAction-lib'
import { getProductById, getRecommendations } from '../../libs/services'
import { ModelSchema } from '../../libs/models'
import ProductList from '../ProductList'
import CartOperations from '../ProductList/CartOperations'

export default function ProductDetail () {
  const { dispatch, state } = useAppContext()
  const router = useRouter()
  const query = router.query
  const [loading, setLoading] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [recommendedProducts, setRecommendedProducts] = useState<ModelSchema['productsSchema'] | null>(null)

  useEffect(() => {
    const loadRecommendations = async (productId: string) => {
      try {
        const response = await getRecommendations(productId)
        const recommendations = get(response, 'data', [])
        setRecommendedProducts(recommendations)
      } catch (err) {
        console.log(err)
      }
    }
    const loadProductById = async (id:string) => {
      setLoading(true)
      try {
        const response = await getProductById(id)
        const product = get(response, 'data', null)
        dispatch({ type: APP_ACTIONS.SET_PRODUCT, data: product })
        loadRecommendations(product.product_id)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    const productId = get(query, 'id', '')
    if (productId !== '' && (!state.product || state.product.product_id)) {
      loadProductById(productId.toString())
    }
  }, [query])

  return (
    <Container>
      {loading
        ? (
        <LoadingBox>
          <Image src="/assets/loading.svg" width={100} height={100} alt="Cargando" />
        </LoadingBox>
          )
        : (
        <DetailContainer>
          <Link href="/">
            <LabelBox style={{ marginLeft: '20px', cursor: 'pointer' }}>VOLVER</LabelBox>
          </Link>
          {state.product && state.product.product_id && (
            <>
              <BodyContainer>
                <DataContainerImage>
                  {state.product.image_url && state.product.image_url && !imageFailed
                    ? (
                    <ImgDetail src={get(state.product, 'image_url', '')} onError={() => setImageFailed(true)} />
                      )
                    : (
                    <ImgUnvavailable width={200} height={200} src="/assets/no-image.png" alt="unavailable" />
                      )}
                </DataContainerImage>
                <DataContainerText>
                  <ItemName>{state.product.name}</ItemName>
                  <ItemDescription>
                    {state.product.description}
                  </ItemDescription>
                  <ItemPrice>
                    <ItemPriceValue>{state.product.price_per_unit}</ItemPriceValue>
                    <ItemPriceCurrency>$</ItemPriceCurrency>
                  </ItemPrice>
                  <CartOperationsContainer>
                    <CartOperations item={state.product}/>
                  </CartOperationsContainer>
                </DataContainerText>
              </BodyContainer>
            </>
          )}
        </DetailContainer>
          )}
          {recommendedProducts && recommendedProducts.length > 0 && (
            <>
              <LabelBox style={{ marginLeft: '100px' }} medium>Productos relacionados</LabelBox>
              <ProductList list={recommendedProducts}/>
            </>
          )}
    </Container>
  )
}
