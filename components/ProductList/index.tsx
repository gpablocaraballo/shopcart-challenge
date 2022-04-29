import {
  Container,
  ProductContainer,
  ListContainer
} from './ProductList.styled'
import {
  LabelBox
} from '../Common.styled'
import Item from './Item'
import { ModelSchema } from '../../libs/models'

interface Props {
  list: ModelSchema['productsSchema']
}

export default function ProductList ({ list }: Props) {
  return (
    <Container>
      <ProductContainer>
        <ListContainer>
          {(list && list.length > 0)
            ? (
            <>
              {list.map((row) => (
                <Item key={row.product_id} item={row} />
              ))}
            </>
              )
            : (list && list.length === 0) && <LabelBox>No items found.</LabelBox>}
        </ListContainer>
      </ProductContainer>
    </Container>
  )
}
