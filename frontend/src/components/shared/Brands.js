import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Brands({ brands }) {
  return (
    <div className='brand__list'>
      {brands.map((brand, index) => (
        <Link key={index} to='/'>
          <img key={index} src={brand.image} alt={brand.name} />
        </Link>
      ))}
    </div>
  )
}

export default Brands
