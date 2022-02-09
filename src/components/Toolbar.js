const Toolbar = ({selectButtonHandler,unreadOrReadSelectedMes,removeLabel,addLabel,deleteMessages,nothingSelected,createCheckBoxName,unreadMessagesCount}) => {
  return (
    <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{unreadMessagesCount()}</span>
          unread messages
        </p>

        <button className="btn btn-default" onClick={selectButtonHandler}  >
          <i className={createCheckBoxName()}></i>
        </button>

        <button className="btn btn-default" onClick={() => unreadOrReadSelectedMes(true)} disabled={!nothingSelected()} >Mark As Read</button>

        <button className="btn btn-default" onClick={() => unreadOrReadSelectedMes(false)} disabled={!nothingSelected()} >Mark As Unread</button>

        <select className="form-control label-select" onChange={addLabel} disabled={!nothingSelected()} >
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" onChange={removeLabel} disabled={!nothingSelected()} >
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default" onClick={deleteMessages} disabled={!nothingSelected()} >
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
