import './App.css';
import NavBar from './components/NavBar';
import TopArtists from './components/TopArtists';
import TopSongs from './components/TopSongs';
import WelcomeMessage from './components/WelcomeMessage';

const clientId = "c2345cf62ae34942aba348fb3ae730e3";

function App() {
  return (
    <div className="App">
      <NavBar clientId={clientId}> </NavBar>
      <WelcomeMessage ></WelcomeMessage>
      <TopArtists></TopArtists>
      <TopSongs></TopSongs>
    </div>
  );
}

export default App;
