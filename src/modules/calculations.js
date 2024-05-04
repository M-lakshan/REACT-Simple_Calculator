export class GeneralCalcFuncs {
  static GeneralFourMethods = ['/','*','+','-'];

  static oprationToContext(opr_arr,type="user_prv") {

    if(type==="dual_method_fix") {
      let opr_arr_upd = [];
      let opr_arr_rvs = opr_arr.map(elm => (parseFloat(elm).toString()==="NaN") ? elm : parseFloat(elm)).reverse();
            console.log("conv_arr",opr_arr_rvs)///////////////////////////
      
      while(opr_arr_rvs.length>=0) {

        if(opr_arr_rvs.length<1) {
          return opr_arr_upd;
        } else {
          
          // if(!this.GeneralFourMethods.includes([...opr_arr_rvs].reverse()[0])) {
            console.log("elm_i_not_a_method",(opr_arr_rvs[0]))///////////////////////////
            if(opr_arr_rvs[1]!==undefined) {
              
              if(this.GeneralFourMethods.includes(opr_arr_rvs[1])) {
              
                if(opr_arr_rvs[2]!==undefined) {

                  if(this.GeneralFourMethods.includes(opr_arr_rvs[2])) {
                    
                    if(opr_arr_rvs[1]==='-') {
                      opr_arr_upd.unshift((-1)*opr_arr_rvs.shift()); //number_negated 0 x [-1] 1
                      opr_arr_rvs.shift(); //neglected_method 1
                      opr_arr_upd.unshift(opr_arr_rvs.shift()); //method 2
                    } else {
                      opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 0
                      opr_arr_rvs.shift(); //neglected_method 1
                      opr_arr_upd.unshift(opr_arr_rvs.shift()); //method 2
                    }
                  } else {
                    opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 0
                    opr_arr_upd.unshift(opr_arr_rvs.shift()) //method 1
                    opr_arr_upd.unshift(opr_arr_rvs.shift()) //number 2
                  }
                } else {
                  opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 0
                  opr_arr_upd.unshift(opr_arr_rvs.shift()); //method 1
                }
              } else {
                opr_arr_rvs.shift(); //method 0
                opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 1
              }
            } else {
              opr_arr_upd.unshift(opr_arr_rvs.shift()); //first_&_last_elm 0
            }
          // } else {
            // console.log("elm_i_is_a_method")///////////////////////////
            // opr_arr_rvs = [...opr_arr_rvs].reverse();

            // if(opr_arr_rvs[1]!==undefined || (!this.GeneralFourMethods.includes(opr_arr_rvs[0]))) {
            //   console.log("elm_ii_is_defined")///////////////////////////

            //   if(this.GeneralFourMethods.includes(opr_arr_rvs[1])) {
            //     console.log("elm_ii_is_a_method")///////////////////////////
                
            //     if(opr_arr_rvs[2]!==undefined) {
            //       console.log("elm_iii_is_defined")///////////////////////////

            //       if(opr_arr_rvs[1]==='-') {
            //       console.log("elm_ii_is_(-)")///////////////////////////
            //         opr_arr_rvs.shift(); //neglected_method 0
            //         opr_arr_rvs.shift(); //neglected_method 1
            //         opr_arr_upd.unshift((-1)*opr_arr_rvs.shift()); //number_negated 2 x [-1] 1
            //       } else {
            //       console.log("elm_ii_isnot_(-)")///////////////////////////
            //         opr_arr_rvs.shift(); //neglected_method 0
            //         opr_arr_rvs.shift(); //neglected_method 1
            //         opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 2
            //       }
            //     } else {
            //       console.log("r")
            //       return this.oprationToContext([ ...opr_arr_upd, ...opr_arr_rvs ],"dual_method_fix");
            //     }
            //   } else {
            //     console.log("elm_ii_i_not_a_method")///////////////////////////

            //     if(opr_arr_rvs[0]==='-') {
            //       console.log("elm_i_is_(-)")///////////////////////////
            //       opr_arr_rvs.shift(); //neglected_method 0
            //       opr_arr_upd.unshift((-1)*opr_arr_rvs.shift()); //number_negated 1 x [-1] 0
            //     } else {
            //       console.log("elm_i_isnot_(-)")///////////////////////////
            //       opr_arr_rvs.shift(); //neglected_method 0
            //       opr_arr_upd.unshift(opr_arr_rvs.shift()); //number 1
            //     }
            //   }
            // } else {   
            //       console.log("r2")
            //   return this.oprationToContext([ ...opr_arr_upd, ...opr_arr_rvs ],"dual_method_fix");
            // }
          // }
        }
      }
    } else {
      if(opr_arr.length>0) {
        return opr_arr.map(elm => (this.GeneralFourMethods.includes(elm.toString())) ? 
          String.fromCharCode(elm.toString().charCodeAt(0)) : elm)
            .map(elm => ((elm.toString().includes('-') && elm.toString().length>1) || elm.toString().includes('.')) ? `(${elm})` : elm);
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

    console.log("DM:",lst_elm,lst_elm_chr)//////////////////
    if(opr_arr.length>=2) {
      let prv_chr = opr_arr[opr_arr.length-2].toString();

      if(this.GeneralFourMethods.includes(lst_elm_chr)) {
        
        if(this.GeneralFourMethods.includes(prv_chr)) {
          return (prv_chr===appender) ? [ ...opr_arr ] : [ ...opr_arr.slice(0,opr_arr.length-1), appender ];
        } else{
          return [ ...opr_arr, appender ];
        }
      } else {
          return (lst_elm_chr==='.') ? 
            [
              ...opr_arr.slice(0,opr_arr.length-1),
              (lst_elm+'0'),
              appender
            ] : [ ...opr_arr, appender ];
      }
    } else {
      console.log(opr_arr.length===1) ////////////
      if(opr_arr.length===1) {
        return [ ...opr_arr[0]+appender ];
      } else {
        return [ appender ];
      }
    }
  }
  
  static calculateAnswer(opr_arr) {
    let temp_opr_arr = opr_arr.map(elm => (this.GeneralFourMethods.includes(elm)) ? elm : 
      ((parseFloat(elm).toString()==="NaN") ? elm : parseFloat(elm)));
    let iteration_break = 0;
    let final_result = 0;

    console.log("finanlized stk:",temp_opr_arr)//////////////////////////

    if(this.GeneralFourMethods.includes(temp_opr_arr[temp_opr_arr.length-1])) {
      temp_opr_arr.pop();
      
      if(this.GeneralFourMethods.includes(temp_opr_arr[temp_opr_arr.length-1])) {
        temp_opr_arr.pop();
      }
    }

    console.log("pre finanlized stk:",temp_opr_arr)//////////////////////////
    temp_opr_arr = this.oprationToContext(temp_opr_arr,"dual_method_fix");
    console.log("optimized stk:",temp_opr_arr)//////////////////////////
    console.log("\n")//////////////////////////

    if(temp_opr_arr.length<1) {
      return final_result;
    } else {
      let precedence = (temp_opr_arr.includes('/') && temp_opr_arr.includes('*') && temp_opr_arr.includes('+') && temp_opr_arr.includes('-'));

      while(temp_opr_arr.length>=1) {
        let oprtr = [];
        let oprnd_i = '';
        let oprnd_ii = '';

        if(iteration_break>100) {
          return "ERROR!";
        }

      // console.log("itr stk:",temp_opr_arr)//////////////////////

        if(temp_opr_arr.length<=2) {
          return this.retrieveTempValue(17,temp_opr_arr[0],final_result);
        } else {

          if(temp_opr_arr[0]==='-') {
            temp_opr_arr = [
              parseFloat(temp_opr_arr[1])*(-1),
              ...temp_opr_arr.slice(2,temp_opr_arr.length)
            ];
          }
          // if(precedence || temp_opr_arr.includes('*') || temp_opr_arr.includes('/')) {

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
            
            console.log("stp_i:",[...temp_opr_arr.slice(0,oprtr[1]-1)])
            console.log("stp_ii:",this.retrieveTempValue(oprtr[0],oprnd_i,oprnd_ii))
            console.log("stp_iii:",[...temp_opr_arr.slice(oprtr[1]+2,temp_opr_arr.length)])
            console.log("exp:",this.retrieveTempValue(17,parseFloat(this.retrieveTempValue(oprtr[0],oprnd_i,oprnd_ii)),final_result))

            temp_opr_arr = [
              ...temp_opr_arr.slice(0,oprtr[1]-1),
              this.retrieveTempValue(17,parseFloat(this.retrieveTempValue(oprtr[0],oprnd_i,oprnd_ii)),final_result),
              ...temp_opr_arr.slice(oprtr[1]+2,temp_opr_arr.length)
            ];
            
            oprtr = [];
            console.log("arr:",temp_opr_arr)/////////////
            console.log("\n")/////////////
          // } else {

            // if(this.GeneralFourMethods.includes(temp_opr_arr[iteration_break].toString()) && oprtr.length>0) {
            //   oprtr = [temp_opr_arr[iteration_break]];
            // } else {
              
            //   if(this.GeneralFourMethods.includes(temp_opr_arr[iteration_break].toString())) {
                
            //     if(temp_opr_arr[iteration_break].toString()!=='-') {
            //       oprtr = [temp_opr_arr[iteration_break]];
            //     } else {
            //       temp_opr_arr = [
            //         ...temp_opr_arr.slice(0,temp_opr_arr.indexOf(temp_opr_arr[iteration_break])),
            //         (-1)*temp_opr_arr[iteration_break+1],
            //         ...temp_opr_arr.slice(temp_opr_arr.indexOf(temp_opr_arr[iteration_break+1]),temp_opr_arr.length)
            //       ];
            //     } 
            //   } else {
            //     if(oprnd_i==='') {
            //       oprnd_i = [temp_opr_arr[iteration_break]];
            //     } else {
            //       oprnd_ii = [temp_opr_arr[iteration_break]];

            //       temp_opr_arr = [
            //         this.retrieveTempValue(17,parseFloat(this.retrieveTempValue(oprtr[0],oprnd_i,oprnd_ii)),final_result),
            //         ...temp_opr_arr.slice(3,temp_opr_arr.length)
            //       ];

            //       oprtr = [];
            //       oprnd_i = '';
            //       oprnd_ii = '';
            //     }
            //   }
            // }
          // }
        }
        
        iteration_break++;
      }
    }

    return final_result;
  }
}
