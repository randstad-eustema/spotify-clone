"use client";

import {
  useSessionContext,
  useUser as useSupabaseUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

// Hook che esporta lo UserContext da utilizzare nei vari componenti
export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  // recuperare il supabase client che mi permetterà di fare le chiamate al database
  const { supabaseClient: supabase } = useSessionContext();
  const [userDetails, setUserDetails] = useState(null);

  // recupero l'utente loggato
  const user = useSupabaseUser();

  // recupero i dettagli dell'utente da supabase
  function getUserDetails() {
    return supabase.from("users").select("*").single();
  }

  // TODO: recupero i dettagli della subscription dello user loggato

  // al caricamento del componente recupero i dettagli dell'utente loggato
  useEffect(() => {
    if (user) {
      getUserDetails().then((result) => {
        setUserDetails(result.value);
      });
    } else {
      setUserDetails(null);
    }
  }, [user]);

  const value = {
    user,
    userDetails,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
