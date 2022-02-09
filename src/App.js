import Toolbar from "./components/Toolbar";
import Message from "./components/Message";
import React, { useState,useEffect} from "react";

function App() {

  const MESSAGES_URL = "http://localhost:8082/api/messages";

  const [mesList, setMesList] = useState([]);
  const [messagesIsLoading, setMessagesIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    setTimeout(() =>{
      fetchFunction(MESSAGES_URL, setMesList,setMessagesIsLoading);
    },2000)
  }, [MESSAGES_URL]);


  const fetchFunction = async (url, setFunc,setLoad) => {
    try {
      setLoad(true)
      const response = await fetch(url);
      if (!response.ok) throw Error("Did not received expected data");
      const listProducts = await response.json();
      setFunc(listProducts);
      setFetchError(null);
    } catch (err) {
      setFetchError(err.message);
    }finally{
      setLoad(false);
    }
  };


  const toogleStarred = async(ele) => {
    setMessagesIsLoading(true);
    let arr = [ele.id]
    let com = "star"
    let item ={
      messageIds:arr,
      command: com,
      [com]:!ele.starred,
    }
    const response = await fetch(MESSAGES_URL, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const jsonResponse = await response.json()
    setMesList(jsonResponse)
    console.log(jsonResponse);
    console.log("YEAH!");
    setMessagesIsLoading(false);
  }

  const patchItems = async(com,bool) => {
    setMessagesIsLoading(true);
    let arr = mesList.filter(mes => mes.selected).map(mes => mes.id);
    let item ={
      messageIds:arr,
      command: com,
      [com]:bool,
    }
    const response = await fetch(MESSAGES_URL, {
      method: 'PATCH',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const jsonResponse = await response.json()
    setMesList(jsonResponse)
    console.log(jsonResponse);
    console.log("YEAH!");
    setMessagesIsLoading(false);
  }

  // const toogleStarred = (mes) => {

  //   // setMesList(
  //   //   mesList.map((message) =>
  //   //     message === mes ? { ...message, starred: !message.starred } : message
  //   //   )
  //   // );
  // };

  const toggleCheckbox = (mes) => {
    setMesList(
      mesList.map((message) =>
        message === mes ? { ...message, selected: !message.selected } : message
      )
    );
  };

  const selectButtonHandler = () => {
    const isAllselected = mesList.every((message) => message.selected);
    setMesList(
      mesList.map((message) => ({ ...message, selected: !isAllselected }))
    );
  };

  const unreadOrReadSelectedMes = (bool) => {
    patchItems("read",bool)
  };

  const addLabel = (e) => {
    e.preventDefault();
    if (e.target.value !== "Apply label"){
      setMesList(
        mesList.map((mes) =>
          mes.selected && !mes.labels.includes(e.target.value) ? { ...mes, labels: [...mes.labels, e.target.value] } : mes
        )
      );
    }
  };

  const removeLabel = (e) => {
    e.preventDefault();
    setMesList(
      mesList.map((mes) =>
        mes.selected && mes.labels.includes(e.target.value) ? { ...mes, labels:mes.labels.filter(lab => lab !== e.target.value) } : mes
      )
    );
  };

  const deleteMessages = () =>{
    setMesList(
      mesList.filter(mes => !mes.selected)
    );
  }

  const nothingSelected = () => mesList.some(mes => mes.selected);

  const createCheckBoxName = () => {
    if(mesList.every(mes => mes.selected) && mesList.length > 0){
      return "fa fa-check-square-o"
    } else if(mesList.some(mes => mes.selected)){
      return "fa fa-minus-square-o"
    }
    return "fa fa-square-o"
  }
  
  const unreadMessagesCount = () => mesList.filter(mes => !mes.read).length;
  
  return (
    <div>
      <Toolbar
        selectButtonHandler={selectButtonHandler}
        unreadOrReadSelectedMes={unreadOrReadSelectedMes}
        addLabel={addLabel}
        removeLabel={removeLabel}
        deleteMessages={deleteMessages}
        nothingSelected={nothingSelected}
        createCheckBoxName={createCheckBoxName}
        unreadMessagesCount={unreadMessagesCount}
        patchItems={patchItems}
      />
      {messagesIsLoading && <h3>Messages loading....</h3>}
      {!messagesIsLoading && mesList.map((mes) => (
        <Message
          key={mes.id}
          mes={mes}
          toogleStarred={toogleStarred}
          toggleCheckbox={toggleCheckbox}
        />
      ))}
    </div>
  );
}

export default App;
