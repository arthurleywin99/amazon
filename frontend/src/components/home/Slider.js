import React, { useEffect, useRef, useState } from 'react'
import FontAwesome from '../utils/FontAwesome'

function Slider({ banner, data }) {
  const counterRef = useRef(0)

  const [images, setImages] = useState({
    left: data.filter((item) => item.name === 'Slider 1')[0].image,
    right: data.filter((item) => item.name === 'Slider 2')[0].image,
  })

  useEffect(() => {
    setInterval(() => {
      handleNext()
    }, 3000)
  }, [])

  const handlePrev = () => {
    if (counterRef.current === 0) {
      counterRef.current = 2
    } else {
      counterRef.current--
    }
    setImages({
      left: data.filter(
        (item) => item.name === `Slider ${counterRef.current + 1}`
      )[0].image,
      right: data.filter(
        (item) => item.name === `Slider ${counterRef.current + 2}`
      )[0].image,
    })
  }

  const handleNext = () => {
    if (counterRef.current === 2) {
      counterRef.current = 0
    } else {
      counterRef.current++
    }
    setImages({
      left: data.filter(
        (item) => item.name === `Slider ${counterRef.current + 1}`
      )[0].image,
      right: data.filter(
        (item) => item.name === `Slider ${counterRef.current + 2}`
      )[0].image,
    })
  }

  return (
    <div
      className='main__banner-big'
      style={{
        background: `url(${banner})`,
      }}
    >
      <div className='main__slider'>
        <div className='main__button-prev' onClick={handlePrev}>
          <FontAwesome icon='far fa-chevron-left' color='#000' />
        </div>
        <img className='slider__img-left' src={images.left} alt='Slider 1' />
        <img className='slider__img-right' src={images.right} alt='Slider 2' />
        <div className='main__button-next' onClick={handleNext}>
          <FontAwesome icon='far fa-chevron-right' color='#000' />
        </div>
      </div>
    </div>
  )
}

export default React.memo(Slider)
