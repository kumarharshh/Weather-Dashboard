import './App.css'
import SearchComponent from './components/UI/SearchComponent.jsx';
import WeatherDetails from './components/UI/WeatherDetails.jsx';
import Header from './components/common/Header.jsx';
import AuthEffects from './components/AuthEffects.jsx';

export default function App() {
  return (
    <>
      <Header/>
      <AuthEffects/>
      <SearchComponent/>
      <WeatherDetails/>
    </>
  )
}

