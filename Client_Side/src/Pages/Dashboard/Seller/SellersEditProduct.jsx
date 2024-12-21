import React from 'react'
import { useLoaderData } from 'react-router-dom'

const SellersEditProduct = () => {
  const editProduct = useLoaderData()
  console.log(editProduct);
  return (
    <div>SellersEditProduct</div>
  )
}

export default SellersEditProduct