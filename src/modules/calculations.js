export class GeneralFuncs {

  static calculateAnswer(context_str_arr,type="standard") {
    let temp_context_str = (type==="fcc") ? context_str_arr.split('').reverse().join('') : context_str_arr;
    let temp_var_i = 0;
    let temp_var_ii = 0;
    let temp_method_i = 0;
    let temp_method_ii = 0;
    let temp_result = 0;
    
    temp_context_str = temp_context_str.replace(new RegExp('/+', 'g'), "_+_");
    temp_context_str = temp_context_str.replace(new RegExp('-', 'g'), "_-_");
    temp_context_str = temp_context_str.replace(new RegExp(/÷/, 'g'), "_÷_");
    temp_context_str = temp_context_str.replace(new RegExp('×', 'g'), "_×_");

    let temp_context_arr = temp_context_str.split('_');

    for(let i=0; i<=temp_context_arr.length-1; i++) {

      if(['+','÷','-','×'].includes(context_str_arr[i])) {

        if(temp_method_i===0 && temp_method_ii===0) {
          temp_method_i = parseFloat(temp_context_arr.reverse().pop());
          temp_context_arr.reverse();
        } else if(temp_method_i!==0 && temp_method_ii===0) { 
          temp_method_ii = parseFloat(temp_context_arr.reverse().pop());
          temp_context_arr.reverse();
        } else {
          if(temp_method_i!==0 && temp_method_ii===0) { 
            temp_result = this.retrieveTempValue(context_str_arr[i],temp_var_i,temp_var_ii);
          } else {
            temp_result = this.retrieveTempValue(context_str_arr[i],temp_var_i,temp_var_ii); //fix
            temp_result = this.retrieveTempValue(context_str_arr[i],temp_var_i,temp_var_ii); //fix
          }
          temp_context_arr.push(temp_result); //fix - push or shift?
        }
      } else {
        if(temp_var_i===0 && temp_var_ii===0) {
          temp_var_i = parseFloat(temp_context_arr.reverse().pop());
          temp_context_arr.reverse();
        } else if(temp_var_i!==0 && temp_var_ii===0) { 
          temp_var_ii = parseFloat(temp_context_arr.reverse().pop());
          temp_context_arr.reverse();
        } else {
          temp_result = this.retrieveTempValue(); //fix
          // push or shift as for next step?
        }
      }
    }
    
    return 10;
  }
  
  static checkForDecimals(context_str) {
    
    if(context_str.length>0) {
      let temp_context = context_str.split('').reverse();
  
      for(let i=0; i<=temp_context.length-1; i++) {
        if(temp_context[i]==='.') {
          return '';
        } else if(['+','÷','-','×'].includes(temp_context[i])) {
          return "0."
        }
      }
    } else {
      return '0.';
    }
  }
  
  static retrieveTempValue(opr_type,val_i,val_ii) {
    let elm_i = parseFloat(val_i);
    let elm_ii = parseFloat(val_ii);

    switch(opr_type) {
      case '+': return elm_i+elm_ii;
      case '÷': return elm_i/elm_ii;
      case '×': return elm_i*elm_ii;
      case '-': return elm_i*elm_ii;
      default: return elm_i*(-1)*elm_ii;
    }
  }

  static retrieveContextValue(lst_chr,opr_str,appender) {
    let index = (lst_chr==="method" && ['+','÷','-','×','.'].includes(appender)) ? 1 : 0;
  
    return opr_str.substring(0,(opr_str.length-index))+appender;
  }

  static retrieveTargetValue(opr_str,tgt_str) {
    return (tgt_str==='.') ? this.checkForDecimals(opr_str) : tgt_str;
  }
} 

export class FCCType {

  static retrieveDualmethods(lst_chr,opr_str,appender) {

    if(['+','÷','-','×'].includes(appender)) {
      let prv_chr = opr_str[opr_str.length-2];

      if(['+','÷','-','×'].includes(lst_chr) && (['+','÷','-','×'].includes(prv_chr))) {
        return (lst_chr===appender) ? opr_str : (opr_str.substring(0,opr_str.length-1)+appender);
      }
    }

    return opr_str+appender;
  }
}

export  class StandardType {

  
}
