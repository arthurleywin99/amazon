import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function AdminBrandComponent() {
  const { userInfo } = useSelector((state) => state.userSignin)

  const [brands, setBrands] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/brands`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setBrands(data)
      })
      .catch((err) => setError(err.message))
  }, [])

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <table class='table-auto'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Ảnh</th>
            <th>Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          <tr></tr>
          <tr></tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  )
}

export default AdminBrandComponent
