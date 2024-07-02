import { useEffect, useState } from "react";
import { mockData } from "../../__mocks__";
import ImageWrapper from "../ImageWrapper";
import "./index.css";
import Overlay from "../Overlay";
import Image from "../Image";

const Container = () => {
  const [imageList, setImageList] = useState(mockData);
  const [imgShownInOverlay, setImgInOverlay] = useState(null);

  useEffect(() => {
    document.addEventListener("keydown", checkKey);
  }, []);

  const checkKey = (e) => {
    if (e.keyCode === 27) {
      setImgInOverlay(null);
    }
  }


  const handleDrop = (item, newPosition) => {
    setImageList(images => {
      const newImageList = [...images];
      const droppedImage = newImageList.splice(item.position, 1)[0];
      newImageList.splice(newPosition, 0, droppedImage);
      newImageList.forEach((imgObj, index) => {
        imgObj.position = index;
      })
      console.log("newImageList", newImageList);
      return newImageList;
    })
  }

  const showInOverlay = (e) => {
    const { attributes } = e.target;
    const { value: position } = attributes["data-position"];
    setImgInOverlay(imageList[position]);
  }

  return (
    <>
      <div className="images-grid" onClick={showInOverlay}>
        {
          imageList.map((imgObj, index) => {
            const { title, position, url } = imgObj;
            return <ImageWrapper key={index} title={title} url={url} position={position} handleDrop={handleDrop} />
          })
        }

      </div>
      {imgShownInOverlay && <Overlay>
        <Image index={0} title={imgShownInOverlay.title} url={imgShownInOverlay.url} width={500} height={500} customRef={null} />
      </Overlay>}
    </>
  );
}

export default Container;