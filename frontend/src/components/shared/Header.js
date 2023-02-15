import React, { useState } from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { useSelector } from 'react-redux'
import FontAwesome from '../utils/FontAwesome'
import Accessories from './Accessories'
import PCAndPrinter from './PCAndPrinter'
import Utilities from './Utilities'

function Header() {
  const { userInfo, loading, error } = useSelector((state) => state.userSignin)

  const [cartCount, setCartCount] = useState(0)
  const [isFocus, setIsFocus] = useState(false)
  const [isShowAccessories, setIsShowAccessories] = useState(false)
  const [isShowPCPrinter, setIsShowPCPrinter] = useState(false)
  const [isShowUtilities, setIsShowUtilities] = useState(false)

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <header>
          <div className='header__above'>
            <Link className='header__above-logo' to='/'>
              <strong>amazon</strong>
            </Link>

            <Formik
              initialValues={{
                content: '',
              }}
              onSubmit={(value) => {
                alert(JSON.stringify(value))
              }}
            >
              <Form className='header__above-search-form'>
                <input
                  name='content'
                  className='header__above-search-input'
                  type='text'
                  style={{
                    border: isFocus ? '2px solid var(--color-third)' : 'none',
                  }}
                  placeholder='Bạn tìm gì...'
                  onFocus={() => {
                    setIsFocus(true)
                  }}
                  onBlur={() => {
                    setIsFocus(false)
                  }}
                />

                <button
                  className='header__above-button'
                  title='Submit'
                  type='submit'
                >
                  <FontAwesome icon='far fa-search' />
                </button>
              </Form>
            </Formik>
            <div className='header__above-option'>
              <Link
                className='header__above-account'
                to={userInfo ? '/my-account' : '/signin'}
              >
                <span>
                  {userInfo ? `Hello, ${userInfo.name}` : 'Login'} <br />{' '}
                  <strong>Account & Lists</strong>
                </span>
              </Link>
              <Link className='header__above-order' to='/order-checking'>
                <span>
                  Returns <br /> <strong> & Orders</strong>
                </span>
              </Link>
              <Link className='header__above-cart' to='/cart'>
                <span className='cart__count'>{cartCount}</span>
                <FontAwesome icon='fab fa-opencart' color='#fff' />
                <span>Cart</span>
              </Link>
            </div>
          </div>
          <div className='header_below'>
            <div className='container'>
              <ul>
                <li>
                  <Link to='/category/cell-phones/order/discount'>
                    <FontAwesome icon='far fa-mobile' color='#fff' />
                    &ensp;
                    <span>Điện thoại</span>
                  </Link>
                </li>
                <li>
                  <Link to='/category/laptops/order/discount'>
                    <FontAwesome icon='far fa-laptop' color='#fff' />
                    &ensp;
                    <span>Laptop</span>
                  </Link>
                </li>
                <li>
                  <Link to='/category/tablets/order/discount'>
                    <FontAwesome icon='far fa-tablet' color='#fff' />
                    &ensp;
                    <span>Tablet</span>
                  </Link>
                </li>
                <li
                  onMouseEnter={() => {
                    setIsShowAccessories(true)
                  }}
                  onMouseLeave={() => {
                    setIsShowAccessories(false)
                  }}
                >
                  <Link to='/category/accessories/order/discount'>
                    <FontAwesome icon='far fa-headphones' color='#fff' />
                    &ensp;
                    <span>Phụ kiện</span>&ensp;
                    <FontAwesome icon='fas fa-caret-down' color='#fff' />
                  </Link>
                  {isShowAccessories && <Accessories />}
                </li>
                <li>
                  <Link to='/category/smart-watches/order/discount'>
                    <FontAwesome icon='far fa-watch-fitness' color='#fff' />
                    &ensp;
                    <span>Smartwatch</span>
                  </Link>
                </li>
                <li>
                  <Link to='/category/watches/order/discount'>
                    <FontAwesome icon='far fa-watch' color='#fff' />
                    &ensp;
                    <span>Đồng hồ</span>
                  </Link>
                </li>
                <li>
                  <Link to='/category/used-phones/order/discount'>
                    <FontAwesome icon='far fa-mobile-android' color='#fff' />
                    &ensp;
                    <span>Máy cũ giá rẻ</span>
                  </Link>
                </li>
                <li
                  onMouseEnter={() => {
                    setIsShowPCPrinter(true)
                  }}
                  onMouseLeave={() => {
                    setIsShowPCPrinter(false)
                  }}
                >
                  <Link to='/category/pc-printers/order/discount'>
                    <FontAwesome icon='far fa-desktop' color='#fff' />
                    &ensp;
                    <span>PC, Máy in</span>&ensp;
                    <FontAwesome icon='fas fa-caret-down' color='#fff' />
                  </Link>
                  {isShowPCPrinter && <PCAndPrinter />}
                </li>
                <li>
                  <Link to='/category/sim-cards/order/discount'>
                    <span>Sim, Thẻ cào</span>
                  </Link>
                </li>
                <li
                  onMouseEnter={() => {
                    setIsShowUtilities(true)
                  }}
                  onMouseLeave={() => {
                    setIsShowUtilities(false)
                  }}
                >
                  <Link to='/category/utilities/order/discount'>
                    <span>Dịch vụ tiện ích</span>&ensp;
                    <FontAwesome icon='fas fa-caret-down' color='#fff' />
                  </Link>
                  {isShowUtilities && <Utilities />}
                </li>
              </ul>
            </div>
          </div>
        </header>
      )}
    </>
  )
}

export default Header
