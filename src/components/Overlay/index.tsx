import "./index.css";

const Overlay = ({ children, onClose = () => { } }) => (
  <div className="overlay">
    <p className="close-btn" onClick={onClose}>x</p>
    {children}
  </div>
);

export default Overlay;