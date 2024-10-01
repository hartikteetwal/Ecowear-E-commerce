import React, { useContext ,useState,useEffect} from 'react'
import { ShopContaxt } from '../context/ShopContaxt'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => {
    // const [prise,setprise] = useState(0)
    // useEffect(() => {
    //         setprise(price%100);
    // }, [])
    const {currency} = useContext(ShopContaxt);
  return (
      <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className="overflow-hidden">
        <img src={image[0]} className='hover:scale-110 transition ease-in-out' alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
      </Link>
  )
}

export default ProductItem;
