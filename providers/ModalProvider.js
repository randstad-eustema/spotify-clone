"use client";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import { useState, useEffect } from "react";

export default function ModalProvider() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) return null;

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  );
}
