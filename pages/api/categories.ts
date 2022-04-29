// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ModelSchema } from '../../libs/models'
import entities from './entities'

export default function handler (
  req: NextApiRequest,
  res: NextApiResponse<ModelSchema['categoriesSchema']>
) {
  res.status(200).json(entities.categories)
}
