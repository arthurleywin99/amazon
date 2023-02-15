import React, { useEffect, useState } from 'react'
import './style.css'
import Slider from './Slider'
import MiddleBanner from './MiddleBanner'
import MainDeal from './MainDeal'
import SamsungDeal from './SamsungDeal'
import Suggestions from './Suggestions'
import { getWebInfo } from '../../actions/webInfoActions'
import {
  getProductDiscount,
  getSamsungDiscount,
} from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

function Main() {
  const dispatch = useDispatch()

  const {
    data,
    loading: getWebInfoLoading,
    error: getWebInfoError,
  } = useSelector((state) => state.getWebInfo)
  const {
    products: topDealProducts,
    loading: getTopDiscountLoading,
    error: getTopDiscountError,
  } = useSelector((state) => state.getProductTopDiscount)
  const {
    products: samsungDealProducts,
    loading: getSamsungTopDiscountLoading,
    error: getSamsungTopDiscountError,
  } = useSelector((state) => state.getSamsungTopDiscount)

  useEffect(() => {
    dispatch(getWebInfo())
    dispatch(getProductDiscount())
    dispatch(getSamsungDiscount())
  }, [dispatch])

  return getWebInfoLoading ||
    getTopDiscountLoading ||
    getSamsungTopDiscountLoading ? (
    <div>Loading</div>
  ) : getWebInfoError || getTopDiscountError || getSamsungTopDiscountError ? (
    <div>Error</div>
  ) : (
    <main>
      {data && (
        <>
          <Slider
            banner={data.filter((item) => item.name === 'Big Banner')[0].image}
            data={data}
          />
          <div className='container mt-12'>
            <MiddleBanner
              image={
                data.filter((item) => item.name === 'Medium Banner')[0].image
              }
            />

            {topDealProducts && (
              <MainDeal
                dealBanner={
                  data.filter((item) => item.name === 'Deal Banner')[0].image
                }
              />
            )}

            {samsungDealProducts && <SamsungDeal />}
            {/*
            <Suggestions products={datas.products} /> */}
          </div>
        </>
      )}
    </main>
  )
}

export default Main
