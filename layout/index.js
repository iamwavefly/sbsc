import React from "react";
import HeadContent from "../components/_app/HeaderContent";
import { Toaster } from "react-hot-toast";

export default function MainLayout({ children }) {
  return (
    <div>
      <HeadContent />
      <Toaster
        toastOptions={{
          className: "toast-main",
        }}
        position="top-right"
      />
      {children}
    </div>
  );
}
