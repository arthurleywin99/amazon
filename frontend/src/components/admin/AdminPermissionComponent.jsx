import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { calculateTime } from '../utils/utils.js'

function AdminPermissionComponent() {
  const navigate = useNavigate()

  const { userInfo } = useSelector((state) => state.userSignin)

  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getData = () => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/users/getall`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAccounts(data.message)
        setLoading(false)
      })
      .catch((err) => setError(err))
  }

  useEffect(() => {
    setLoading(true)
    getData()
  }, [])

  const backHandler = () => {
    navigate(-1)
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className='mr-[15px]'>
      <h1 className='uppercase text-[22px] font-bold mt-[5px]'>Quản lý tài khoản</h1>
      <button
        className='text-[18px] px-[10px] py-[5px] bg-green-600 text-white rounded'
        onClick={() => backHandler()}
      >
        Trở về
      </button>
      <table class='table-auto w-full text-center border border-solid border-[#ccc] mt-[10px] rounded'>
        <thead className='border-bottom-[#ccc]'>
          <tr className='bg-blue-500 text-white'>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>ID</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Họ Tên</th>
            <th className='w-[10%] p-[10px] text-[20px] uppercase'>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {accounts &&
            accounts.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`border border-solid border-[#ccc] ${index % 2 !== 0 && 'bg-[#ccc]'}`}
                >
                  <td className='text-[18px] p-[10px]'>{item?._id}</td>
                  <td className='text-[18px] p-[10px]'>{item?.firstName + ' ' + item?.lastName}</td>
                  <td className='text-[18px] p-[10px]'>{item?.email}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default AdminPermissionComponent
