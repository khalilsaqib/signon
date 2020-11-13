import React, { useEffect,useState } from "react";
import {useHistory} from "react-router-dom";
import Dexie from "dexie";
import {RiArrowLeftSLine} from "react-icons/ri";
import {IoIosSave} from "react-icons/io";

const Createevent = () => {

    console.log("hello")
    
    let history = useHistory();

    const[update, setupdate] = useState();
    const[eventname, seteventname] = useState();

    const productdb = (dbname, table)=>{
        const db = new Dexie(dbname);
        db.version(1).stores(table);
        db.open();
        return db;
    }

    const bulkcreate = (dbtable, data) => {
        dbtable.bulkAdd([data]);
    }

    let db;
    function database(){
        db = productdb("competitordb",{
            competitor: "++id, first_name, last_name, phoneNo,emergency_Contact,emergency_phno,team_name,licensing_org,license_No", 
            officials: "++id, eventname, date, competitors, results,position,racenoo,download",
            scanneddata: "++id,eventname,fullname,phonenumber,emer_contact,emer_ph,teamname,licenseorg,licenseno,race_no,position"
        })
    }

   

    useEffect(()=>{
        database();
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                setupdate(scanneddata)
            })
    },[])

    const goBack = () => {
        history.goBack();
    }

    const handleEnter = (event) => {
        if (event.keyCode === 13) {
          const form = event.target.form;
          const index = Array.prototype.indexOf.call(form, event.target);
          form.elements[index + 1].focus();
          event.preventDefault();
        }
      }

      const handleFinalEnter = (event) => {
        if (event.keyCode === 13) {
          const form = event.target.form;
          const index = Array.prototype.indexOf.call(form, event.target);
          form.elements[index + 1].focus();
          event.preventDefault();

          database();
            let id = parseInt(document.getElementById('updateeventid').value);
            const eventname = document.getElementById('evename');
            const eventdate = document.getElementById('evedate');
            
          if(eventname.value !== "" && eventdate.value !== "" ){
            
            document.getElementById('eventexist').style.display = "none";
            var regex = /^[a-zA-Z0-9\s#+-.@]+$/;
        
            if (eventname.value == "") {
                document.getElementById('evenamevalid').style.display = "inline-block";
            }
            else {
                document.getElementById('evenamevalid').style.display = "none";
            }
            if (eventname.value != "") {
                if (regex.test(eventname.value) == false) {
                    document.getElementById('evenamevalid1').style.display = "inline-block";
                }
                else {
                    document.getElementById('evenamevalid1').style.display = "none";
                }
            }
        
            if (eventdate.value == "") {
                document.getElementById('evedatevalid').style.display = "inline-block";
            }
        
        
            
            else {
                if (id) {
                    db.officials.update(id, {
        
                        eventname: eventname.value,
                        date: eventdate.value,

                    })

                
                    
                    

                    history.goBack();
                }
                else {
                    db.officials.where('eventname').equals(eventname.value).count(function (count) {
                        if (count > 0) {
        
                            document.getElementById('eventexist').style.display = "inline-block";
                        }
                        
                        else {
                        
                            bulkcreate(db.officials, {
                                eventname: eventname.value,
                                date: eventdate.value,
                                competitors: "0",
                                results: "0",
                                position: "0",
                                racenoo: "0",
                                download:"0"
                            })
                            
                            history.goBack();
                        }
        
                    })
        
                    }
                
                    }
          }
        }
      }
    
    if(eventname !== undefined){
        console.log(eventname)
    }

    const showpopup = () => {
        database();
        let id = parseInt(document.getElementById('updateeventid').value);
        const eventname = document.getElementById('evename');
        const eventdate = document.getElementById('evedate');

        if(eventname.value === "" && eventdate.value === "" ){
            history.goBack();
        }
        else if(eventname.value === "" || eventdate.value === "" ){
            let modal = document.getElementById('myModal1');
            modal.style.display="block";
        }
        else if(eventname.value !== "" && eventdate.value !== "" ){
            
                document.getElementById('eventexist').style.display = "none";
                var regex = /^[a-zA-Z0-9\s#+-.@]+$/;
            
                if (eventname.value == "") {
                    document.getElementById('evenamevalid').style.display = "inline-block";
                }
                else {
                    document.getElementById('evenamevalid').style.display = "none";
                }
                if (eventname.value != "") {
                    if (regex.test(eventname.value) == false) {
                        document.getElementById('evenamevalid1').style.display = "inline-block";
                    }
                    else {
                        document.getElementById('evenamevalid1').style.display = "none";
                    }
                }
            
                if (eventdate.value == "") {
                    document.getElementById('evedatevalid').style.display = "inline-block";
                }
            
            
                
                else {
                    if (id) {
                        db.officials.update(id, {
            
                            eventname: eventname.value,
                            date: eventdate.value,

                        })

                    
                        
                        

                        history.goBack();
                    }
                    else {
                        db.officials.where('eventname').equals(eventname.value).count(function (count) {
                            if (count > 0) {
            
                                document.getElementById('eventexist').style.display = "inline-block";
                            }
                            
                            else {
                            
                                bulkcreate(db.officials, {
                                    eventname: eventname.value,
                                    date: eventdate.value,
                                    competitors: "0",
                                    results: "0",
                                    position: "0",
                                    racenoo: "0",
                                    download:"0"
                                })
                                
                                history.goBack();
                            }
            
                        })
            
                        }
                    
                        }
        }

    }
    
    return(
        <>
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 "> </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-3 mx-auto ">
            <div class="container-fluid">

                <span className=" float-left " style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
                <button  onClick={showpopup} type="button" class="btn buttonarrow"  ><RiArrowLeftSLine style={{marginBottom:"1px"}} size="1.5em"/>Save</button>
                </span>

            </div>

            <div id="insertmsg" class=" insertmsg" align="center"><h5>Data Inserted Successfully..</h5></div>
            <div id="shownotif" class=" shownotif" align="center"><h5>Please Provide Mendatory Data !</h5></div>
            <div id="updatemsg" class=" updatemsg" align="center"><h5>Data Updated Successfully..</h5></div>
            <br></br>


            <div class="container" style={{marginTop:"55px" }}  align="left">
                <h4 style={{fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))"}}>Enter the details of the event below</h4>
            </div>

            <div class="container-fluid" style={{marginTop:"20px" }} align="left">
            <fieldset style={{border:"solid", borderColor:"#007bff", borderWidth:"0.5px", boxShadow:" 6px 10px 17px -6px rgba(53,60,61,1)"}}>
                    <legend style={{marginLeft:"10px", color:"#007bff"}}>Mandatory</legend>
                    <form style={{margin:"15px"}}>
                        <div class="form-group">
                            <input type="hidden" id="updateeventid" />
                            <label>Event Name (must be unique) *</label>
                            <label style={{color:"red"}}>example: Crit Week 4 Womens E1/2</label>
                            <input type="text" onKeyDown={handleEnter} class="form-control" id="evename" placeholder="Event Name" maxLength={40}/>
                            <label id="evenamevalid" style={{color:"red", display:"none"}}>Event Name Is Required</label>
                            <label id="evenamevalid1" style={{color:"red", display:"none"}}>Only Aplhanumeric and -+.# characters are Allowed </label>
                            <label id="eventexist"  style={{color:"red", display:"none"}}>Event Already Exists</label>
                        </div>
                        <div class="form-group">
                            <label>Event Date *</label>
                            <input type="date" onKeyDown={handleEnter} class="form-control" id="evedate" required da/>
                            <label id="evedatevalid"  style={{color:"red", display:"none"}}>Date Is Required</label>
                        </div>


                </form>
            </fieldset>
            </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 "> </div>

            <div onClick={() => {
                                    var closediv = document.getElementById("myModal1");
                                    closediv.style.display = "none";
                                }} id="myModal1" className="modal">

                <div className="modal-content maincontainer">
                    <div className="row">
                        <div className="col-sm-12" align="left">
                            <h2>Error</h2>
                            <hr />
                            <h5>You have unsaved changes. Are you sure to go back?</h5>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">

                            <button onClick={goBack} type="button" class="btn btn-outline-danger" style={{float:"left",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Don't Save</button>


                            <button 
                                onClick={() => {
                                    var closediv = document.getElementById("myModal1");
                                    closediv.style.display = "none";
                                }} type="button" className="btn btn-outline-primary" style={{float:"right", fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius:"5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                                    Ok, I'll fix it
                                </button>

                        </div>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default Createevent;