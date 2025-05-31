import { useEffect } from "react";
import { useAuth } from "../lib/hooks/useAuth";
import { useCity } from "../lib/hooks/useCity";
import { supabase } from "../lib/clients/supabaseClient.js";

export default function AuthEffects() {
  const { user } = useAuth();
  const { city,setCity } = useCity();
    useEffect(() => {
    const fetchCity = async () => {
        if (user?.id) {
        // Save current city before it gets overwritten
        const localCity = localStorage.getItem("loggedOutCity");
        if (!localCity && city) {
            localStorage.setItem("loggedOutCity", city);
        }

        // Fetch from Supabase
        const { data } = await supabase
            .from("profiles")
            .select("last_city")
            .eq("id", user.id)
            .single();

        if (data?.last_city) {
            setCity(data.last_city);
        }
        } else {
        // Restore previous logged-out city
        const lastCity = localStorage.getItem("city") ;
        if (lastCity) {
            setCity(lastCity);
        }
        }
    };

    fetchCity();
    }, [user]);
    
  return null;
}
