import React, { useState } from 'react'
import './style.css'
import { datas } from '../../data'
import Slider from './Slider'
import MiddleBanner from './MiddleBanner'
import MainDeal from './MainDeal'
import SamsungDeal from './SamsungDeal'
import Suggestions from './Suggestions'

function Main() {
  const [bigBanner, setBigBanner] = useState('/images/midbanner.jpg')
  const [mediumBanner, setMediumBanner] = useState('/images/banner.png')
  const [dealBanner, setDealBanner] = useState('/images/mid-banner-2.png')

  return (
    <main>
      <Slider bigBanner={bigBanner} />

      <div className='container mt-12'>
        <MiddleBanner mediumBanner={mediumBanner} />

        <MainDeal dealBanner={dealBanner} products={datas.products} />

        <SamsungDeal products={datas.products} />

        <Suggestions products={datas.products} />
      </div>
    </main>
  )
}

export default Main
