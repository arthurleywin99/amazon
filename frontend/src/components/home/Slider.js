import React from 'react'
import FontAwesome from '../utils/FontAwesome'

function Slider({ bigBanner }) {
  return (
    <div
      className='main__banner-big'
      style={{
        background: `url(${bigBanner})`,
      }}
    >
      <div className='main__slider'>
        <div className='main__button-prev'>
          <FontAwesome icon='far fa-chevron-left' color='#000' />
        </div>
        <img className='slider__img-left' src='' alt='' />
        <img className='slider__img-right' src='' alt='' />
        <div className='main__button-next'>
          <FontAwesome icon='far fa-chevron-right' color='#000' />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Slider)
