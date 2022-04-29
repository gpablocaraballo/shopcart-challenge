import Image from 'next/image'
import styled from 'styled-components'
import themeConfig from '../../libs/theme'

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: ${themeConfig.maxWidthContainerPx}px;
  justify-content: center;
  margin-top: 20px;
`

export const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;  
  width: 100%;
  max-width: ${themeConfig.maxWidthContainerPx}px;
  justify-content: center;
  margin-top: 20px;
`

export const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
`

export const ListItem = styled.div`
  border-radius: 15px;
  background-color: white;
  box-shadow: 1px 1px 10px 1px black;
  width: 250px;
  height: 400px;
  margin: 10px !important;
  padding: 15px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: opacity 0.3s;
  opacity: 0.8;
  &:hover,
  &:focus {
    opacity: 1;
  }
`
export const CartListItem = styled.div`
  border-radius: 15px;
  background-color: white;
  box-shadow: 1px 1px 10px 1px black;
  width: 100%;
  max-width:  ${themeConfig.maxWidthCartListBoxPx}px;
  height: 150px;
  margin: 10px !important;
  padding: 30px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export const CartListBody = styled.div`
  display: flex;
`
export const CartLabels = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 15px;
`

export const ImgUnvavailable = styled(Image)`
  max-width: 250px;  
  max-height: 200px;
`

export const ItemName = styled.div`
  font-size: 16px;
  font-weigth: 500;
  color: black;
  text-overflow: ellipsis;
  height: 80px;
  @supports (-webkit-line-clamp: 2) {
    white-space: initial;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }     
`

export const ItemPrice = styled.div`
  display: flex;
`

export const ItemPriceValue = styled.div`
  color: ${themeConfig.color.Price};
  font-size: 20px;
  font-weigth: 500;
`

export const ItemQuantity = styled.div`
  color: ${themeConfig.color.Price};
  font-size: 20px;
  font-weigth: 500;
`

export const ItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
`

export const ItemPriceCurrency = styled(ItemPriceValue)`
  margin-left: 5px;
`

export const CartOperationsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
  .OperationBlock {
    height: 35px;
  }
`
export const OperationContainer = styled(ItemPriceValue)`
  display: flex;
  height: 80px;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  justify-content: space-between;
`
