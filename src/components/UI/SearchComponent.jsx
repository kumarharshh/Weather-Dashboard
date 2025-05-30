import { useState } from "react";
import { useCity } from "../../lib/hooks/useCity";
import { useTempUnit } from "../../lib/hooks/useTempUnit";
import Button from "../base/button";
import styles from './SearchComponent.module.css';

export default function SearchComponent () {
  const { setCity } = useCity();
  const { tempUnit, setTempUnit } = useTempUnit();
  const [searchTerm, setSearchTerm] = useState('');

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
          onClick={() => {
            setCity(searchTerm);
            localStorage.setItem('city', searchTerm);
            setSearchTerm('');
          }}
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