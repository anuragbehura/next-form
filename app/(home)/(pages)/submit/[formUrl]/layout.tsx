import React, {ReactNode} from 'react'

function layout({children}:{children: ReactNode}) {
  return (
    <div className="flex w-full min-h-screen min-w-full max-h-screen h-screen flex-grow mx-auto">{children}</div>
  )
}

export default layout