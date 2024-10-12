import React from 'react'
import { Loader } from 'lucide-react'

function Loader() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader className="size-10 animate-spin" />
    </div>
  )
}

export default Loader