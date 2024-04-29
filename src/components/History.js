import React from 'react';

class History extends React.Component {
  layoutChange() {
    document.getElementById("Section_ii").classList.toggle("extend");
  }

  render() {
    return (
      <div id="Section_ii">
        <input type="checkbox" name="history" id="history" 
          onChange={() => this.layoutChange()}
          hidden
        />
        <div className="history_container">
          <div className="list_of_prv_operations">
            {
              (this.props.hstry["list"].length>0) ?
                this.props.hstry["list"].map((_obj,_key) => 
                  <div className="history_item" key={_key}>
                    <p className="transaction">#{_key+1}</p>
                    <p className="item_ans"><i className="fa-solid fa-caret-right"></i>{_obj["ans"]}</p>
                    <p className="item_opr">{_obj["opr"]}</p>
                  </div>
                )
              : 
                <p className="notify"> - history is empty - </p>
            }
          </div>
          <button 
            id="remove_history"
            onClick={() => this.props.deleteHistory()}
          ><i className="fa-solid fa-trash-can"></i></button>
        </div>
        <label htmlFor="history">
          <i className="fa-solid fa-forward fwd_i"></i>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>H</span>
          <span>i</span>
          <span>s</span>
          <span>t</span>
          <span>o</span>
          <span>r</span>
          <span>y</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <i className="fa-solid fa-forward fwd_ii"></i>
        </label>
      </div>
    );
  }
}

export default History;