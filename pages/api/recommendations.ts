// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import get from 'lodash.get'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ModelSchema } from '../../libs/models'
import entities from './entities'

const transformRecommendationToProducts = (recommendations:ModelSchema['recommendationsSchema'], originalProducts: ModelSchema['productsSchema']) => {
  const recommendationsArr = get(recommendations, '[0].recommendations', [])
  const productsRecommendations:ModelSchema['productsSchema'] = []
  let product
  recommendationsArr.forEach((item:string) => {
    product = originalProducts.find((product:ModelSchema['productSchema']) => product.product_id === item)
    if (product) {
      productsRecommendations.push(product)
    }
  })
  return productsRecommendations
}

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<ModelSchema['productsSchema']>
) {
  const { query } = req
  const recommendations = entities.recommendations.filter((item: ModelSchema['recommendationSchema']) => item.product_id === query.product_id)
  const filteredProduct = transformRecommendationToProducts(recommendations, entities.products)
  res.status(200).json(filteredProduct)
}
