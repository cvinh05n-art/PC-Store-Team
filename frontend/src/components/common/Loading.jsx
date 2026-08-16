import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Đang tải...</p>
    </div>
  );
};

export default Loading;

const [toast, setToast] = useState({
  show: false,
  type: 'success',
  message: '',
});

const [rememberMe, setRememberMe] = useState(false);