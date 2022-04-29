import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import get from 'lodash.get'
import {
  Container,
  Label,
  Select
} from './Categories.styled'
import { getCategories } from '../../libs/services'
import { useAppContext } from '../../libs/context-lib'
import { APP_ACTIONS } from '../../libs/reducerAction-lib'
import { ModelSchema } from '../../libs/models'

const Categories = () => {
  const { state, dispatch } = useAppContext()
  const router = useRouter()
  const query = router.query

  const [categories, setCategories] = useState<Array<string>>([])
  const [category, setCategory] = useState<string>('')

  const setProducts = (products:ModelSchema['productsSchema'], categoryName:string) => {
    let filteredProducts:ModelSchema['productsSchema']
    if (categoryName === '') {
      filteredProducts = products
    } else {
      filteredProducts = products.filter((item: ModelSchema['productSchema']) => item.categories?.includes(categoryName))
    }
    dispatch({ type: APP_ACTIONS.SET_PRODUCTS, data: filteredProducts })
  }

  const onCategoryChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryName:string = event.target.value
    setCategory(categoryName)
    const path = categoryName === '' ? '/products' : `/products?cat=${categoryName}`
    router.push(path, undefined, { shallow: true })
  }

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategories()
        const result = get(response, 'data', [])
        setCategories(result)
      } catch (err) {
        console.log(err)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    // usefull when you share the "url link" with your folks, its set the category based on the uri param
    const cat = get(query, 'cat', '')
    const categoryName:string = cat.toString()
    setCategory(categoryName)
    setProducts(state.products, categoryName)
  }, [query])

  return (
      <Container>
        <Label>Categoria</Label>
        <Select value={category} onChange={onCategoryChanged}>
          <option value="">Todas</option>
          {categories.map((item) => <option key={item} value={item} >{item}</option>)}
        </Select>
      </Container>
  )
}

export default Categories
