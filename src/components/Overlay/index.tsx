import { ReactElement, ReactHTMLElement } from "react";
import "./index.css";

type OverlayType = {
  onClose?: () => void,
  children: ReactElement
}
const Overlay = ({ children, onClose = () => { } }: OverlayType) => (
  <div className="overlay">
    <p className="close-btn" onClick={onClose}>x</p>
    {children}
  </div>
);

export default Overlay;