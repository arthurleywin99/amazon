import React from 'react'
import { Link } from 'react-router-dom'

function PCAndPrinter() {
  return (
    <div className='header__below-pc-printer-nav d-none'>
      <Link to='/'>Máy in</Link>
      <Link to='/'>Mực in</Link>
      <Link to='/'>Màn hình máy tính</Link>
      <Link to='/'>Máy tính để bàn</Link>
    </div>
  )
}

export default PCAndPrinter
