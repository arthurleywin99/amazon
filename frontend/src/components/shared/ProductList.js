import React, { useRef, useState } from 'react'
import Card from './Card'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProductList() {
  const { order } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { products, loading, error } = useSelector(
    (state) => state.getProductByCategory
  )

  const [productList, setProductList] = useState(products.slice(0, 15))
  const pageNumberRef = useRef(1)

  const handleChange = (e) => {
    navigate(
      `/${location.pathname.split('/').splice(1, 3).join('/')}/${
        e.target.value
      }`
    )
    if (e.target.value === 'discount') {
      setProductList(
        products
          .sort((a, b) => (a.discount > b.discount ? 1 : -1))
          .slice(0, pageNumberRef.current * 15)
      )
    } else if (e.target.value === 'decrease') {
      setProductList(
        products
          .sort((a, b) => (a.price < b.price ? 1 : -1))
          .slice(0, pageNumberRef.current * 15)
      )
    } else {
      setProductList(
        products
          .sort((a, b) => (a.price > b.price ? 1 : -1))
          .slice(0, pageNumberRef.current * 15)
      )
    }
  }

  const handleSeemore = () => {
    pageNumberRef.current++
    setProductList(
      products.slice(
        0,
        pageNumberRef.current * 15 < products.length
          ? pageNumberRef.current * 15
          : products.length
      )
    )
  }

  return loading && <div>Loading</div> ? (
    error && <div>Error</div>
  ) : (
    <div className='product__list'>
      <div className='product__list-heading'>
        <h4>{products.length || 0} Kết quả</h4>
        <select value={order} onChange={handleChange}>
          <option value='discount'>% Giảm</option>
          <option value='decrease'>Giá cao đến thấp</option>
          <option value='increase'>Giá thấp đến cao</option>
        </select>
      </div>
      <div className='product__list-result'>
        {productList &&
          productList.map((product, index) => (
            <Link to={`/`} key={index} className='product__list-card'>
              <Card product={product} />
            </Link>
          ))}
      </div>
      {pageNumberRef.current * 15 <= products.length && (
        <button type='button' onClick={handleSeemore}>
          Xem thêm
        </button>
      )}
    </div>
  )
}

export default ProductList
