import './App.css';
import NavBar from './components/NavBar';
import TopArtists from './components/TopArtists';
import TopSongs from './components/TopSongs';
import WelcomeMessage from './components/WelcomeMessage';

function App() {
  return (
    <div className="App">
      <NavBar> </NavBar>
      <WelcomeMessage ></WelcomeMessage>
      <TopArtists></TopArtists>
      <TopSongs></TopSongs>
    </div>
  );
}

export default App;
