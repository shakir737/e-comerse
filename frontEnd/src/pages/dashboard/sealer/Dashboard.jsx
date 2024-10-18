import React from 'react'
import AddMenu from './AddMenu'
import Sidebar from './Sidebar'
import CreateProduct from './createProduct'

const Dashboard = () => {
  return (
    <div className="w-full lg:w-full flex flex-row container mx-auto w- bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
  
  <div className="mt-20 w-64"> <Sidebar /> </div>
  <div className='mt-20'> <CreateProduct /> </div>
    </div>
  )
}

export default Dashboard