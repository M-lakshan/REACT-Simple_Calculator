import React from 'react';
import { GeneralFuncs, FCCType, StandardType } from '../modules/calculations';

class KeyPad extends React.Component {

  handleKeyPress(evt) {
    // should be moved to the main app
  }

  triggerAction(target) {
    let whl_opr = document.getElementById("operation").querySelector(".context");
    let lst_chr_type = (['+','÷','-','×','.'].includes(whl_opr.innerHTML[whl_opr.innerHTML.length-1])) ? "method" : "number";
    let lst_chr = whl_opr.innerHTML[whl_opr.innerHTML.length-1];
    let tgt_val = GeneralFuncs.retrieveTargetValue(whl_opr.innerHTML,target.innerHTML);
    let context = "";
    
    if(["method","number"].includes(target.classList[1])) {
      target.classList.add("tapped");

        /***** type_diff - standard *****/
      //context = (lst_chr==="number") ? (whl_opr.innerHTML+tgt_val) : GeneralFuncs.retrieveContextValue(lst_chr,whl_opr.innerHTML,tgt_val); 
        /***** type_diff - fcc *****/
      context = (lst_chr_type==="number") ? (whl_opr.innerHTML+tgt_val) : FCCType.retrieveDualmethods(lst_chr,whl_opr.innerHTML,tgt_val); 
      // whl_opr.innerHTML = context

      setTimeout(() => target.classList.remove("tapped"), 200);

        /***** type_diff - standard *****/
      // this.props.finalizePreview({temp_answer: GeneralFuncs.calculateAnswer(context), whole_operation: context});
        /***** type_diff - fcc *****/
      this.props.finalizePrvw({temp_answer: GeneralFuncs.calculateAnswer(context,"fcc"), whole_operation: context});
    } else {
      if(target.id==="equals") {
        // this.props.calc((last_chr==="number") ? (opr.innerHTML+tgt_val) : (opr.innerHTML.substring(0,(opr.innerHTML[opr.innerHTML.length-2]))+tgt_val))
      } else {
        whl_opr.parentElement.previousElementSibling.innerHTML = "0";
        whl_opr.innerHTML = "";
      }
    }
  }

  componentDidMount() {
    document.querySelectorAll(".keypad_btn").forEach(btn => btn.addEventListener('click', () => this.triggerAction(btn)));

    document.addEventListener('keydown', (e) => this.handleKeyPress(e));
  }

  render() {

    return (
      <div id="KeyPad">
        <div id="clear" className="keypad_btn operation">AC</div>
        <div id="divide" className="keypad_btn method">÷</div>
        <div id="multiply" className="keypad_btn method">×</div>
        <div id="seven" className="keypad_btn number">7</div>
        <div id="eight" className="keypad_btn number">8</div>
        <div id="nine" className="keypad_btn number">9</div>
        <div id="subtract" className="keypad_btn method">-</div>
        <div id="four" className="keypad_btn number">4</div>
        <div id="five" className="keypad_btn number">5</div>
        <div id="six" className="keypad_btn number">6</div>
        <div id="add" className="keypad_btn method">+</div>
        <div id="three" className="keypad_btn number">3</div>
        <div id="two" className="keypad_btn number">2</div>
        <div id="one" className="keypad_btn number">1</div>
        <div id="equals" className="keypad_btn operation">=</div>
        <div id="zero" className="keypad_btn number">0</div>
        <div id="decimal" className="keypad_btn method">.</div>
      </div>
    );
  }
}

export default KeyPad;