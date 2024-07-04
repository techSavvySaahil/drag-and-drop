import { useEffect, useState } from "react";
// import { mockData } from "../../__mocks__";
import ImageWrapper from "../ImageWrapper";
import "./index.css";
import Overlay from "../Overlay";
import Image from "../Image";
import { mockData } from "../../__mocks__";
import { ScaleLoader } from "react-spinners";
import Moment from 'react-moment';

const Container = () => {
  // state containing list of images 
  const [imageList, setImageList] = useState([]);

  // state for showing image in overlay
  const [imgShownInOverlay, setImgInOverlay] = useState(null);

  // state for implementing throttling
  const [timeoutId, setTimeoutId] = useState(null);

  // state for making sure setTimeout doesn't take stale
  // value of imageList state
  const [shouldUpdate, setChangeUpdate] = useState(false);

  // state introduced to not let the API be called unnecessarily
  const [isFirstChangeDone, setFirstChangeDone] = useState(false);

  // state to store the last saved data date and time
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState(new Date())

  // state for checking if data saving is in progress
  const [isSavingData, setSavingData] = useState(false);

  useEffect(() => {
    fetchData();
    document.addEventListener("keydown", checkKey);
    // unmounting the component
    return (() => {
      // removing the event listener
      document.removeEventListener("keydown", checkKey);
    })
  }, []);

  useEffect(() => {
    if (isFirstChangeDone) {
      if (!timeoutId) {
        const id = setTimeout(() => {
          setChangeUpdate(true);
          setTimeoutId(null);
        }, 5000);
        setTimeoutId(id);
      }
    }
  }, [imageList]);

  useEffect(() => {
    if (shouldUpdate) {
      updateData();
      setChangeUpdate(false);
    }
  }, [shouldUpdate])

  const fetchData = async () => {
    // fetch("/api/data")
    //   .then(async res => {
    //     console.log("res", res);
    //     return await res.json();
    //   })
    //   .then(response => {
    //     console.log("response", response);
    //     setImageList(response);
    //   })
    //   .catch(() => {
    const data = JSON.parse(window.localStorage.getItem("imageData"));
    if (data && data.length) setImageList(data);
    else setImageList(mockData);
    // })
  }

  const updateData = () => {
    setSavingData(true);
    window.localStorage.setItem("imageData", JSON.stringify(imageList));
    setLastSavedTimestamp(new Date());
    setSavingData(false);
    // fetch("/api/data", {
    //   method: "PUT",
    //   body: JSON.stringify(imageList)
    // })
  };

  const checkKey = (e) => {
    if (e.keyCode === 27) {
      setImgInOverlay(null);
    }
  }

  const handleDrop = (item, newPosition) => {
    setFirstChangeDone(true);
    setImageList(images => {
      const newImageList = [...images];
      const droppedImage = newImageList.splice(item.position, 1)[0];
      newImageList.splice(newPosition, 0, droppedImage);
      newImageList.forEach((imgObj, index) => {
        imgObj.position = index;
      })
      return newImageList;
    })
  }

  const showInOverlay = (e) => {
    const { attributes } = e.target;
    const position = attributes["data-position"];
    if (position?.value) setImgInOverlay(imageList[position.value]);
  }

  return (
    <>
      <p className="last-saved-text">Last saved: <Moment fromNow>{lastSavedTimestamp}</Moment></p>
      <div className="images-grid" onClick={showInOverlay}>
        {
          imageList.map((imgObj, index) => {
            const { title, position, url } = imgObj;
            return <ImageWrapper key={index} title={title} url={url} position={position} handleDrop={handleDrop} />
          })
        }

      </div>
      {imgShownInOverlay && <Overlay onClose={() => setImgInOverlay(null)}>
        <Image index={0} title={imgShownInOverlay.title} url={imgShownInOverlay.url} width="80%" height="80%" customRef={null} />
      </Overlay>}
      {isSavingData && <Overlay><ScaleLoader /></Overlay>}
    </>
  );
}

export default Container;