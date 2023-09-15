import './App.css';
import NavBar from './components/NavBar';
import TopArtists from './components/TopArtists';
import TopSongs from './components/TopSongs';

function App() {
  return (
    <div className="App">
      <NavBar> </NavBar>
      <TopSongs></TopSongs>
      <TopArtists></TopArtists>
    </div>
  );
}

export default App;
