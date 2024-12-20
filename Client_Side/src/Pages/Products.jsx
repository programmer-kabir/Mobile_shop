import React from 'react'
import Container from '../Components/Container/Container'
import SearchBar from '../Components/SearchBar'

const Products = () => {
  return (
    <Container>
        <div className='pt-16'>
        <h2 className=' text-2xl md:text-3xl  font-semibold text-center my-5'>All Products</h2>
        {/* Search and price */}
        <div className='flex items-center justify-between border border-gray-200 py-4 px-5'>
            <SearchBar />
            <h2>Price</h2>
        </div>
        {/* Content */}
        <div className='grid grid-cols-12 pt-7'>
            <div className='col-span-3'>
                Filter Bar
            </div>
            <div className='col-span-9'>
Produts
            </div>
        </div>
        </div>
    </Container>
    
  )
}

export default Products