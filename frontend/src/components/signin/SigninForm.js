import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userLoginSchema } from '../utils/Schema'
import Loading from '../bootstrap/Loading'
import Message from '../bootstrap/Message'
import { USER_REGISTER_RESET } from '../../constants/userConstants'
import { signin } from '../../actions/userActions'

function SigninForm({ setShowForm }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const firstTouchedRef = useRef(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userLoginSchema),
  })

  const { userRegister } = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = useSelector((state) => state.userSignin)

  const handleShowForm = () => {
    setShowForm(true)
  }

  const handleFocus = () => {
    if (firstTouchedRef.current && userRegister) {
      dispatch({ type: USER_REGISTER_RESET })
    }
  }

  const onSubmit = (values) => {
    dispatch(signin(values))
  }

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, navigate])

  return (
    <div className='container'>
      <form className='signin_form' onSubmit={handleSubmit(onSubmit)}>
        <h1>Đăng nhập</h1>

        {loading && <Loading />}
        {userRegister && firstTouchedRef.current && (
          <Message
            message='Đăng ký thành công, vui lòng đăng nhập'
            color='success'
          />
        )}
        {error && <Message message={error} color='danger' />}

        <input
          {...register('username')}
          onFocus={handleFocus}
          placeholder='Email hoặc số điện thoại'
          className={`signin_input ${errors.username && 'error-input'}`}
          type='text'
        />

        {errors.username && (
          <div className='validation username-error'>
            {errors.username?.message}
          </div>
        )}

        <input
          {...register('password')}
          placeholder='Mật khẩu'
          className={`signin_input ${errors.password && 'error-input'}`}
          type='password'
        />

        {errors.password && (
          <div className='validation password-signin-error'>
            {errors.password?.message}
          </div>
        )}

        <button type='submit'>Đăng nhập</button>
        <Link className='signin_forgot_password' to='/'>
          Quên mật khẩu?
        </Link>
        <div className='signin_divide'></div>
        <Link className='signin_register-button' onClick={handleShowForm}>
          Tạo tài khoản mới
        </Link>
      </form>
    </div>
  )
}

export default SigninForm
