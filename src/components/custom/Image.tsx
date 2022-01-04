import React from 'react'

interface ImageProps {
  path: string;
}

function Image(props: ImageProps) {
  const { path } = props
  return (
    <div>
      <img className="img img-fit" style={{ width: 100, height: 70 }} src={path} />
    </div>
  )
}

export default Image
