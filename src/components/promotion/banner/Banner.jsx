import React from 'react'
import BannerForm from './BannerForm'
import BannerTable from './BannerTable'

function Banner() {
  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
    <div className="max-xl:order-2 grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
      <BannerTable />
    </div>
    <div className="max-xl:order-1 grid auto-rows-max gap-4 xl:gap-8">
      <BannerForm />
    </div>
  </div>
  )
}

export default Banner