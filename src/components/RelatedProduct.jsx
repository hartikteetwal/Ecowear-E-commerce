import React, { useContext, useState, useEffect } from 'react'
import { ShopContaxt } from '../context/ShopContaxt'
import ProductItem from './ProductItem'
import Title from './Title'

const RelatedProduct = ({ Category, SubCategory }) => {
    const { products } = useContext(ShopContaxt)
    const [related, setrelated] = useState([])
    useEffect(() => {
        if (products.length > 0) {
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter(item => Category === item.category)
            productsCopy = productsCopy.filter(item => SubCategory === item.subCategory)

            setrelated(productsCopy.slice(0, 5))
        }
    }, [products])

    return (
        <div className='my-24'>
            <div className=' text-center text-3xl py-2'>
                <Title text1={"RELATED"} text2={"PRODUCTS"} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>{related.map((item,index)=>(
                <ProductItem key={index} id = {item._id} image={item.image} name = {item.name} price={item.price}/>
            ))}
            </div>

        </div>
    )
}

export default RelatedProduct
