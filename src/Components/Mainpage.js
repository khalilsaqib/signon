import React, { useEffect, useState } from "react";
import "../App.css";
import editPic from "../Images/edit.png";
import share from "../Images/share.png";
import more from "../Images/more.png";
import plus from "../Images/plus-sign.png";
import { useHistory } from "react-router-dom";
import Dexie from "dexie";

const Mainpage = () => {
  let history = useHistory();

  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const installPwa = (evt) => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }

  const productdb = (dbname, table) => {
    const db = new Dexie(dbname);
    db.version(1).stores(table);
    db.open();
    return db;
  };

  let db;
  function database() {
    db = productdb("competitordb", {
      competitor:
        "++id, first_name, last_name, phoneNo,emergency_Contact,emergency_phno,team_name,licensing_org,license_No",
      officials:
        "++id, eventname, date, competitors, results,position,racenoo,download",
      scanneddata:
        "++id,eventname,fullname,phonenumber,emer_contact,emer_ph,teamname,licenseorg,licenseno,race_no,position",
    });
  }

  database();

  //BUTTON CLICK TO THE NEXT PAGE
  const nextPageRider = () => {
    history.push({
      pathname: "/Ridermain",
    });
  };

  const nextPageOfficial = () => {
    history.push({
      pathname: "/Officialmain",
    });
  };

  const displayInstall = () => {
    let mymodal1 = document.getElementById("myModal1");
    mymodal1.style.display = "block";
  };

  const closeModal = () => {
    let closemodal = document.getElementById("myModal1");
    closemodal.style.display = "none";
  };

  return (
    <div>
      <div className="col-12 pd-0 mt-2 text-center">
        <h1 className=" d-inline signcss ">SignOn </h1>
        <img
          src={editPic}
          style={{ width: "50px", height: "50px" }}
          alt="..."
        />
      </div>
      <div className="col-lg-12 col-md-12 col-sm-12 text-center pd-0 mt-2">
        <h4 className="signtext">Are you a competitor, or an official?</h4>
      </div>
      <div className="col-12 pd-0 text-center">
        <div className="btn-group-vertical " style={{ marginTop: "20px" }}>
          <button
            type="button"
            onClick={nextPageRider}
            id="btn"
            className="btn btn-outline-primary page1btn"
          >
            I am a Competitor{" "}
          </button>
          <button
            type="button"
            onClick={nextPageOfficial}
            className="btn btn-outline-primary page2btn"
          >
            I'm an event official
          </button>
          <button
            type="button"
            onClick={displayInstall}
            className="btn btn-outline-primary page3btn"
          >
            Install App Offline
          </button>
        </div>
      </div>
      <div onClick={closeModal} id="myModal1" className="modal">
        <div className="modal-content maincontainer">
          <div className="row">
            <div className="col-sm-12" align="center">
              <span className="close" onClick={closeModal}>
                &times;
              </span>

              <h2 style={{ marginTop: "15px" }}>
                Install SignOn to work offline
              </h2>
              <h5>
                On iPhone/Safari, click on the share/options button{" "}
                <img src={share} alt="share" /> and click Add to Home Screen{" "}
                <img src={plus} alt="plus" />
              </h5>
              <h5>
                On Android/Chrome click the options button{" "}
                <img src={more} alt="more" /> and choose 'Add to Home Screen'
              </h5>
              <h5>
                This prompt add an icon to your home screen. Clicking our app
                icon will work even when you're in the middle of nowhere with no
                internet connection, so you can always sign on!
              </h5>
              <button
                type="button"
                class="btn btn-outline-danger"
                onClick={installPwa}
                style={{
                  float: "left",
                  fontSize:
                    "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))",
                  borderRadius: "5px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                Proceed
              </button>
              <button
                type="button"
                onClick={closeModal}
                class="btn btn-outline-primary"
                style={{
                  float: "right",
                  fontSize:
                    "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))",
                  borderRadius: "5px",
                  boxShadow:
                    "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                }}
              >
                Maybe Later
              </button>
            </div>
          </div>
          <div className="row">
            {/* <div class="col-sm-12">
                @if (Installable)
                {
                    <button type="button" @onclick="@(() => InstallClicked())" class="btn btn-outline-danger" style="float:left;font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300))); border-radius: 5px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)">Proceed</button>
                    <button type="button" onclick="hide1()" class="btn btn-outline-primary" style="float:right;font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));border-radius:5px;box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)">Maybe Later</button>

                }

                </div>
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
