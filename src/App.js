import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import List from './Components/Admin';
import Content from './Components/Content';
import { Top_content } from './Components/Content';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div>
      
      <Header></Header>
      <Top_content></Top_content>

      <List></List>
     
    </div>
  );
}

export default App;
