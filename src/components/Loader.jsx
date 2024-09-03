import React from 'react'
import { Loader2 } from 'lucide-react'

function Loader() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Loader2 className="size-10 animate-spin" />
    </div>
  )
}

export default Loader