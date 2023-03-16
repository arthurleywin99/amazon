import React, { useEffect, useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { savePayment } from '../../actions/cartActions'

function PaymentComponent() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [clientId, setClientId] = useState(null)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/config/paypal`)
      .then((res) => res.json())
      .then((data) => setClientId(data.message))
  }, [])

  return (
    <div className='w-full flex justify-center mt-[20px]'>
      <div>
        <div className='text-[20px] mb-[14px]'>
          Lựa chọn phương thức thanh toán
        </div>
        <div>
          <button
            type='button'
            className='text-center w-full rounded-[23px] border border-solid h-[45px] bg-[#888] text-white text-[18px] mb-[14px]'
          >
            Thanh toán khi nhận hàng
          </button>
          {clientId && (
            <PayPalScriptProvider
              options={{ 'client-id': clientId, currency: 'USD' }}
            >
              <PayPalButtons
                style={{
                  layout: 'vertical',
                  shape: 'pill',
                  label: 'paypal',
                  tagline: false,
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: '200',
                        },
                      },
                    ],
                  })
                }}
                onApprove={async (data, actions) => {
                  return actions.order.capture().then((details) => {
                    dispatch(
                      savePayment({
                        method: 'PAYPAL',
                        id: details.id,
                        status: details.status,
                        created: details.create_time,
                        updated: details.update_time,
                      })
                    )
                    navigate('/checkout?step=order-confirmation')
                  })
                }}
                onError={(err) => {
                  console.log(err)
                }}
              />
            </PayPalScriptProvider>
          )}
        </div>
      </div>
    </div>
  )
}

export default PaymentComponent
