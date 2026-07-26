import "./Button.css";

const Button = ({
  text,
  type = "button",
  onClick,
  loading = false,
}) => {
  return (
    <button
      className="btn-primary"
      type={type}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? "Loading..." : text}
    </button>
  );
};

export default Button;