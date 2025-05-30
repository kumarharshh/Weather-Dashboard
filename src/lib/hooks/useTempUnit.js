import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
export const useTempUnit = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useTempUnit must be used within a WeatherProvider");
  }
  return context;
};