export class GeneralCalcFuncs {
  static GeneralFourMethods = ['/','*','+','-'];

  static oprationToContext(opr_arr) {

    if(opr_arr.length>0) {
      return opr_arr.map(elm => (this.GeneralFourMethods.includes(elm.toString())) ? 
        String.fromCharCode(elm.toString().charCodeAt(0)) : 
        ((parseFloat(elm)<0) ? `(${elm})` : 
        ((elm.toString().indexOf('.')<0) ? elm : `(${elm})`)));
    } else {
      return [];
    }
  }

  static checkForDecimals(context_arr_elm) {
    let lst_oprnd = context_arr_elm.toString();
    
    if(lst_oprnd.length>0) {
      let lst_chr = lst_oprnd[lst_oprnd.length-1];
      let lst_var_not_num = (this.GeneralFourMethods.includes(lst_chr));

      return (lst_var_not_num) ? "0." : (lst_oprnd.includes('.')) ? '' : '.';
    } else {
      return "0.";
    }
  }

  static setZeros(context_arr_elm) {
    let lst_oprnd = context_arr_elm.toString();
    
    if(lst_oprnd.length>0) {
      let elm_hv_no_decimal = (lst_oprnd.indexOf('.')===-1);
      let elm_is_zero = (lst_oprnd.length===1 && context_arr_elm==='');

      return (!elm_hv_no_decimal) ? '0' : ((!elm_is_zero) ? '0' : '');
    } else {
      return '0'
    }
  }
  
  static retrieveDualMethods(opr_arr,lst_elm,prv_length,appender) {

    console.log((opr_arr.length>=2),prv_length,opr_arr)//////////////////
    if(opr_arr.length>=2 && prv_length>=2) {
      let lst_chr = lst_elm.toString();
      let prv_chr = opr_arr[opr_arr.length-2].toString();

      if(this.GeneralFourMethods.includes(lst_chr)) {
        if(this.GeneralFourMethods.includes(prv_chr)) {
          console.log("lst_&_prv_elm_is_a_m")////////////
          return (prv_chr===appender) ? [...opr_arr.slice(0,opr_arr.length-1)] :
            [...opr_arr.slice(0,opr_arr.length-1),appender];
        } else{
          console.log("lst_elm_is_a_m")/////////////////
          return (lst_chr===appender) ? [...opr_arr] : [...opr_arr,appender];
        }
      } else {
        console.log("lst_elm_isnt_a_m",lst_elm)///////////////////
        if(lst_chr.indexOf('(')>0) {
          
          if(lst_chr[lst_chr.length-1]==='.') {
            return [
              ...opr_arr.slice(0,opr_arr.length-1),
              parseFloat(lst_chr+'0'.replace('(','')),
              appender
            ];
          } else {
            return [
              ...opr_arr.slice(0,opr_arr.length-1),
              parseFloat(lst_chr.replace('(','')),
              appender
            ];
          }
        } else { 
          return (lst_chr[lst_chr.length-1]==='.') ? 
            [
              ...opr_arr.slice(0,opr_arr.length-1),
              parseFloat(lst_chr+'0'),
              appender
            ] : [...opr_arr,appender];
        }        
      }
    } else {
        console.log([...opr_arr,appender])///////////////////

      return (opr_arr.length===1) ? [...opr_arr,appender] : 
        [(appender==='-') ? "(-" : ((appender==='0.') ? '0.' : [...opr_arr,appender])];
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

  static retrieveTargetValue(lst_oprnd,tgt_chr) {

    if(['.','0'].includes(tgt_chr)) {
      return ((tgt_chr==='.') ? this.checkForDecimals(lst_oprnd) : this.setZeros(lst_oprnd));
    } else {
      return ['×','÷'].includes(tgt_chr) ? ((tgt_chr==='×') ? '*' : '/') : tgt_chr;
    }
  }
  
  static calculateAnswer(opr_arr) {
    let temp_opr_arr = opr_arr;
    let iteration_break = 0;
    let final_result = 0;

    if(this.GeneralFourMethods.includes(temp_opr_arr[temp_opr_arr.length-1])) {
      temp_opr_arr.pop();
      
      if(this.GeneralFourMethods.includes(temp_opr_arr[temp_opr_arr.length-1])) {
        temp_opr_arr.pop();
      }
    }
    
    if(temp_opr_arr.length<1) {
      return final_result;
    } else {
      
      console.log("finanlized stk:",opr_arr)//////////////////////////

      while(temp_opr_arr.length>=1) {
        let oprnd_i = '';
        let oprnd_ii = '';

        if(iteration_break>100) {
          return "ERROR!";
        }

      console.log("itr stk:",temp_opr_arr)//////////////////////

        if(temp_opr_arr.length<=2) {
          return parseFloat(temp_opr_arr[0]);
        } else {

          if(temp_opr_arr.indexOf('/')!==-1) {
            let division_index = temp_opr_arr.indexOf('/');
            
            oprnd_i = temp_opr_arr[division_index-1];
            oprnd_ii = temp_opr_arr[division_index+1];

            temp_opr_arr = [
              ...temp_opr_arr.slice(0,division_index-1),
              this.retrieveTempValue('/',oprnd_i,oprnd_ii),
              ...temp_opr_arr.slice(division_index+2,temp_opr_arr.length)
            ];
          } else if(temp_opr_arr.indexOf('*')!==-1) {
            let multiplication_index = temp_opr_arr.indexOf('*');
            
            oprnd_i = temp_opr_arr[multiplication_index-1];
            oprnd_ii = temp_opr_arr[multiplication_index+1];

            temp_opr_arr = [
              ...temp_opr_arr.slice(0,multiplication_index-1),
              this.retrieveTempValue('*',oprnd_i,oprnd_ii),
              ...temp_opr_arr.slice(multiplication_index+2,temp_opr_arr.length)
            ];
          } else if(temp_opr_arr.indexOf('+')!==-1) {
            let addition_index = temp_opr_arr.indexOf('+');
            
            oprnd_i = temp_opr_arr[addition_index-1];
            oprnd_ii = temp_opr_arr[addition_index+1];

            console.log("stp_i:",[...temp_opr_arr.slice(0,addition_index-1)])
            console.log("stp_ii:",this.retrieveTempValue('+',oprnd_i,oprnd_ii))
            console.log("stp_iii:",[...temp_opr_arr.slice(addition_index+2,temp_opr_arr.length)])

            temp_opr_arr = [
              ...temp_opr_arr.slice(0,addition_index-1),
              this.retrieveTempValue('+',oprnd_i,oprnd_ii),
              ...temp_opr_arr.slice(addition_index+2,temp_opr_arr.length)
            ];

            console.log("arr:",temp_opr_arr)
          } else if(temp_opr_arr.indexOf('-')!==-1) {
            let subtraction_index = temp_opr_arr.indexOf('-');
            
            oprnd_i = temp_opr_arr[subtraction_index-1];
            oprnd_ii = temp_opr_arr[subtraction_index+1];

            temp_opr_arr = [
              ...temp_opr_arr.slice(0,subtraction_index-1),
              this.retrieveTempValue('-',oprnd_i,oprnd_ii),
              ...temp_opr_arr.slice(subtraction_index+2,temp_opr_arr.length)
            ];
          }
        }
      }

      iteration_break++;
    }

    console.log(final_result)
    return final_result;
  }
}
