import React, { useEffect, useState } from 'react'
import useAllUsers from '../../../Utils/Hooks/useAllUsers'
import axios from 'axios'
import useAuth from '../../../Utils/Hooks/useAuth'
import { FaExclamation } from 'react-icons/fa6'
const Wishlist = () => {
  const {user} = useAuth()
  const [wishlist,setWishlist] = useState([])
  const [loading,setLoading] = useState(false)
  const [users] = useAllUsers()
const [allProducts, setAllProducts] = useState()
  useEffect(()=>{
    const fetchWishlist = async () =>{
      await axios.get(`${import.meta.env.VITE_LOCALHOST_KEY}/wishlist?email=${user?.email}`)
      .then(res=>{
        setWishlist(res.data[0]);
        console.log(res.data[0]);
      })
    }
    if (user?.email) {
      fetchWishlist();
    }
  },[user?.email])
  return (
    <div className='py-2'>
      <h2 className='text-2xl text-center md:text-3xl font-semibold '>My Cart Data</h2>
      {wishlist?.products?.length > 0 ? (
      wishlist?.products.map((data, index) => (
        <div key={index}>
          <h2>{data.email}</h2>
        </div>
      ))
    ) : (
      <div className="flex justify-center py-5">
             <div className="inline-flex items-center gap-1 border border-gray-700 rounded-md px-4 py-2">
               <FaExclamation />
               No items in your wishlist.
             </div>
           </div>
    )}
    </div>
    
  )
}

export default Wishlist