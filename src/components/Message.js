import React from 'react';

const Message = ({mes,toogleStarred,toggleCheckbox}) => {

    const isStarred = () => mes.starred === true ? "star fa fa-star" : "star fa fa-star-o";

    const isReadUnreadSelected = () => {
      if(mes.read && mes.selected) {
        return "row message read selected"
      }else if(!mes.read && mes.selected){
        return "row message unread selected"
      }else if(mes.read){
        return "row message read"
      } else{
        return "row message unread"
      }
    }

    const createLabel = () => mes.labels.map(label => <span key={mes.labels.indexOf(label)} className="label label-warning">{label}</span>)
     
    return (
        <div className={isReadUnreadSelected()}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input onClick={()=> toggleCheckbox(mes)} type="checkbox" checked={mes.selected} />
          </div>
          <div className="col-xs-2">
            <i className={isStarred()} key={mes.id} onClick={() => toogleStarred(mes)} ></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
      {createLabel()}
        <a href="#">{mes.subject}</a>
      </div>
    </div>
  );
};

export default Message;

