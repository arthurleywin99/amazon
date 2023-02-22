import React, { useState } from 'react'
import SigninForm from './SigninForm'
import SignupForm from './SignupForm'
import './style.css'

function SigninComponent() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <SigninForm setShowForm={setShowForm} />
      {showForm && <SignupForm setShowForm={setShowForm} />}
    </>
  )
}

export default SigninComponent
