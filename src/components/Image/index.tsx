import { useState } from "react";
import { type ConnectDragSource } from "react-dnd";
import { BarLoader } from "react-spinners";
import "./index.css"

type ImagePropType = {
  index: number,
  title: string,
  url: string,
  width: number | string,
  height: number | string,
  customRef: ConnectDragSource | null
}

const Image = ({ index, title, url, width, height, customRef }: ImagePropType) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="wrap">
      <p className="title">{title}</p>
      <img data-position={index} ref={customRef} src={url} alt={title} width={width} height={height} onLoad={() => { setLoading(false) }} />
      {isLoading && <div className="spinner-wrapper"><BarLoader /></div>}
    </div>
  )
};

export default Image;