import React, { useContext, useState, useEffect } from 'react'
import { ShopContaxt } from '../context/ShopContaxt'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'


const collections = () => {
  const [Category, setCategory] = useState([])
  const [SubCategory, setSubCategory] = useState([])
  const { products,Search, ShowSearch} = useContext(ShopContaxt)
  const [showFilter, setshowFilter] = useState(false)
  const [filterProduct, setfilterProduct] = useState([])
  const [sortType, setsortType] = useState('relavent')

  // useEffect(() => {
  //   setfilterProduct(products);
  // }, [])

  const toggleCategory = (e) => {
    if (Category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  const toggleSubCategory = (e) => {
    if (SubCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSubCategory(prev => [...prev, e.target.value])
    }

  }

  const ApplyFilter = () => {
    let productCopy = products.slice();

    if(ShowSearch && Search){
      productCopy = productCopy.filter(item=>item.name.toLowerCase().includes(Search.toLowerCase()))
    }

    if (Category.length > 0) {
      productCopy = productCopy.filter(item => Category.includes(item.category))
    }
    if (SubCategory.length > 0) {
      productCopy = productCopy.filter(item => SubCategory.includes(item.subCategory))
    }


    setfilterProduct(productCopy)
  }


  const sortProduct = () => {
    let fpCopy = filterProduct.slice();

    switch (sortType) {
      case 'low-high':
        setfilterProduct(fpCopy.sort((a, b) => (a.price - b.price)))
        break;
      case 'high-low':
        setfilterProduct(fpCopy.reverse((a, b) => (a.price - b.price)))
        break;
      default:
        ApplyFilter();
        break;
    }
  }

  useEffect(() => {
    ApplyFilter()
  }, [Category, SubCategory,Search,ShowSearch])

  useEffect(()=>{
    sortProduct()
  },[sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      {/* Filter option */}
      <div className='min-w-60'>
        <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={() => { (showFilter) ? setshowFilter(false) : setshowFilter(true) }}>FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input type="checkbox" className='w-3' onChange={toggleCategory} value={"Men"} />Men
            </p>
            <p className='flex gap-2 '>
              <input type="checkbox" className='w-3' onChange={toggleCategory} value={"Women"} />Women
            </p>
            <p className='flex gap-2 '>
              <input type="checkbox" className='w-3' onChange={toggleCategory} value={"Kids"} />Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2 '>
              <input type="checkbox" className='w-3' onChange={toggleSubCategory} value={"Topwear"} />Topwear
            </p>
            <p className='flex gap-2 '>
              <input type="checkbox" className='w-3' onChange={toggleSubCategory} value={"Bottomwear"} />Bottomwear
            </p>
            <p className='flex gap-2 '>
              <input type="checkbox" className='w-3' onChange={toggleSubCategory} value={"Winterwear"} />Winterwear
            </p>
          </div>
        </div>

      </div>

      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Short */}
          <select onChange={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by Low to High</option>
            <option value="high-low">Sort by High to Low</option>
          </select>

        </div >


        {/* Map Product */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProduct.map((item, index) => (
              <ProductItem key={index} id = {item._id} image={item.image} name = {item.name} price={item.price}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default collections
