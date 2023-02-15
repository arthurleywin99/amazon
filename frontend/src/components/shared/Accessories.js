import React from 'react'
import { Link } from 'react-router-dom'
import { datas } from '../../data'

function Accessories() {
  return (
    <div className='header__below-accessories-nav'>
      <div>
        <h5 className='accessory-heading'>Phụ kiện di động</h5>
        {datas.mobileAccessories.map((accessory, index) => (
          <Link key={index} to={accessory.to}>
            {accessory.name}
          </Link>
        ))}
      </div>
      <div>
        <h5 className='accessory-heading'>Phụ kiện laptop</h5>
        {datas.laptopAccessories.map((accessory, index) => (
          <Link key={index} to={accessory.to}>
            {accessory.name}
          </Link>
        ))}
        <h5 className='accessory-heading'>Thiết bị âm thanh</h5>
        {datas.audioAccessories.map((accessory, index) => (
          <Link key={index} to={accessory.to}>
            {accessory.name}
          </Link>
        ))}
      </div>
      <div>
        <h5 className='accessory-heading'>Thiết bị nhà thông minh</h5>
        {datas.smartHomeAccessories.map((accessory, index) => (
          <Link key={index} to={accessory.to}>
            {accessory.name}
          </Link>
        ))}
        <h5 className='accessory-heading'>Thiết bị lưu trữ</h5>
        {datas.storageAccessories.map((accessory, index) => (
          <Link key={index} to={accessory.to}>
            {accessory.name}
          </Link>
        ))}
      </div>
      <div>
        <h5 className='accessory-heading'>Thương hiệu hàng đầu</h5>
        {datas.topBrands.map((accessory, index) => (
          <Link key={index} to={accessory.to}>
            {accessory.name}
          </Link>
        ))}
        <h5 className='accessory-heading'>Phụ kiện khác</h5>
        {datas.othersAccessories.map((accessory, index) => (
          <Link key={index} to={accessory.to}>
            {accessory.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Accessories
