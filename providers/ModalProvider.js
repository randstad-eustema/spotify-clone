"use client";
import AuthModal from "@/components/AuthModal";
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
    </>
  );
}
