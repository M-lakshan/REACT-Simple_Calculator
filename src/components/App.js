import React from 'react';
import MainWindow from './MainWindow';
import History from './History';
import '../styles/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: {
        list: [{opr: "12+1",ans:"13"},{opr: "12+1",ans:"13"},]
      }
    }
  }
  
  expandHistory(val) {
    try {
      // this.setState(
      //   {...this.state, 
      //     history: {
      //       ...this.state.history,
      //       expanded: val
      //     }
      //   }
      // );
    } catch (ex) {
      console.log(ex);
    }
  }

  updateHistory(val) {
    let new_history = [...this.state.history["list"]];
    new_history.push(val);

    try {
      this.setState(
        {
          history: {
            list: new_history
          }
        }
      );
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