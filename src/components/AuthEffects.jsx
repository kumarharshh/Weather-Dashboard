import { useEffect } from "react";
import { useAuth } from "../lib/hooks/useAuth";
import { useCity } from "../lib/hooks/useCity";
import { supabase } from "../lib/clients/supabaseClient.js";

export default function AuthEffects() {
  const { user } = useAuth();
  const { setCity } = useCity();

  useEffect(() => {
    const fetchCity = async () => {
      if (user?.id) {
        const { data } = await supabase
          .from("profiles")
          .select("last_city")
          .eq("id", user.id)
          .single();

        if (data?.last_city) {
          setCity(data.last_city);
        }
      } else {
        setCity(null);
      }
    };

    fetchCity();
  }, [user, setCity]);

  return null;
}