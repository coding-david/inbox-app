import React,{useState} from "react";

const ComposeForm = ({showFormToggleHandler,addNewMessage}) => {

    const [addMes,setAddMes] = useState({});

    const onChangeHandler = e => {
        e.preventDefault();
        setAddMes(prevState => ({...prevState,[e.target.name]:e.target.value}));
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        await addNewMessage(addMes);
        await showFormToggleHandler();
    }



  return (
    <form className="form-horizontal well">
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <h4>Compose Message</h4>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="subject" className="col-sm-2 control-label">
          Subject
        </label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control"
            id="subject"
            placeholder="Enter a subject"
            name="subject"
            onChange={onChangeHandler}
          />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="body" className="col-sm-2 control-label">
          Body
        </label>
        <div className="col-sm-8">
          <textarea name="body" id="body" className="form-control" onChange={onChangeHandler} ></textarea>
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-8 col-sm-offset-2">
          <input type="submit" value="Send" className="btn btn-primary" onClick={onSubmitHandler} />
        </div>
      </div>
    </form>
  );
};

export default ComposeForm;
