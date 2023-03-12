import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductById } from '../actions/productActions'
import ProductComponent from '../components/product/ProductComponent'

function ProductScreen() {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { product, loading, error } = useSelector(
    (state) => state.getProductById
  )

  useEffect(() => {
    dispatch(getProductById(id))
  }, [dispatch])

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    product && <ProductComponent product={product} />
  )
}

export default ProductScreen
