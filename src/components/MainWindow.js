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
        temp_answer: 0,
        whole_operation: "12.2÷13.5"
      },
      calculation: {
        final_answer: 0,
        whole_operation: ""
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
      this.setState({...this.state, calculation: val});
    } catch (ex) {
      console.log(ex);
    }
  }

  // componentDidUpdate() {
  //   try {
  //     this.props.updateHistory({opr: this.state.calculation["final_answer"], ans: this.state.calculation["whole_operation"]});
  //   } catch (ex) {
  //     console.log(ex);
  //   }
  // }

  render() {
    return (
      <div id="Section_i">
        <Display prvw={this.state.preview}/>        
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