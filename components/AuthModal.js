import { Auth } from "@supabase/auth-ui-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/providers/UserProvider";

export default function AuthModal() {
  const supabaseClient = useSupabaseClient();
  const { onClose, isOpen } = useAuthModal();
  const { user } = useUser();

  // chiude la modale
  function onChange(open) {
    if (!open) onClose();
  }

  // chiudiamo la modale dopo il login/registrazione
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  return (
    <Modal
      title="Benvenuto su Spotify"
      description="Accedi al tuo account oppure registrati"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        providers={[]}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
}
