const Image = ({ index, title, url, width, height, customRef }) => (
  <div>
    <p data-position={index}>{title}</p>
    <img data-position={index} ref={customRef} src={url} alt={title} width={width} height={height} />
  </div>
);

export default Image;