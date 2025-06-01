import React, { useContext, useEffect ,useState} from 'react'
import { ShopContaxt } from '../context/ShopContaxt'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
    const [latestProduct, setlatestProduct] = useState([])
    const { products } = useContext(ShopContaxt)
    useEffect(() => {
      setlatestProduct(products.slice(0,10));
    }, [products])
    
    
    return (
        <div className='my-10'>
            <div className="text-center py-8 text-3xl">
                <Title text1 = {"LATEST"} text2 = {"COLLECTIONS"}/>
                <p className='w-3/4 m-auto text-xs  sm:text-sm md:text-base text-gray-600'>We're excited to announce our latest collection! Explore the freshest designs, trends, and styles. Shop now and stay ahead of the fashion!</p>
            </div>

            {/* Rendering Products */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {
                    latestProduct.map((item,index)=>(
                        <ProductItem key={index} id = {item._id} image={item.image} name = {item.name} price={item.price}/>
                    ))
                }
            </div>

        </div>
    )
}

export default LatestCollection
