import React from 'react';
import Display from './Display';
import KeyPad from './KeyPad';

class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.updatePreview = this.updatePreview.bind(this);
    this.finalizeCalculation = this.finalizeCalculation.bind(this);
    this.state = {
      preview: {
        final_answer: 0,
        calculation: "",
        user_operation: "",
        backend_operation: []
      }
    }
  }
  
  updatePreview(val) {
    try {
      this.setState({...this.state, preview: val});
    } catch (ex) {
      console.log(ex);
    }
  }

  finalizeCalculation(val) {
    try {
      this.props.updateHistory({
        opr: val["opr"],
        ans: val["ans"]
      })
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return (
      <div id="Section_i">
        <Display 
          prvw={this.state.preview}
          finalizePrvw={(e) => this.updatePreview(e)}
        />        
        <KeyPad 
          prvw={this.state.preview}
          finalizePrvw={(e) => this.updatePreview(e)}
          finalizeCalc={(e) => this.finalizeCalculation(e)}
        />   
      </div>
    );
  }
}

export default MainWindow;