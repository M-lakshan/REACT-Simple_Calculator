import React from 'react';
import { GeneralCalcFuncs } from '../modules/calculations';

class KeyPad extends React.Component {

  handleKeyPress(evt) {
    // should be moved to the main app
  }

  triggerAction(state_preview,target) {
    let opr_prvw_user = document.getElementById("operation").querySelector(".context");
    let opr_stk_arr = state_preview["backend_operation"];
    let opr_stk_arr_lst_elm_chr = (opr_stk_arr.length>0) ? opr_stk_arr[opr_stk_arr.length-1] : [];
    
    setTimeout(() => target.classList.remove("tapped"), 200);
    
    if(["method","number"].includes(target.classList[1])) {
      let main_display = document.getElementById("display");
      let display_finalized = (main_display.classList.contains("finalized"));
      let tgt_val = GeneralCalcFuncs.retrieveTargetValue(opr_stk_arr_lst_elm_chr,target.innerHTML);

      target.classList.add("tapped");

      if(target.classList[1]==="number") {
        display_finalized && main_display.classList.remove("finalized");

        if(opr_stk_arr.length===0) {
          opr_stk_arr = [parseFloat(tgt_val)];
          console.log(opr_stk_arr,(opr_stk_arr.length===0))/////////
        } else {
          let var_is_dec_or_neg = (opr_stk_arr[0].toString().includes('.') || opr_stk_arr[0].toString().includes('-'));
          
          if(opr_stk_arr.length===1) {
            let var_is_surrounded = (opr_stk_arr[0].toString().includes('('));

            console.log("here",var_is_surrounded)///////////////
            opr_stk_arr = (var_is_dec_or_neg) ? [opr_stk_arr[0].toString()+tgt_val] : 
              (var_is_surrounded ? [opr_stk_arr[0].toString()+tgt_val] : [parseFloat(opr_stk_arr[0].toString()+tgt_val)]);

            console.log("here",opr_stk_arr)///////////////
          } else {

            if(GeneralCalcFuncs.GeneralFourMethods.includes(opr_stk_arr_lst_elm_chr.toString())) {
              
              if(GeneralCalcFuncs.GeneralFourMethods.includes(opr_stk_arr[opr_stk_arr.length-2].toString())) {
                opr_stk_arr = (opr_stk_arr_lst_elm_chr.toString()==='-') ?
                  [...opr_stk_arr.slice(0,opr_stk_arr.length-1),parseFloat(tgt_val*(-1))] :
                  [
                    ...opr_stk_arr.slice(0,opr_stk_arr.length-2),
                    ...opr_stk_arr.slice(opr_stk_arr.length-1,opr_stk_arr.length),
                    tgt_val
                  ];
              } else {
                opr_stk_arr = [...opr_stk_arr,parseFloat(tgt_val)];
              }
            } else {
              opr_stk_arr = [
                ...opr_stk_arr.slice(0,opr_stk_arr.length-1),
                parseFloat(opr_stk_arr[opr_stk_arr.length-1].toString()+tgt_val)
              ];
            }
          }
        }

        opr_stk_arr = GeneralCalcFuncs.oprationToContext(opr_stk_arr,"compress");
            console.log("there",opr_stk_arr)///////////////

      } else {

        if(tgt_val.toString()==='.') {

          if(opr_stk_arr.length>0) {
            
            if(GeneralCalcFuncs.GeneralFourMethods.includes(opr_stk_arr_lst_elm_chr.toString())) {
              opr_stk_arr = [...opr_stk_arr,tgt_val];
            } else {
              opr_stk_arr = [...opr_stk_arr.slice(0,opr_stk_arr.length-1),(opr_stk_arr[opr_stk_arr.length-1].toString()+tgt_val)];
            }
          } else {
            opr_stk_arr = [...opr_stk_arr,tgt_val];
          }
          
          opr_stk_arr = GeneralCalcFuncs.oprationToContext(opr_stk_arr,"compress");
        } else {
          opr_stk_arr = GeneralCalcFuncs.oprationToContext(opr_stk_arr,"compress");
          
          opr_stk_arr = GeneralCalcFuncs.retrieveDualMethods(opr_stk_arr,opr_stk_arr_lst_elm_chr,opr_prvw_user.innerHTML.length,tgt_val).filter(elm => elm!=='');
        } 
      }

      console.log(opr_stk_arr) //////
      
      opr_prvw_user.innerHTML = GeneralCalcFuncs.oprationToContext(opr_stk_arr).join('');

      if(target.classList[1]==="method" && display_finalized && (tgt_val.toString().indexOf('.')<0)) {
        let result = (parseFloat(main_display.innerHTML).toString()!=="NaN") ? parseFloat(main_display.innerHTML) : 0;

        main_display.classList.remove("finalized");
        
        opr_stk_arr = [result,tgt_val];
      }

      this.props.finalizePrvw({
        answer: GeneralCalcFuncs.calculateAnswer([...opr_stk_arr]),
        backend_operation: opr_stk_arr,
        user_operation: opr_prvw_user.innerHTML
      });
    } else {

      if(target.id==="equals") {
        opr_prvw_user.parentElement.previousElementSibling.classList.add("finalized");

        this.props.finalizeCalc({
          ans: GeneralCalcFuncs.calculateAnswer([...opr_stk_arr]),
          opr: opr_prvw_user.innerHTML
        });
      } else {
        opr_prvw_user.parentElement.previousElementSibling.classList.remove("finalized");
        
        this.props.finalizePrvw({
          answer: GeneralCalcFuncs.calculateAnswer([]),
          backend_operation: [],
          user_operation: ''
        });
      }
    }
  }

  componentDidMount() {
    document.querySelectorAll(".keypad_btn").forEach(btn => btn.addEventListener('click', () => this.triggerAction(this.props.prvw,btn)));

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