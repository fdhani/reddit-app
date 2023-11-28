const Icon = (props) => {
  const { name, filled, rotate, className, size, ...otherProps } = props;

  return (
    <span
      className={`material-symbols-rounded ${className}`}
      style={{
        fontVariationSettings: `'FILL' ${filled ? 1 : 0}`,
        transform: `rotate(${rotate}deg)`,
        fontSize: `${size}px`,
      }}
      {...otherProps}
    >
      {name}
    </span>
  );
};

Icon.defaultProps = {
  name: "",
  filled: false,
  rotate: 0,
  className: "",
  size: 24,
};

export default Icon;
