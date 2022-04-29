// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ModelSchema } from '../../libs/models'
import entities from './entities'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<ModelSchema['productSchema'] | ModelSchema['productsSchema'] | undefined>
) {
  const { query } = req
  if (query && query.id) {
    const filteredProduct = entities.products.find((item: ModelSchema['productSchema']) => item.product_id === query.id)
    res.status(200).json(filteredProduct)
  } else {
    res.status(200).json(entities.products)
  }
}
