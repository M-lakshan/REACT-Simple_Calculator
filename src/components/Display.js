import React from 'react';

class Display extends React.Component {

  deleteLastStep() {
    let context_holder = document.getElementById("operation").children[0];
    let last_index = 0;

    if(context_holder.innerHTML!=='') {
      last_index = (context_holder.innerHTML[(context_holder.innerHTML.length-2)]==='.') ? 2 : 1;
      context_holder.innerHTML = context_holder.innerHTML.substring(0,context_holder.innerHTML.length-last_index);
    } 
  }
// set a backspace keybord listner - should be in the main app component
// set a delete keybord listner - should be in the mai app component
  render() {
    return (
      <div id="Display">
        <h3 id="display">{this.props.prvw["temp_answer"]}</h3>
        <h4 id="operation">
          <span className="context">{this.props.prvw["whole_operation"]}</span>
          <span 
            id="delete_step"
            onClick={() => this.deleteLastStep()}>
            <i className="fa-solid fa-delete-left"></i>
          </span>
        </h4>
      </div>
    );
  }
}

export default Display;
