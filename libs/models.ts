interface ProductSchema {
    product_id: string
    variant_id: string
    total_price: string
    price_per_unit: string
    list_price_id: string
    sku: string
    categories?: Array<string>
    units_per_pack: number
    image_url: string
    handle: string
    compare_at_price: string
    allowed_packs: Array<number>
    name: string
    description: string
    discount_percentage: number
    size: number
    price_per_litre: string
}

interface RecommendationSchema {
  product_id: string
  recommendations: Array<string>
}

interface CartSchema {
  product: ProductSchema
  quantity: number
}

interface ProductsCartSchema {
  [key: string]: CartSchema
}

export interface ModelSchema {
  productSchema: ProductSchema
  categoriesSchema: Array<string>
  recommendationsSchema: Array<RecommendationSchema>
  recommendationSchema: RecommendationSchema
  productsCartSchema: ProductsCartSchema
  cartSchema: CartSchema
  productsSchema: Array<ProductSchema>
}

export interface ItemState {
  product?: ModelSchema['productSchema']
  cart: ModelSchema['productsCartSchema'] | {}
  products: ModelSchema['productsSchema']
  filtered_products: ModelSchema['productsSchema']
}

export interface Action {
  type: string
  data: ModelSchema['productsSchema'] | ModelSchema['productSchema'] | ModelSchema['productsCartSchema']
}

export const appDefaultState = {
  filtered_products: [],
  products: [],
  cart: {}
}
