import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../shared/Card'
import FontAwesome from '../utils/FontAwesome'

function SamsungDeal({ products }) {
  return (
    <div className='samsung__deal'>
      <h1 className='samsung__deal-heading'>Tuần lễ Samsung</h1>
      <div className='samsung__list-product-deal'>
        <div className='main__list-product-button-prev'>
          <FontAwesome icon='far fa-chevron-left' />
        </div>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <Card product={product} />
            </li>
          ))}
        </ul>
        <div className='main__list-product-button-next'>
          <FontAwesome icon='far fa-chevron-right' />
        </div>
        <Link className='samsung__deal-see-more' to='/'>
          Xem tất cả sản phẩm
        </Link>
      </div>
    </div>
  )
}

export default SamsungDeal
