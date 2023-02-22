import React, { useEffect, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import FontAwesome from '../utils/FontAwesome'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { userRegisterSchema } from '../utils/Schema'
import { signup } from '../../actions/userActions'
import Loading from '../bootstrap/Loading'
import Message from '../bootstrap/Message'

const ExitButton = React.memo(() => {
  return <FontAwesome icon='fas fa-times' color='#777' />
})

const QuestionIcon = React.memo(() => {
  return <FontAwesome icon='fas fa-question-circle' />
})

function SignupForm({ setShowForm }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const birthDateInfo = {
    bDay: new Date().getDate(),
    bMonth: new Date().getMonth() + 1,
    bYear: new Date().getFullYear(),
  }

  const [birthDate, setBirthDate] = useState(birthDateInfo)

  const { userRegister, loading, error } = useSelector(
    (state) => state.userRegister
  )

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userRegisterSchema),
  })

  const { bDay, bMonth, bYear } = birthDate

  const years = Array.from(
    new Array(118),
    (value, index) => new Date().getFullYear() - index
  )
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const days = Array.from(
    new Array(new Date(bYear, bMonth, 0).getDate()),
    (value, index) => 1 + index
  )
  const handleUpdateDay = (e) => {
    const { name, value } = e.target
    setBirthDate({ ...birthDate, [name]: value })
  }

  const handleHideForm = () => {
    setShowForm(false)
  }

  const onSubmit = (values) => {
    dispatch(signup(values))
  }

  useEffect(() => {
    if (userRegister) {
      setTimeout(() => {
        setShowForm(false)
      }, 2000)
    }
  }, [userRegister, navigate])

  return (
    <>
      <div className='blur'>
        <form className='signup_form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form_exit-icon' onClick={handleHideForm}>
            <ExitButton />
          </div>
          <h1>Đăng ký</h1>

          {loading && <Loading />}
          {error && <Message message={error} color='danger' />}

          <input
            {...register('firstName')}
            className={`signup_input ${errors.firstName && 'error-input'}`}
            type='text'
            placeholder='Họ'
          />

          {errors.firstName && (
            <div className='validation fistname-error'>
              {errors.firstName?.message}
            </div>
          )}

          <input
            {...register('lastName')}
            className={`signup_input ${errors.lastName && 'error-input'}`}
            type='text'
            placeholder='Tên'
          />

          {errors.lastName && (
            <div className='validation lastname-error'>
              {errors.lastName?.message}
            </div>
          )}

          <input
            {...register('email')}
            className={`signup_input ${errors.email && 'error-input'}`}
            type='email'
            placeholder='Nhập email'
          />

          {errors.email && (
            <div className='validation email-error'>
              {errors.email?.message}
            </div>
          )}

          <input
            {...register('password')}
            className={`signup_input ${errors.password && 'error-input'}`}
            type='password'
            placeholder='Mật khẩu mới'
          />

          {errors.password && (
            <div className='validation password-signup-error'>
              {errors.password?.message}
            </div>
          )}

          <div className='signup_birthdate-group'>
            <div className='signup_birthdate-heading'>
              <span>Sinh nhật</span> <QuestionIcon />
            </div>
            <div className='signup_birthdate-select'>
              <select
                {...register('bDay')}
                className={`${
                  errors.atLeast13 || errors.noMoreThan70 ? 'error-select' : ''
                }`}
                value={bDay}
                onChange={handleUpdateDay}
              >
                {days.map((day, index) => (
                  <option key={index} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <select
                {...register('bMonth')}
                className={`${
                  (errors.atLeast13 || errors.noMoreThan70) && 'error-select'
                }`}
                value={bMonth}
                onChange={handleUpdateDay}
              >
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </select>

              <select
                {...register('bYear')}
                className={`${
                  (errors.atLeast13 || errors.noMoreThan70) && 'error-select'
                }`}
                value={bYear}
                onChange={handleUpdateDay}
              >
                {years.map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {errors.atLeast13 && (
            <div className='validation date-error'>
              {errors.atLeast13?.message}
            </div>
          )}

          {errors.noMoreThan70 && (
            <div className='validation date-error'>
              {errors.noMoreThan70?.message}
            </div>
          )}

          <div className='signup_gender-group'>
            <div className='signup_birthdate-heading'>
              <span>Giới tính</span> <QuestionIcon />
            </div>
            <div className='signup_birthdate-select'>
              <div
                className={`gender-option ${errors.gender && 'error-select'}`}
              >
                <label htmlFor='female'>
                  Nữ
                  <input
                    {...register('gender')}
                    id='female'
                    type='radio'
                    value='Female'
                  />
                </label>
              </div>
              <div
                className={`gender-option ${errors.gender && 'error-select'}`}
              >
                <label htmlFor='male'>
                  Nam
                  <input
                    {...register('gender')}
                    id='male'
                    type='radio'
                    value='Male'
                  />
                </label>
              </div>
              <div
                className={`gender-option ${errors.gender && 'error-select'}`}
              >
                <label htmlFor='other'>
                  Khác
                  <input
                    {...register('gender')}
                    id='other'
                    type='radio'
                    value='Other'
                  />
                </label>
              </div>
            </div>
          </div>

          {errors.gender && (
            <div className='validation gender-error'>
              {errors.gender?.message}
            </div>
          )}

          <p className='signup_note'>
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách
            quyền riêng tư và Chính sách của chúng tôi. Bạn có thể nhận được
            thông báo của chúng tôi qua email và hủy nhận bất kỳ lúc nào
          </p>

          <button className='signup_register-button' type='submit'>
            Đăng ký
          </button>
        </form>
      </div>
    </>
  )
}

export default SignupForm
