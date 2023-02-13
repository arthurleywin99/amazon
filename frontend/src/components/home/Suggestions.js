import React from 'react'
import Card from '../shared/Card'

function Suggestions({ products }) {
  return (
    <div className='main__suggestions'>
      <h1>Gợi ý hôm nay</h1>
      <div className='main__suggestions-container'>
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <Card product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Suggestions
