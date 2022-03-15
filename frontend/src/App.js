
import './App.css';
import Media from 'react-media'
import LinkToServer from './components/LinkToServer';
import MobileDisplay from "./components/MobileDisplay"

function App() {
  return (
    <div className="App">    
     <Media query="(max-width: 599px)">
       
       {matches =>
         matches ? (
             <MobileDisplay />
         ) : (
             <LinkToServer />
         )
       }
     </Media>
    
    </div>
  );
}

export default App;
