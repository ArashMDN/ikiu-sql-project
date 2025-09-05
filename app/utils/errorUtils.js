import { toast } from "react-toastify";

// errorUtils.js (or wherever you'd like to place it)
export const handleError = (err) => {
  const errorResponse = err.response?.data;

  if (!errorResponse) {
    // In case of no response data, show a generic error
    toast.error("خطای غیر منتظره ای رخ داده است، لطفا دوباره تلاش کنید.");
    return;
  }

  // If the error has a 'detail' field, display it
  if (errorResponse.detail) {
    toast.error(errorResponse.detail);
  }
  // If the error has an 'error' array, display each error message
  else if (Array.isArray(errorResponse.error)) {
    errorResponse.error.forEach((errorMessage) => {
      toast.error(errorMessage);
    });
  }
  // If the error response is an object with multiple fields
  else if (typeof errorResponse === "object") {
    Object.keys(errorResponse).forEach((field) => {
      const errorMessages = errorResponse[field];
      errorMessages.forEach((message) => {
        toast.error(`${field}: ${message}`);
      });
    });
  } else {
    // If error format is not as expected, display a generic message
    toast.error("خطایی رخ داده است، لطفا دوباره تلاش کنید.");
  }
};
