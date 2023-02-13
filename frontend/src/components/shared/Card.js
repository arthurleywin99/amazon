import React from 'react'
import FontAwesome from '../utils/FontAwesome'

function Card({ product }) {
  return (
    <div className='card'>
      <div className='card__image'>
        <img src={product.image} alt={product.name} />
        {product.isMonolopy && (
          <img src='/images/Label_01-05.png' alt='Monopoly' />
        )}
      </div>
      <div className='card__content'>
        {product.preorder.isDisplay && (
          <p className='card__preorder'>{product.preorder.content}</p>
        )}
        {product.sale.isDisplay && (
          <p className='card__sale'>
            <img src='/images/icon3-50x50.png' alt='Icon' />
            <span>{product.sale.content}</span>
          </p>
        )}
        <p className='card__product-name'>{product.name}</p>
        {product.isComingSoon && (
          <p className='card__coming-soon'>Hàng sắp về</p>
        )}
        <p className='card__price'>
          <span>{product.price}</span>
          <span>{product.discount}</span>
        </p>
        <p className='card__rating'>
          <span className='card__rating-average'>
            {product.rating.average}&nbsp;&nbsp;
            <FontAwesome icon='fas fa-star' />
          </span>
          <span className='card__rating-quantity'>
            ({product.rating.quantity})
          </span>
        </p>
        <p className='card__description'>{product.description}</p>
      </div>
    </div>
  )
}

export default Card
