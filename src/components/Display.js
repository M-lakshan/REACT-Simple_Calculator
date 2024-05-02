import React from 'react';
import { GeneralCalcFuncs } from '../modules/calculations';

class Display extends React.Component {

  deleteLastStep() {
    let context_holder = document.getElementById("operation_alt");
    let context = "";
    let last_index = 0;

    if(context_holder.innerHTML!=='') {
      last_index = (context_holder.innerHTML[(context_holder.innerHTML.length-2)]==='.') ? 2 : 1;
      context = context_holder.innerHTML.substring(0,context_holder.innerHTML.length-last_index);
      context_holder.previousElementSibling.classList.remove("finalized");
      
      this.props.finalizePrvw({
        answer: GeneralCalcFuncs.calculateAnswer((context.length<1) ? 0 : context),
        backend_operation: context,
        user_operation: GeneralCalcFuncs.strMethodConvertion(context,"visible").join('')
      });
    } 
  }
// set a backspace keybord listner - should be in the main app component
// set a delete keybord listner - should be in the mai app component
  render() {
    return (
      <div id="Display">
        <h3 id="display_alt" hidden>{this.props.prvw["answer"]}</h3>
        <h3 id="display">{this.props.prvw["answer"]}</h3>
        <h4 id="operation">
          <span className="context">{this.props.prvw["user_operation"]}</span>
          <span 
            id="delete_step"
            className={(this.props.prvw["user_operation"]==="") ? "empty" : ""}
            onClick={() => this.deleteLastStep()}>
            <i className="fa-solid fa-delete-left"></i>
          </span>
        </h4>
        <p id="operation_alt" hidden>{this.props.prvw["backend_operation"]}</p>
      </div>
    );
  }
}

export default Display;
