import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ImageDropComponent from '../../account/info/ImageDropComponent'
import FontAwesome from '../../utils/FontAwesome'

function AdminBrandUpdateComponent() {
  const navigate = useNavigate()
  const { id } = useParams()

  const { userInfo } = useSelector((state) => state.userSignin)

  const [brand, setBrand] = useState(null)
  const [loading, setLoading] = useState(false)
  const [btnloading, setBtnLoading] = useState(false)
  const [error, setError] = useState(null)

  const [media, setMedia] = useState(null)
  const [highlighted, setHighlighted] = useState(false)
  const [mediaPreview, setMediaPreview] = useState(null)

  const inputRef = useRef(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/brands/${id}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setBrand(data.message)
        setLoading(false)
      })
      .catch((err) => setError(err.message))
  }, [])

  const handleMediaChange = (e) => {
    const { files } = e.target
    setMedia(files[0])
    setMediaPreview(URL.createObjectURL(files[0]))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setBrand((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const updateWebInfoHandler = () => {
    setBtnLoading(true)
    let formData = new FormData()
    formData.set('file', media)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/utils/cloudinary-upload`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const imageUrl = data.message
          fetch(`${process.env.REACT_APP_BACKEND_URL}/api/brands`, {
            method: 'PUT',
            headers: new Headers({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userInfo.token}`,
            }),
            body: JSON.stringify({ id: brand._id, name: brand.name, imageUrl }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data) {
                setBtnLoading(false)
                navigate(-1)
              }
            })
            .catch((err) => {
              setBtnLoading(false)
              setError(err.message)
            })
        }
      })
      .catch((err) => {
        setBtnLoading(false)
        setError(err.message)
      })
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <h2>Cập nhật</h2>
      <button
        className='text-[18px] px-[10px] py-[5px] bg-cyan-600 text-white rounded'
        onClick={() => navigate(-1)}
      >
        Trở về
      </button>
      <div className='flex justify-center'>
        <div className='w-[400px]'>
          <div className='flex items-center justify-between'>
            <label className='text-[18px] font-bold' htmlFor='id'>
              ID
            </label>
            <input
              className='text-base px-3 py-3.5 my-2.5 w-[85%] border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
              type='text'
              value={brand?._id}
              id='id'
              disabled
              placeholder=''
            />
          </div>
          <div className='flex items-center justify-between'>
            <label className='text-[18px] font-bold' htmlFor='id'>
              Tên
            </label>
            <input
              className='text-base px-3 py-3.5 my-2.5 w-[85%] border border-solid rounded-md bg-white border-borderbtn focus:border focus:border-solid focus:border-btn focus:outline-none'
              type='text'
              value={brand?.name}
              name='name'
              placeholder=''
              onChange={handleChange}
            />
          </div>
          <div className='flex items-center justify-between'>
            <label className='text-[18px] font-bold' htmlFor='id'>
              Ảnh
            </label>
            <ImageDropComponent
              customClassName={`text-center w-[300px]`}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
              mediaPreview={mediaPreview}
              setMediaPreview={setMediaPreview}
              inputRef={inputRef}
              handleMediaChange={handleMediaChange}
              setMedia={setMedia}
            />
          </div>
          <div className='text-center mt-[20px]'>
            <button
              className='px-[60px] py-[10px] bg-green-600 text-white uppercase text-[18px] font-bold rounded hover:bg-green-800'
              type='submit'
              onClick={updateWebInfoHandler}
            >
              {btnloading && <FontAwesome icon='animate-spin fal fa-circle-notch' />} Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminBrandUpdateComponent
