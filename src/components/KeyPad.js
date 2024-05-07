import React from 'react';
import { GeneralCalcFuncs } from '../modules/calculations';

class KeyPad extends React.Component {

  triggerAction(state_preview,target) {
    let opr_prvw_user = document.getElementById("operation").querySelector(".context");
    let opr_stk_arr = state_preview["backend_operation"];
    let main_display = document.getElementById("display");
    let main_display_alt = document.getElementById("display_alt");
    let display_finalized = (main_display_alt.classList.contains("finalized"));
    
    setTimeout(() => target.classList.remove("tapped"), 200);

    target.classList.add("tapped");
    
    if(target.classList[1]==="method" && display_finalized && !(target.innerHTML==='.')) {
      let tgt_val = GeneralCalcFuncs.retrieveTargetValue(parseFloat(main_display_alt.innerHTML),target.innerHTML);
      
      opr_stk_arr = [
        ((parseFloat(main_display_alt.innerHTML).toString()!=="NaN") ? parseFloat(main_display_alt.innerHTML) : 0),
        tgt_val
      ];
      
      main_display_alt.classList.remove("finalized");
      opr_prvw_user.innerHTML = GeneralCalcFuncs.oprationToContext(opr_stk_arr).join('');
      
      setTimeout(() => main_display.innerHTML = main_display_alt.innerHTML+tgt_val, 10);

      this.props.finalizePrvw({
        final_answer: GeneralCalcFuncs.calculateAnswer([...opr_stk_arr]),
        calculation: main_display_alt.innerHTML+tgt_val,
        backend_operation: opr_stk_arr,
        user_operation: opr_prvw_user.innerHTML
      });
    } else if(["method","number"].includes(target.classList[1])) {
      let stk_lst_elm = (opr_stk_arr.length>0) ? opr_stk_arr[opr_stk_arr.length-1] : [];
      let stk_lst_elm_chr = (stk_lst_elm.toString().length>0) ? stk_lst_elm.toString()[stk_lst_elm.toString().length-1] : [];
      let tgt_val = GeneralCalcFuncs.retrieveTargetValue(stk_lst_elm,target.innerHTML);
    
      display_finalized && main_display.classList.remove("finalized");

      if(target.classList[1]==="number") {

        if(opr_stk_arr.length<1) {
          opr_stk_arr = [tgt_val];
        } else {

          if(GeneralCalcFuncs.GeneralFourMethods.includes(stk_lst_elm_chr)) {
            opr_stk_arr = [ ...opr_stk_arr, tgt_val ];
          } else {
              opr_stk_arr = [
              ...opr_stk_arr.slice(0,opr_stk_arr.length-1),
              (stk_lst_elm+tgt_val)
            ];
          }
        }
      } else {

        if(opr_stk_arr.length<1 && tgt_val==='-') {
          opr_stk_arr = GeneralCalcFuncs.retrieveDualMethods(opr_stk_arr,tgt_val);
        } else if(opr_stk_arr.length>=2) {
          opr_stk_arr = GeneralCalcFuncs.retrieveDualMethods(opr_stk_arr,tgt_val);
        } else {

          if(opr_stk_arr.length>1) {
            opr_stk_arr = [ ...opr_stk_arr, (opr_stk_arr[opr_stk_arr.length-1]+tgt_val) ];
          } else {

            if(opr_stk_arr.length===1) {

              if(tgt_val.includes('.')) {
                opr_stk_arr = (opr_stk_arr[0].includes('.')) ? [ opr_stk_arr[0] ] : [[ opr_stk_arr[0]+tgt_val ]];
              } else {
                opr_stk_arr = [ opr_stk_arr[0],tgt_val ];
              }
            } else {
              opr_stk_arr = [ tgt_val ];
            }
          }
        }
      }

      opr_prvw_user.innerHTML = GeneralCalcFuncs.oprationToContext(opr_stk_arr).join('');

      let ans = GeneralCalcFuncs.calculateAnswer([...opr_stk_arr]);

      this.props.finalizePrvw({
        final_answer: ans,
        calculation: opr_stk_arr.join(''),
        backend_operation: opr_stk_arr,
        user_operation: opr_prvw_user.innerHTML
      });
    } else {

      if(target.id==="equals") {
        main_display_alt.classList.add("finalized");

        this.props.finalizePrvw({
          ...state_preview,
          calculation: main_display_alt.innerHTML
        });

        this.props.finalizeCalc({
          ans: GeneralCalcFuncs.calculateAnswer([...opr_stk_arr]),
          opr: opr_prvw_user.innerHTML
        });
      } else {
        main_display_alt.classList.remove("finalized");
        
        this.props.finalizePrvw({
          final_answer: GeneralCalcFuncs.calculateAnswer([]),
          calculation: 0,
          backend_operation: [],
          user_operation: ''
        });
      }
    }
  }

  componentDidMount() {
    document.querySelectorAll(".keypad_btn").forEach(btn => btn.addEventListener('click', () => this.triggerAction(this.props.prvw,btn)));
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