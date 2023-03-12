import React from 'react'

function ProductComponent({ product }) {
  return (
    <div className='container'>
      <div className='product_wrapper'>
        <div className='product_image'>
          <img src={product.images[0]} alt={product.name} />
        </div>
        <div className='product_left'>
          <h1>{product.name}</h1>
          <div>Loại: {product.category}</div>
          <div>Hãng: {product.brand.name}</div>
          <div>{product.price}</div>
          <div>{product.price + (product.price * product.discount) / 100}</div>
          <div>Số lượng tồn: {product.countInStock}</div>
          <div>{product.description}</div>
        </div>
        <div className='product_right'>
          {product.settings.length > 0 &&
            product.settings.map((item, index) => {
              return (
                <div key={index}>
                  <div>{item.key}</div>
                  <div>{item.value}</div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default ProductComponent
