import React,{useContext, useState} from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContaxt } from '../context/ShopContaxt'
import {toast} from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {
  const [Method, setMethod] = useState('cod')
  const {navigate,backendUrl,Token,CartItems,setCartItems,getCartAmount,delivery_fee,products} = useContext(ShopContaxt);

  const [FormData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async(event)=>{
    event.preventDefault()
    try {
      let orderItems = []
      
      for (const items in CartItems) {
        for(const item in CartItems[items]){
          if(CartItems[items][item]>0){
            const itemInfo = structuredClone(products.find(product=>product._id===items))
            
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = CartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address:FormData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee
      }

      

      switch (Method) {
        // API call for COD 
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{Token}})
        

          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }
          else{
            toast.error(response.data.message)
          }
          break;

          case 'stripe':
            const responseStripe = await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{Token}})
            console.log(responseStripe);
            
            if(responseStripe.data.success){
              const {session_url}= responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
          break;
      
        default:
          break;
      }
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  
  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* ---------------Left site--------------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className='flex gap-3'>
          <input required  onChange={onChangeHandler} value={FormData.firstName} name="firstName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
          <input required onChange={onChangeHandler} value={FormData.lastName} name="lastName" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
        </div>
        <input required onChange={onChangeHandler} value={FormData.email} name="email" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
        <input required onChange={onChangeHandler} value={FormData.street} name="street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} value={FormData.city} name="city" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
          <input onChange={onChangeHandler} value={FormData.state} name="state" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} value={FormData.zipcode} name="zipcode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
          <input required onChange={onChangeHandler} value={FormData.country} name="country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
        </div>
        <input required onChange={onChangeHandler} value={FormData.phone} name="phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
      </div>
      {/* ---------------Right site--------------- */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>
        <div className="mt-12">
        <Title text1={"Payment"} text2={"METHOD"} />
        </div>
        {/* -----------Payment Method Selection----------- */}
        <div className="flex gap-3 flex-col lg:flex-row">
          <div onClick={()=>setMethod("stripe")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${Method==='stripe'?'bg-green-400':''} `}></p>
            <img src={assets.stripe_logo} className='h-5 mx-4' alt="" />
          </div>
          <div onClick={()=>setMethod("razorpay")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${Method==='razorpay'?'bg-green-400':''} `}></p>
            <img src={assets.razorpay_logo} className='h-5 mx-4' alt="" />
          </div>
          <div onClick={()=>setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
            <p className={`min-w-3.5 h-3.5 border rounded-full ${Method==='cod'?'bg-green-400':''} `}></p>
            <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
          </div>
        </div>
         <div className="w-full text-end mt-8">
          <button className="bg-black text-white px-16 py-3 text-sm" type='submit'>PLACE ORDER</button>
         </div>
      </div>
    </form>
  )
}

export default PlaceOrder
