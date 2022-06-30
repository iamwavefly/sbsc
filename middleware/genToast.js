import toast from "react-hot-toast";
import { Icon } from "semantic-ui-react";

const mode = {
  success: "#3BDF4C",
  error: "#F23C3C",
  warning: "#F2AB55",
  primary: "#6939ff",
};

export const newToast = ({
  type = "primary",
  title = null,
  msg = null,
  duration = 4000,
}) => {
  const toastStyle = {
    padding: "16px",
    color: "#713200",
    background: "#FFFFFF",
    border: `1px solid ${mode[type]}`,
    boxSizing: "border-box",
    boxShadow: "0px 0px 20px #E6E0FE",
    borderRadius: "8px",
    zIndex: 999999999999000000000000000000,
  };

  const icon = () => {
    let toastIcon = null;

    if (type === "success") {
      toastIcon = (
        <span className="toast-icon">
          <Icon name="check circle" className="success-theme" />{" "}
        </span>
      );
    }

    if (type === "error") {
      toastIcon = (
        <span className="toast-icon">
          <Icon name="times circle" className="error-theme" />{" "}
        </span>
      );
    }

    if (type === "warning") {
      toastIcon = (
        <span className="toast-icon">
          <Icon name="exclamation circle" className="warning-theme" />{" "}
        </span>
      );
    }

    if (type === "primary") {
      toastIcon = (
        <span className="toast-icon">
          <Icon name="info circle" className="primary-theme" />{" "}
        </span>
      );
    }

    return toastIcon;
  };

  toast(
    (t) => (
      <div>
        <h1 className="toast-title">
          {icon()} {title}
        </h1>
        <p className="toast-msg">{msg}</p>
      </div>
    ),
    {
      style: toastStyle,
      duration,
    }
  );
};
