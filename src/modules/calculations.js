export class GeneralCalcFuncs {
  static GeneralFourMethods = ['/','*','+','-'];

  static strMethodConvertion(context_str,type="revert") {
    let temp_context = context_str.replace(new RegExp(/\+/, 'g'), "_+_");
      
    temp_context = temp_context.replace(new RegExp(/-/, 'g'), "_-_");
    temp_context = temp_context.replace(new RegExp(/\//, 'g'), "_/_");
    temp_context = temp_context.replace(new RegExp(/\*/, 'g'), "_*_");

    if(type!=="revert") {
      temp_context = temp_context.replace(new RegExp(/\//, 'g'), "_÷_");
      temp_context = temp_context.replace(new RegExp(/\*/, 'g'), "_×_");
    }
    
    return temp_context.split('_').filter(elm => elm!=='');
  }

  static strViseOprationToArray(context_str,type) {

    if(context_str.length>0) {
      let temp_context = this.strMethodConvertion(context_str,type);
      let parse = temp_context.map(elm => (this.GeneralFourMethods.includes(elm)) ? 
        String.fromCharCode(elm.toString().charCodeAt(0)) : parseFloat(elm));

      return parse.reverse();
    } else {
      return [];
    }
  }

  static checkForDecimals(context_str_arr) {
    
    if(context_str_arr.length>0) {
      let lst_var = context_str_arr;
      let lst_var_not_num = (this.GeneralFourMethods.includes(lst_var[0].toString()));

      return (lst_var_not_num) ? "0." : (lst_var[0].toString().includes('.')) ? '' : '.';
    } else {
      return "0.";
    }
  }

  static setZeros(context_str_arr) {
    
    if(context_str_arr.length>0) {
      let last_var = context_str_arr[0].toString();
      let lst_var_hv_no_decimal = (last_var.indexOf('.')===-1);
      let lst_chr_is_zero = (last_var.length===1 && last_var==='0');

      return (!lst_var_hv_no_decimal) ? '0' : ((!lst_chr_is_zero) ? '0' : '');
    } else {
      return '0'
    }
  }
  
  static retrieveDualMethods(lst_chr,opr_str,appender) {

    if(opr_str.length>=2) {
      let prv_chr = opr_str[opr_str.length-2];

      if(this.GeneralFourMethods.includes(lst_chr)) {
        if(this.GeneralFourMethods.includes(prv_chr)) {
          return (prv_chr===appender) ? opr_str.substring(0,opr_str.length-1) : opr_str.substring(0,opr_str.length-1)+appender;
        } else{
          return (lst_chr===appender) ? opr_str : opr_str+appender;
        }
      } else {
        return (lst_chr==='.') ? opr_str+'0'+appender : opr_str+appender;
      }
    } else {
      return (opr_str.length>0) ? opr_str+appender : ((appender==='-') ? appender : ((appender==='0.') ? '0.' : '0'));
    }
  }

  static retrieveTempValue(opr_type,val_i,val_ii,opr_type_alt='-') {
    
    switch(opr_type) {
      case '+': return val_i+val_ii;
      case '/': case '÷': return val_i/val_ii;
      case '*': case '×': return val_i*val_ii;
      case '-': return val_i-val_ii;
      default: 
        if (opr_type==="negative") {
          return this.retrieveTempValue(opr_type_alt,val_i*(-1),val_ii);
        } else {
          return this.retrieveTempValue(opr_type_alt,val_i,val_ii);
        }
    }
  }

  static retrieveContextValue(lst_chr,opr_str,appender) {
    let index = (lst_chr==="method" && ['+','/','-','*','.'].includes(appender)) ? 1 : 0;
  
    return opr_str.substring(0,(opr_str.length-index))+appender;
  }

  static retrieveTargetValue(whl_opr_str,tgt_chr) {
    let opr_str_arr = this.strViseOprationToArray(whl_opr_str);

    if(['.','0'].includes(tgt_chr)) {
      return ((tgt_chr==='.') ? this.checkForDecimals(opr_str_arr) : this.setZeros(opr_str_arr));
    } else {
      return ['×','÷'].includes(tgt_chr) ? ((tgt_chr==='×') ? '*' : '/') : tgt_chr;
    }
  }
  
  static calculateAnswer(context_str_arr) {
    let temp_context_arr = this.strViseOprationToArray(context_str_arr,"revert");
    let temp_var_i = 0;
    let temp_var_ii = 0;
    let temp_method_i = 0;
    let temp_method_ii = 0;
    let temp_result = 0;
    let iteration_break = 0;

      console.log("calculateAnswer org:",
      temp_context_arr,
      temp_context_arr.length,
       temp_context_arr.length>=2,
       temp_context_arr[0],
       /^\d+$/.test(temp_context_arr[0]));
    
    (temp_context_arr[temp_context_arr.length-1]==='-') && temp_context_arr.reverse();

    if(temp_context_arr[0]==='-') {
      if(temp_context_arr.length===2) {
        temp_context_arr = temp_context_arr.filter(elm => elm!=='-').map(elm => elm*(-1));
      } else if(temp_context_arr.length>=2 && /^\d+$/.test(temp_context_arr[0])) {
        temp_context_arr = [...temp_context_arr.slice(1,temp_context_arr.length-1)];
        temp_context_arr.shift((-1)*temp_context_arr[1])
      }
    }     

      console.log("calculateAnswer alt:",temp_context_arr);

    // if(this.GeneralFourMethods.includes(temp_context_arr[0])) {
    //   temp_context_arr.shift();
      
    //   if(this.GeneralFourMethods.includes(temp_context_arr[0])) { 
    //     temp_context_arr.shift();
    //   }
    // } else if(temp_context_arr.length===2 && this.GeneralFourMethods.includes(temp_context_arr[0])) { 
    //   temp_context_arr.shift();
    // }

    while(temp_context_arr.length>=1) {
      
      if(iteration_break>100) {
        return "ERROR!";
      }
      
      if(temp_context_arr.length===1 && temp_var_i===0) {
        let final_ans = temp_context_arr[0].toString();

        return (final_ans.length<=17) ? final_ans : final_ans.substring(0,15)+Math.floor(parseInt(final_ans[16]));
      } else {
        if(this.GeneralFourMethods.includes(temp_context_arr[0])) {
  
          if(temp_method_i===0 && temp_method_ii===0) {
            temp_method_i = temp_context_arr.shift();
            
            if(temp_method_i!==0 && temp_method_ii===0 && this.GeneralFourMethods.includes(temp_context_arr[0])) { 
             temp_method_ii = temp_context_arr.shift();
            }
          }
        } else {

          if(temp_var_i===0 && temp_var_ii===0) {
            temp_var_i = temp_context_arr.shift();
          } else if(temp_var_i!==0 && temp_var_ii===0) { 
            temp_var_ii = temp_context_arr.shift();

            if(temp_method_i!==0 && temp_method_ii===0) {

              if(temp_method_ii!==0) {
                temp_result = this.retrieveTempValue(temp_method_i,temp_var_i,temp_var_ii);
              } else {
                temp_result = this.retrieveTempValue(temp_method_i,temp_var_ii,temp_var_i);
              }
              
              temp_context_arr.unshift(temp_result);
            } else if(temp_method_i!==0 && temp_method_ii!==0) {
              console.log(temp_method_i,temp_method_ii)////////////////////////

              if(temp_method_i==="-") {
                temp_result = this.retrieveTempValue("negative",temp_var_i,temp_var_ii,temp_method_ii);
              } else {
                temp_result = this.retrieveTempValue(temp_method_i,temp_var_i,temp_var_ii);
              }
              
              temp_context_arr.unshift(temp_result);
            } 
            
            temp_var_i = 0;
            temp_var_ii = 0;
            temp_method_i = 0;
            temp_method_ii = 0;
          }
        }
      }

      iteration_break++;
    }

    if(temp_context_arr.length<1) {
      document.getElementById("operation").children[0].innerHTML = 0;
    }
  }
}
