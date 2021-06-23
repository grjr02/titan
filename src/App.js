import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [cur, setCur] = useState(-1);
  const [ques1, setQues1] = useState("");
  const [ques2, setQues2] = useState("");
  const [ques3, setQues3] = useState("");
  const [ques4, setQues4] = useState("");
  const [display, setDisplay] = useState(true);

  const [f2q1, setf2q1] = useState("");
  const [f2q2, setf2q2] = useState("");
  const [f2q3, setf2q3] = useState("");

  const refe = useRef();
  const refe2 = useRef();

  // useEffect(()=>{

  // })
  useEffect( () => {
    async function checkValid(){
      try {
        let x = await axios.get(
          "https://us-central1-titanback-dd79b.cloudfunctions.net/validate"
        );
        setDisplay(x.data.survey);
        if(x.data.survey) setCur(1);
        else setCur(4)

      } catch (error) {
        console.log(error);
      }
    }

    checkValid();
    
  }, [display]);

  const nav = async () => {
    if (cur < 4) setCur(cur + 1);
    if (cur === 2) {
      refe.current.handleSub(ques1, ques2);
    }
    if (cur === 3) {
      refe2.current.handleF2(f2q1);
    }
    if(cur === 4){
    
      let url = "https://us-central1-titanback-dd79b.cloudfunctions.net/save";
      let body = {
        date: ques1,
        whyAgree: ques2,
        upstairs: "Yes",
        stuffedAnimal: ques4,
        backupDate1: f2q1,
        backupDate2: f2q2,
        dateType: f2q3,
      };
      try {
        let x = await axios.post(url, body);
        let y = await axios.get(
          "https://us-central1-titanback-dd79b.cloudfunctions.net/validate"
        );
        setDisplay(y.data.survey);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const rev = () => {
    if (cur > 1) setCur(cur - 1);
  };

  return (
    
      cur !== -1 ?
    (<div className="App">
      
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div className="left"></div>
      <div className="border">
        <div className="center">
          <div className="upper">
            <header>
              <h3 className="heading">--The Date--</h3>
              { cur > 1 ?
              <span className="subheading">feat. Carleton and Shanice</span>
              :<></>
              }
              </header>
          </div>
          {display ? (
            <div className="mid">
              {cur === 1 ? <div className="outer"><div className="start"></div></div> : <></>}
              <Records
                show={cur}
                ref={refe}
                setQues1={setQues1}
                setQues2={setQues2}
                setQues3={setQues3}
                setQues4={setQues4}
                ques1={ques1}
                ques2={ques2}
                ques3={ques3}
                ques4={ques4}
              />
              <DateSelection
                show={cur}
                ref={refe2}
                f2q1={f2q1}
                f2q2={f2q2}
                f2q3={f2q3}
                setf2q1={setf2q1}
                setf2q2={setf2q2}
                setf2q3={setf2q3}
              />
              <Confirmation show={cur} />
            </div>
          ) : (
            <Confirmation show={cur} display={display} />
          )}

          <div className="bottom">
            {display === true ?
            <div className="buttonsContainer">
              {cur > 1 ? (
                <button className="contButton" onClick={rev}>
                  <span className="size">Back</span>
                </button>
              ) : (
                <></>
              )}
              {cur < 4 ? (
                <button className="contButton" onClick={nav}>
                  <span className="size">Continue</span>
                </button>
              ) : (
                <button className="contButton" onClick={nav}>
                  <span className="size">Confirm</span>
                </button>
              )}
            </div> :<></>
            }
          </div>
        </div>
      </div>
      <div className="right"></div>
    
    </div> ):(<></>)
          
          
  );
          
}

const Records = forwardRef(
  (
    {
      show,
      setQues1,
      setQues2,
      setQues3,
      setQues4,
      ques1,
      ques2,
      ques3,
      ques4,
    },
    ref
  ) => {
    const handleChange1 = (e) => {
      e.preventDefault();
      setQues1(e.target.value);
    };
    const handleChange2 = (e) => {
      e.preventDefault();
      setQues2(e.target.value);
    };
    const handleChange3 = (e) => {
      e.preventDefault();
      setQues3(e.target.value);
    };
    const handleChange4 = (e) => {
      e.preventDefault();
      setQues4(e.target.value);
    };

    useImperativeHandle(ref, () => ({
      handleSub(a1, a2, a3, a4) {
        console.log("Form 1:");
        console.log("a1: ", a1);
        console.log("a2: ", a2);
        console.log("a3: ", a3);
        console.log("a4: ", a4);
      },
    }));

    return (
      <>
        {show === 2 ? (
          <>
            <h4>For the records</h4>

            {/* <form onSubmit={""}> */}
            <div className="ques">
              <label>Can I take you on a date?</label>
              <br />
              <select value={ques1} onChange={handleChange1}>
                <option value="" disabled>
                  &nbsp;
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br />
            </div>

            <div className="ques">
              <label>Why'd you agree/disagree?</label>
              <br />
              <input value={ques2} onChange={handleChange2} />
              <br />
              <div />
            </div>

            <div className="ques">
              <label>I'm making my way upstairs on the pick up?</label>
              <br />
              <select value={ques3} onChange={handleChange3}>
                <option value="" disabled>
                  &nbsp;
                </option>
                <option value="Yes">Yes</option>
              </select>
              <br />
            </div>

            <div className="ques">
              <label>I like stuffed animals</label>
              <br />
              <select value={ques4} onChange={handleChange4}>
                <option value="" disabled>
                  &nbsp;
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
              <br />
            </div>
            {/* </form> */}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
);

const DateSelection = forwardRef(
  ({ show, f2q1, setf2q1, f2q2, setf2q2, f2q3, setf2q3 }, ref) => {
    const inputHandler = (e) => {
      e.preventDefault();
      setf2q1(e.target.value);
    };
    const inputHandler2 = (e) => {
      e.preventDefault();
      setf2q2(e.target.value);
    };
    const inputHandler3 = (e) => {
      e.preventDefault();
      setf2q3(e.target.value);
    };
    useImperativeHandle(ref, () => ({
      handleF2(a1) {
        console.log("Form 2:");
        console.log("a1: ", a1);
      },
    }));
    return (
      <>
        {show === 3 ? (
          <>
            <h4>Prospective Date: </h4>

            <h3>Sunday June 27th</h3>
            <div className="ques1">
              <label>Insert a 2nd Preferred Date</label>
              <br />
              <input value={f2q1} onChange={inputHandler} type="date" />
              <br />
            </div>
            <div className="ques">
              <label>Insert a 3rd Preferred Date</label>
              <br />
              <input value={f2q2} onChange={inputHandler2} type="date" />
              <br />
            </div>
            <div className="ques">
              <label>I prefer (Just out of curiosity)...</label>
              <br />
              <select value={f2q3} onChange={inputHandler3}>
                <option value="" disabled>
                  &nbsp;
                </option>
                <option value="Dinner">Out for Dinner</option>
                <option value="Paint">Paint and Sip</option>
              </select>
              <br />
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
);

const Confirmation = ({ show, display }) => {
  return (
    <>
      {show === 4  ? (
        <>
          <h4 style={{ marginTop: "20px", marginBottom: "15px" }}>
            Confirmation
          </h4>
          <div className="border2">
            <label className="confirm">Haven Riverfront</label>
            <br />
            <hr />

            <label className="confirm2">Sunday June 27th</label>
            <br />
            <label>(tentative)</label>

            <br />
            <hr />
            {/* <hr />
            <hr /> */}

            {/* <br /> */}

            <h3 className="confirm3">6:00 Pm</h3>
            <br />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default App;
