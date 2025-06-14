import React, { useContext } from 'react'
import { ShopContaxt } from '../context/ShopContaxt'
import Title from './Title'

const CartTotal = () => {
    const {getCartAmount,currency,delivery_fee} = useContext(ShopContaxt)
  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1 = {"CART"} text2={"TOTALS"}/>
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                <p className='fadein'>{currency}{getCartAmount()}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p className='fadein'>{currency}{delivery_fee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                <b className='fadein'>{currency}{getCartAmount() ===0?0:getCartAmount()+delivery_fee}</b>
            </div>
        </div>
      
    </div>
  )
}

export default CartTotal
