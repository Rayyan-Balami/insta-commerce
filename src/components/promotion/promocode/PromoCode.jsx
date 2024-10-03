import {useState, useEffect } from 'react'
import PromoCodeForm from './PromoCodeForm'
import PromoCodeTable from './PromoCodeTable'

function PromoCode() {
  const [isEdit, setIsEdit] = useState(false)
  const [editDataID, setEditDataID] = useState(null);
  useEffect(() => {
    console.log(isEdit, editDataID);
  }
  , [editDataID, isEdit]);
  return (
    <div className="grid gap-4 xl:grid-cols-3 xl:gap-8">
    <div className="max-xl:order-2 grid auto-rows-max gap-4 xl:col-span-2 xl:gap-8">
      <PromoCodeTable setIsEdit={setIsEdit} setEditDataID={setEditDataID} />
    </div>
    <div className="max-xl:order-1 grid auto-rows-max gap-4 xl:gap-8">
    <PromoCodeForm isEdit={isEdit} setIsEdit={setIsEdit} editDataID={editDataID} setEditDataID={setEditDataID} />
    </div>
  </div>
  )
}

export default PromoCode