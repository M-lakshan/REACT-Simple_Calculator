import React from 'react';
import { GeneralCalcFuncs } from '../modules/calculations';

class KeyPad extends React.Component {

  handleKeyPress(evt) {
    // should be moved to the main app
  }

  triggerAction(target) {
    let main_display = document.getElementById("display");
    let backend_opr = document.getElementById("operation_alt");
    let user_opr = document.getElementById("operation").querySelector(".context");
    let whl_opr_str = backend_opr.innerHTML;
    let ext_opr_lst_chr = (whl_opr_str.length>0) ? whl_opr_str[whl_opr_str.length-1] : '';
    let tgt_val = GeneralCalcFuncs.retrieveTargetValue(whl_opr_str,target.innerHTML);
    let display_finalized = (main_display.classList.contains("finalized"));
    let context = "";
    
    setTimeout(() => target.classList.remove("tapped"), 200);

    if(["method","number"].includes(target.classList[1])) {

      context = (target.classList[1]==="number") ? whl_opr_str+tgt_val : GeneralCalcFuncs.retrieveDualMethods(ext_opr_lst_chr,whl_opr_str,tgt_val); 

      (target.classList[1]==="number" && display_finalized) && main_display.classList.remove("finalized");

      if(target.classList[1]==="method" && tgt_val!=='.' && display_finalized) {
        main_display.classList.remove("finalized");
        
        context = (tgt_val==='-') ? "1*"+(main_display.innerHTML[0]==='-' ? main_display.innerHTML : '-'+main_display.innerHTML) : main_display.innerHTML+tgt_val;

        this.props.finalizePrvw({
          answer: GeneralCalcFuncs.calculateAnswer(main_display.innerHTML),
          backend_operation: context,
          user_operation: GeneralCalcFuncs.strMethodConvertion(context,"visible").join('')
        });
      } else {
        target.classList.add("tapped");
        
        this.props.finalizePrvw({
          answer: GeneralCalcFuncs.calculateAnswer(context),
          backend_operation: context,
          user_operation: GeneralCalcFuncs.strMethodConvertion(context,"visible").join('')
        });
      }
    } else {

      if(target.id==="equals") {
        let final_ans = GeneralCalcFuncs.calculateAnswer(whl_opr_str);
        let final_ans_alt = (final_ans[0]==='-') ? final_ans.substring(1,final_ans.length) : final_ans;
        let opr_finished = GeneralCalcFuncs.GeneralFourMethods.includes(whl_opr_str[whl_opr_str.length-1]);
      // console.log("equals:",final_ans,final_ans_alt)////////////

        if(whl_opr_str.length>=1 && parseFloat(final_ans_alt)>0 && !opr_finished) {
          user_opr.parentElement.previousElementSibling.classList.add("finalized");

          this.props.finalizeCalc({
            ans: final_ans,
            opr: GeneralCalcFuncs.strMethodConvertion(whl_opr_str,"visible").join('')
          });
        }
      } else {
        user_opr.parentElement.previousElementSibling.classList.remove("finalized");
        
        this.props.finalizePrvw({
          answer: GeneralCalcFuncs.calculateAnswer("0"),
          backend_operation: '',
          user_operation: ''
        });
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