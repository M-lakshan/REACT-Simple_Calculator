import React from 'react';
import { GeneralCalcFuncs } from '../modules/calculations';

class Display extends React.Component {

  deleteLastStep() {
    let final_previewer = document.getElementById("display_alt");
    let context_holder = document.getElementById("operation").children[0];
    let opr_stk_arr = this.props.prvw["backend_operation"];

    if(context_holder.innerHTML!=='') {
      opr_stk_arr = [...opr_stk_arr.slice(0,opr_stk_arr.length-1)];
      final_previewer.classList.remove("finalized");

      let restrc_ans = GeneralCalcFuncs.calculateAnswer([...opr_stk_arr]);

      this.props.finalizePrvw({
        final_answer: restrc_ans,
        calculation: restrc_ans,
        backend_operation: opr_stk_arr,
        user_operation: GeneralCalcFuncs.oprationToContext(opr_stk_arr).join('')
      });
    } 
  }
// set a backspace keybord listner - should be in the main app component
// set a delete keybord listner - should be in the mai app component
  render() {
    return (
      <div id="Display">
        <h3 id="display_alt" hidden>{this.props.prvw["final_answer"]}</h3>
        <h3 id="display">{(this.props.prvw["calculation"]!=="") ? this.props.prvw["calculation"] : this.props.prvw["backend_operation"].join('')}</h3>
        <h4 id="operation">
          <span className="context">{this.props.prvw["user_operation"]}</span>
          <span 
            id="delete_step"
            className={(this.props.prvw["user_operation"]==="") ? "empty" : ""}
            onClick={() => this.deleteLastStep()}>
            <i className="fa-solid fa-delete-left"></i>
          </span>
        </h4>
      </div>
    );
  }
}

export default Display;
