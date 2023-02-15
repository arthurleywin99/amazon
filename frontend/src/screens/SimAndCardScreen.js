import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductByCategory } from '../actions/productActions'
import Brands from '../components/shared/Brands'
import ProductList from '../components/shared/ProductList'
import { SIM_AND_CARD } from '../constants/categoryConstants'

function SimAndCardScreen() {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(
    (state) => state.getProductByCategory
  )

  const [brands, setBrands] = useState([])

  useEffect(() => {
    dispatch(
      getProductByCategory({ category: SIM_AND_CARD, order: 'discount' })
    )
  }, [dispatch])

  useEffect(() => {
    if (products) {
      const data = products
        .map((item) => item.brand)
        .reduce((accumulator, current) => {
          if (!accumulator.some((x) => x._id === current._id)) {
            accumulator.push(current)
          }
          return accumulator
        }, [])
      setBrands(data)
    }
  }, [products])

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className='container mt-3'>
      {brands && <Brands brands={brands} />}
      {products && <ProductList category={SIM_AND_CARD} />}
    </div>
  )
}

export default SimAndCardScreen
