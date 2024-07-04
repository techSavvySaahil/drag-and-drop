import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../../constants";
import Image from "../Image";
import type { ItemType } from "../../helpers/commonTypes";


type ImageObjType = ItemType & {
  handleDrop: (item: ItemType, position: number) => void
}

const ImageWrapper = ({ title, url, position, handleDrop }: ImageObjType) => {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.ImgBox,
    item: { title, url, position }
  }));
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.ImgBox,
    drop: (item: ImageObjType) => {
      handleDrop(item, position);
    }
  }));

  return (
    <div className="images-wrapper" ref={drop} id={`position`}>
      <Image index={position} customRef={drag} url={url} width={300} height={300} title={title} />
    </div>
  );
}

export default ImageWrapper;