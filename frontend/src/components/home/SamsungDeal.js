import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../shared/Card'
import FontAwesome from '../utils/FontAwesome'

function SamsungDeal() {
  const { products, loading, error } = useSelector(
    (state) => state.getSamsungTopDiscount
  )

  const counterRef = useRef(0)

  const [productList, setProductList] = useState(products.slice(0, 5))

  useEffect(() => {
    setInterval(() => {
      handleNext()
    }, 3000)
  }, [])

  const handlePrev = () => {
    if (counterRef.current - 5 < 0) {
      counterRef.current = 5
    } else {
      counterRef.current -= 5
    }
    setProductList(products.slice(counterRef.current, counterRef.current + 5))
  }

  const handleNext = () => {
    if (counterRef.current + 5 >= products.length) {
      counterRef.current = 0
    } else {
      counterRef.current += 5
    }
    setProductList(products.slice(counterRef.current, counterRef.current + 5))
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>Error</div>
  ) : (
    <div className='samsung__deal'>
      <h1 className='samsung__deal-heading'>Tuần lễ Samsung</h1>
      <div className='samsung__list-product-deal'>
        {products.length > 5 && (
          <div className='main__list-product-button-prev' onClick={handlePrev}>
            <FontAwesome icon='far fa-chevron-left' />
          </div>
        )}
        <ul>
          {productList.map((product, index) => (
            <li key={index}>
              <Card product={product} />
            </li>
          ))}
        </ul>
        {products.length > 5 && (
          <div className='main__list-product-button-next' onClick={handleNext}>
            <FontAwesome icon='far fa-chevron-right' />
          </div>
        )}
      </div>
    </div>
  )
}

export default SamsungDeal
