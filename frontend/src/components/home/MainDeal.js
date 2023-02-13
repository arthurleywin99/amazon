import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../shared/Card'
import FontAwesome from '../utils/FontAwesome'

function MainDeal({ dealBanner, products }) {
  return (
    <div className='main__deal'>
      <img src={dealBanner} alt='Deal Banner' />
      <div className='main__list-product-deal'>
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
        <Link className='main__deal-see-more' to='/'>
          Xem tất cả
        </Link>
      </div>
    </div>
  )
}

export default MainDeal
