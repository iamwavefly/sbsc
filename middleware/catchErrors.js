import { newToast } from "./genToast";
import { logoutHandler } from "./auth";

const networkErrors = ["Failed to fetch", "Network Error", "401"];

export const catchErrors = (error, displayError) => {
  let errorMsg;
  // Conditionals

  if (networkErrors.includes(String(error))) {
    // 1. The request failed due to Network Issues
    errorMsg = "Network Error";
  } else if (error?.response?.data) {
    // 2A. The request went in but the server responded with a status code outside 2**
    errorMsg = error.response.data;

    // 2B. Cloudinary Image upload Error
    if (error?.response?.data?.error) errorMsg = error.response.data.error;
  } else if (error?.request) {
    // 3. The request went in but no response was received
    errorMsg = error.request;
  } else if (error?.response === 401) {
    logoutHandler();
  } else {
    // 4. Something else happened that resulted to an error
    errorMsg = error.message;
  }
  // Callback Handler to parent component so error messages can be propagated properly
  displayError(errorMsg);
};

export const notifyErrorHandler = ({ type, title, msg, duration }) => {
  let errorMsg = null;

  if (typeof msg === "object") {
    const message = JSON.parse(JSON.stringify(msg));

    if (message?.message === "Network Error") {
      errorMsg = "Network Error. Please check your internet connection";
    } else if (msg?.response?.status === 401) {
      logoutHandler();
      return;
    } else if (Object.entries(msg).length === 0) {
      errorMsg = String(msg);
      return;
    } else if (msg.response) {
      errorMsg = msg?.response?.data?.message;
    } else {
      errorMsg = String(msg);
    }
  }

  const toastConfig = {
    type,
    title,
    msg: errorMsg,
    duration,
  };
  newToast(toastConfig);
};

export const resolveErrorMsg = (msg) => {
  let errorMsg = "An Error occurred. Please try again";
  let errorCode = null;

  if (typeof msg === "object" && Object.entries(msg).length === 0) {
    errorMsg = String(msg);
  }

  if (typeof msg === "object" && msg?.response) {
    errorMsg = msg?.response?.data?.message
      ? msg.response.data.message
      : "An error occurred. Please try again";
    errorCode = msg.response.status;
  }

  return { errorMsg, errorCode };
};
