import { useState } from "react";
import { useCity } from "../../lib/hooks/useCity";
import { useTempUnit } from "../../lib/hooks/useTempUnit";
import { useAuth } from "../../lib/hooks/useAuth.js";
import Button from "../base/Button.jsx";
import { supabase } from "../../lib/clients/supabaseClient.js";
import styles from './SearchComponent.module.css';

export default function SearchComponent () {
  const { setCity } = useCity();
  const { user } = useAuth();
  const { tempUnit, setTempUnit } = useTempUnit();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchClick = async () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a city name');
      return;
    }
    setCity(searchTerm);
    localStorage.setItem('city', searchTerm);
    if (user) {
      await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          last_city: searchTerm
        });
    }
    setSearchTerm('');
  }

  return (
    <div className={styles.searchComponent}>
      <div className={styles.inputRow}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search your city name"
          className={styles.searchInput}
        />
        <Button
          text="Search"
          backgroundColor="#007bff"
          type="button"
          rounded={true}
          onClick={handleSearchClick}
        />
      </div>
      <div className={styles.buttonRow}>
        <Button
          text={tempUnit === "Celsius" ? "Switch to Fahrenheit" : "Switch to Celsius"}
          onClick={() => {
            setTempUnit(tempUnit === "Celsius" ? "Fahrenheit" : "Celsius");
          }}
          backgroundColor="#28a745"
          type="button"
          rounded={true}
        />
      </div>
    </div>
  );
}