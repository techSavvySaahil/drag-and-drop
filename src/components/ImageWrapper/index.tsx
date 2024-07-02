import { useDrag, useDrop } from "react-dnd";
import { ItemType } from "../../constants";
import Image from "../Image";

type ImageObjType = {
  title: string,
  url: string,
  position: number
}

const ImageWrapper = ({ title, url, position, handleDrop }) => {
  const [, drag] = useDrag(() => ({
    type: ItemType.ImgBox,
    item: { title, url, position }
  }));
  const [, drop] = useDrop(() => ({
    accept: ItemType.ImgBox,
    drop: (item: ImageObjType) => {
      handleDrop(item, position);
    }
  }));

  return (
    <div className="images-wrapper" ref={drop} id={position}>
      <Image index={position} customRef={drag} url={url} width={300} height={300} title={title} />
    </div>
  );
}

export default ImageWrapper;