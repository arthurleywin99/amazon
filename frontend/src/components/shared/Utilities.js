import React from 'react'
import { Link } from 'react-router-dom'

function Utilities() {
  return (
    <div className='header__below-utilities-nav'>
      <div>
        <h5 className='utility-heading'>Thanh toán hoá đơn</h5>
        <Link to='/'>Đóng tiền trả góp</Link>
        <Link to='/'>Đóng tiền điện</Link>
        <Link to='/'>Đóng tiền nước</Link>
        <Link to='/'>Đóng tiền NET FPT</Link>
        <Link to='/'>Đóng tiền net, cáp VNPT</Link>
        <Link to='/'>Mua gói truyền hình</Link>
        <Link to='/'>Vé tàu, xe, máy bay</Link>
        <Link to='/'>Viện phí ĐH Y DƯỢC TPHCM</Link>
      </div>
      <div>
        <h5 className='utility-heading'>Tài chính - bảo hiểm</h5>
        <Link to='/'>Mua bảo hiểm xe máy, ô tô</Link>
        <Link to='/'>Đóng tiền bảo hiểm</Link>
      </div>
      <div>
        <div>
          <h5 className='utility-heading'>Tiện ích viễn thông</h5>
          <Link to='/'>Lắp đặt gói internet, truyền hình</Link>
          <Link to='/'>Mua gói data 3G, 4G</Link>
          <Link to='/'>Nạp tiền trả trước</Link>
          <Link to='/'>Nạp tiền trả sau</Link>
          <Link to='/'>Thẻ cào game</Link>
          <Link to='/'>Thẻ cào điện thoại</Link>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Utilities
