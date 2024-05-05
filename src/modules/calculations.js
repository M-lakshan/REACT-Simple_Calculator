export class GeneralCalcFuncs {
  static GeneralFourMethods = ['/','*','+','-'];

  static oprationToContext(opr_arr,type="user_prv") {

    if(type==="dual_method_fix" && opr_arr[0]!==undefined) {
      let opr_arr_upd = [];
      let opr_arr_rvs = opr_arr.map(elm => (parseFloat(elm).toString()==="NaN") ? elm : 
        ((elm.toString()[elm.toString().length-1]) ? elm : parseFloat(elm))).reverse();

      let plus_w_minus = (opr_arr_rvs.indexOf('+')+1===opr_arr_rvs.indexOf('-'));
      let minus_w_plus = (opr_arr_rvs.indexOf('-')+1===opr_arr_rvs.indexOf('+'));
      let plus_w_div = (opr_arr_rvs.indexOf('+')+1===opr_arr_rvs.indexOf('/'));
      let div_w_plus = (opr_arr_rvs.indexOf('/')+1===opr_arr_rvs.indexOf('+'));
      let plus_w_mult = (opr_arr_rvs.indexOf('+')+1===opr_arr_rvs.indexOf('*'));
      let mult_w_plus = (opr_arr_rvs.indexOf('*')+1===opr_arr_rvs.indexOf('+'));
      let minus_w_div = (opr_arr_rvs.indexOf('-')+1===opr_arr_rvs.indexOf('/'));
      let div_w_minus = (opr_arr_rvs.indexOf('/')+1===opr_arr_rvs.indexOf('-'));
      let minus_w_mult = (opr_arr_rvs.indexOf('-')+1===opr_arr_rvs.indexOf('*'));
      let mult_w_minus = (opr_arr_rvs.indexOf('*')+1===opr_arr_rvs.indexOf('-'));
      let div_w_mult = (opr_arr_rvs.indexOf('/')+1===opr_arr_rvs.indexOf('*'));
      let mult_w_div = (opr_arr_rvs.indexOf('*')+1===opr_arr_rvs.indexOf('/'));

      let any_ext_dual_meths = ((plus_w_minus || minus_w_plus) || (plus_w_div || div_w_plus) || (plus_w_mult || mult_w_plus)
          || (minus_w_div || div_w_minus) || (minus_w_mult || mult_w_minus) || (div_w_mult || mult_w_div));

      while(opr_arr_rvs.length>=1) {

        if(opr_arr_rvs.length<1) {
          return opr_arr_upd;
        } else {

          if(any_ext_dual_meths) {
            
            if(opr_arr_rvs[1]!==undefined) {
        console.log("not un",opr_arr_rvs,opr_arr_upd)/////////////////////////
              
              if(this.GeneralFourMethods.includes(opr_arr_rvs[1])) {
        console.log("2 a meth",opr_arr_rvs,opr_arr_upd)/////////////////////////
              
                if(opr_arr_rvs[2]!==undefined) {
        console.log("3 not un",opr_arr_rvs,opr_arr_upd)/////////////////////////

                  if(this.GeneralFourMethods.includes(opr_arr_rvs[2])) {
        console.log("3 a meth",opr_arr_rvs,opr_arr_upd)/////////////////////////
                    
                    if(opr_arr_rvs[1]==='-') {
              console.log("3 === (-)",opr_arr_rvs,opr_arr_upd)/////////////////////////
                      opr_arr_upd.unshift((-1)*opr_arr_rvs.shift()); //number_negated 0 x [-1] 1
                      opr_arr_rvs.shift(); //neglected_method 1
                      opr_arr_upd.unshift(opr_arr_rvs.shift()); //method 2
              console.log("3 === (-) after",opr_arr_rvs,opr_arr_upd)/////////////////////////
                    } else {
        console.log("3 !== (-)",opr_arr_rvs,opr_arr_upd)/////////////////////////
                      opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 0
                      opr_arr_upd.unshift(opr_arr_rvs.shift()); //method 1
                      opr_arr_rvs.shift(); //neglected_method 2
                      opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 2
        console.log("3 !== (-) after",opr_arr_rvs,opr_arr_upd)/////////////////////////
                    }
                  } else {
        console.log("3 num",opr_arr_rvs,opr_arr_upd)/////////////////////////
                    opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 0
                    opr_arr_upd.unshift(opr_arr_rvs.shift()) //method 1
                    opr_arr_upd.unshift(opr_arr_rvs.shift()) //number 2
        console.log("3  num after",opr_arr_rvs,opr_arr_upd)/////////////////////////
                  }
                } else {
        console.log("3 un",opr_arr_rvs,opr_arr_upd)/////////////////////////

                  opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 0
                  opr_arr_upd.unshift(opr_arr_rvs.shift()); //method 1
        console.log("3 un after",opr_arr_rvs,opr_arr_upd)/////////////////////////
                }
              } else {
        console.log("1 not a meth",opr_arr_rvs,opr_arr_upd)/////////////////////////
                opr_arr_rvs.shift(); //method 0
                opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 1
        console.log("1 not a meth after",opr_arr_rvs,opr_arr_upd)/////////////////////////
              }
            } else {
              opr_arr_upd.unshift(opr_arr_rvs.shift()); //first_&_last_elm 0
            }

            if(opr_arr_rvs.length<1) {
              return opr_arr_upd;
            }
          } else {
            return opr_arr_rvs.reverse();
          }
        }
      }
    } else {
      if(opr_arr.length>0) {
        return opr_arr.map(elm => (this.GeneralFourMethods.includes(elm.toString())) ? 
          String.fromCharCode(elm.toString().charCodeAt(0)).replace(new RegExp(/\//, 'g'), "÷").replace(new RegExp(/\*/, 'g'), "×") : elm)
            .map(elm => ((elm.toString().includes('-') && elm.toString().length>1) || 
            (elm.toString().includes('.') && elm.toString().length>2)) ? `(${elm})` : elm);
      } else {
        return [];
      }
    }
  }

  static checkForDecimals(context_arr_elm) {
    let lst_oprnd = context_arr_elm.toString();
    
    if(lst_oprnd.length>0) {
      let lst_chr_is_mth = (this.GeneralFourMethods.includes(lst_oprnd[lst_oprnd.length-1]));
      
      return (lst_chr_is_mth) ? "0." : ((lst_oprnd.includes('.')) ? '' : '.');
    } else {
      return "0.";
    }
  }

  static setZeros(context_arr_elm) {
    let lst_oprnd = context_arr_elm.toString();
    
    if(lst_oprnd.length>0) {

      if(lst_oprnd.includes('.')) {
        return '0';
      } else {

        if(lst_oprnd.length===1) {
          return (lst_oprnd==='0') ? '' : '0'; 
        } else {
          return '0';
        }
      }
    } else {
      return '0'
    }
  }
  
  static retrieveTargetValue(lst_oprnd,tgt_chr) {

    if(['.','0'].includes(tgt_chr)) {
      return ((tgt_chr==='.') ? this.checkForDecimals(lst_oprnd) : this.setZeros(lst_oprnd));
    } else {
      return ['×','÷'].includes(tgt_chr) ? ((tgt_chr==='×') ? '*' : '/') : tgt_chr;
    }
  }
  
  static retrieveTempValue(opr_type,val_i,val_ii) {
    
    switch(opr_type) {
      case '+': return val_i+val_ii;
      case '/': case '÷': return val_i/val_ii;
      case '*': case '×': return val_i*val_ii;
      case '-': return val_i-val_ii;
      default: 
        let spc_index = opr_type;

        if((parseFloat(val_i).toString()==="NaN")) {
          return val_ii;
        } else {
          return (val_i.toString().length<=spc_index) ? parseFloat(val_i) : 
            (
              parseFloat(val_i.toString().substring(0,(spc_index-2)) +
              ((Math.floor(parseInt(val_i.toString()[spc_index-1]))<=1) ? val_i.toString()[spc_index-1] :
                Math.floor(parseInt(val_i.toString()[spc_index-1]))))
            );
        }
    }
  }

  static retrieveDualMethods(opr_arr,appender) {
    let lst_elm = (opr_arr.length>0) ? opr_arr[opr_arr.length-1] : '';
    let lst_elm_chr = lst_elm.toString()[lst_elm.toString().length-1];

    if(opr_arr.length>=2) {
      let prv_chr = opr_arr[opr_arr.length-2].toString();

      if(this.GeneralFourMethods.includes(lst_elm_chr)) {
        
        if(this.GeneralFourMethods.includes(prv_chr)) {
          return (prv_chr===appender) ? [ ...opr_arr ] : [ ...opr_arr.slice(0,opr_arr.length-1), appender ];
        } else{
          return [ ...opr_arr, appender ];
        }
      } else {
          
        if(lst_elm_chr==='.') { 
          return (/^\d+$/.test(prv_chr)) ? [
            ...opr_arr.slice(0,opr_arr.length-2),
              (lst_elm+appender)
          ] : [ 
            ...opr_arr.slice(0,opr_arr.length-1),
            (lst_elm+'0'),
            appender
          ];
        } else {
          return (/^\d+$/.test(prv_chr) || (/^\d+$/.test(lst_elm) && appender==='.')) ? [
            ...opr_arr.slice(0,opr_arr.length-1),
              (lst_elm+appender)
          ] : [ ...opr_arr, appender ];
        }
      }
    } else {

      if(opr_arr.length===1) {
        return [ ...opr_arr[0]+appender ];
      } else {
        return (appender==='-') ? [ appender ] : [];
      }
    }
  }

  static sequenceCalc(opr_arr) {
    let temp_opr_arr = [...opr_arr];
    let temp_var_i = '';
    let temp_var_ii = '';
    let temp_method = '';
    let temp_result = '';
    let iteration_break = 0;

    while(temp_opr_arr.length>=1) {

      if(iteration_break>100) {
        return "ERROR!";
      }

      if(temp_opr_arr.length===1) {
        break;
      }

      if(this.GeneralFourMethods.includes(temp_opr_arr[0])) {

        if(temp_method==='') {
          temp_method = temp_opr_arr.shift();

          if(!this.GeneralFourMethods.includes(temp_opr_arr[0])) {

            if(temp_var_i!=='' && temp_var_ii==='') {
              temp_var_ii = temp_opr_arr.shift();
              temp_result = this.retrieveTempValue(temp_method,temp_var_i,temp_var_ii);
              temp_opr_arr.unshift(temp_result);
            }
          }
        }
      } else {

        if(temp_var_i==='' && temp_var_ii==='') {
          temp_var_i = temp_opr_arr.shift();
        } else if(temp_var_i!=='' && temp_var_ii==='') { 
          temp_var_ii = temp_opr_arr.shift();
          temp_result = this.retrieveTempValue(temp_method,temp_var_i,temp_var_ii);
          temp_opr_arr.unshift(temp_result);
        }
      }

      if(temp_var_i!=='' && temp_var_ii!=='' && temp_method!=='') {
        temp_var_i = '';
        temp_var_ii = '';
        temp_method = '';
      } 

      iteration_break++;
    }

    return [temp_opr_arr[0]];
  }
  
  static calculateAnswer(opr_arr) {
    let iteration_break = 0;
    let final_result = 0;

    if(opr_arr.length>0) {
      let temp_opr_arr = opr_arr.map(elm => (this.GeneralFourMethods.includes(elm)) ? elm : 
        ((parseFloat(elm).toString()==="NaN") ? elm : parseFloat(elm)));

      if(this.GeneralFourMethods.includes(temp_opr_arr[temp_opr_arr.length-1])) {
        temp_opr_arr.pop();
        
        if(this.GeneralFourMethods.includes(temp_opr_arr[temp_opr_arr.length-1])) {
          temp_opr_arr.pop();
        }
      }

      console.log("pre finanlized stk:",temp_opr_arr)//////////////////////////

      temp_opr_arr = (temp_opr_arr) ? this.oprationToContext(temp_opr_arr,"dual_method_fix") : [];
      console.log("optimized stk:",temp_opr_arr)//////////////////////////
      console.log("\n")//////////////////////////
      console.log(temp_opr_arr.length<1,temp_opr_arr===undefined)//////////////////////////

      if(temp_opr_arr.length<1 || temp_opr_arr===undefined) {
        return final_result;
      } else {
        let precedence = (temp_opr_arr.includes('/') || temp_opr_arr.includes('*'));

        while(temp_opr_arr.length>=1) {
          let oprtr = [];
          let oprnd_i = '';
          let oprnd_ii = '';

          if(iteration_break>10) {
            return "ERROR!";
          }

          if(temp_opr_arr.length<=2) {
            return this.retrieveTempValue(17,temp_opr_arr[0],final_result);
          } else {

            if(temp_opr_arr[0]==='-') {
              temp_opr_arr = [
                parseFloat(temp_opr_arr[1])*(-1),
                ...temp_opr_arr.slice(2,temp_opr_arr.length)
              ];
            }

            if(precedence || temp_opr_arr.includes('*') || temp_opr_arr.includes('/')) {

              if(temp_opr_arr.includes('/')) {
                oprtr = ['/',temp_opr_arr.indexOf('/')];
              } else if(temp_opr_arr.includes('*')) {
                oprtr = ['*',temp_opr_arr.indexOf('*')];
              } else if(temp_opr_arr.includes('+')) {
                oprtr = ['+',temp_opr_arr.indexOf('+')];
              } else if(temp_opr_arr.includes('-')) {
                oprtr = ['-',temp_opr_arr.indexOf('-')];
              }
              
              oprnd_i = temp_opr_arr[oprtr[1]-1];
              oprnd_ii = temp_opr_arr[oprtr[1]+1];
    
              temp_opr_arr = [
                ...temp_opr_arr.slice(0,oprtr[1]-1),
                this.retrieveTempValue(17,parseFloat(this.retrieveTempValue(oprtr[0],oprnd_i,oprnd_ii)),final_result),
                ...temp_opr_arr.slice(oprtr[1]+2,temp_opr_arr.length)
              ];
              
              oprtr = [];
            } else {
              temp_opr_arr = this.sequenceCalc(temp_opr_arr);
            }
          }
          
          iteration_break++;
        }
      }
    }

    return final_result;
  }
}
