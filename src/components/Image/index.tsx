import { useState } from "react";
import { BarLoader } from "react-spinners";
import "./index.css"

const Image = ({ index, title, url, width, height, customRef }) => {
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