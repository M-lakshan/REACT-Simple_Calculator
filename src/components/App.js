import React from 'react';
import MainWindow from './MainWindow';
import History from './History';
import '../styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: {
        list: [{opr: "12+1",ans:"13"}]
      }
    }
  }

  updateHistory(val) {
    let bool = this.state.history["list"].some(hst_obj => JSON.stringify(hst_obj) === JSON.stringify(val));
    
    try {
      if(!bool) {
        let new_history = [...this.state.history["list"], val];
        
        this.setState(
          {
            history: {
              list: new_history
            }
          }
        );
      }
    } catch (ex) {
      console.log(ex);
    }
  }
  
  clearHistory() {
    try {
      this.setState(
        {
          history: {
            list: []
          }
        }
      );
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return (
      <div id="Calculator" className="App">
        <MainWindow 
          updateHistory={(e) => this.updateHistory(e)}
        /> 
        <History 
          hstry={this.state.history}
          deleteHistory={(e) => this.clearHistory(e)}
        />        
      </div>
    );
  }
}

export default App;