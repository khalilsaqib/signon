import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import Dexie from "dexie";
import {RiArrowLeftSLine} from "react-icons/ri";
import {IoIosSave} from "react-icons/io";

const Formpage = () => {

    console.log("hello")

    let history = useHistory();

    const productdb = (dbname, table) => {
        const db = new Dexie(dbname);
        db.version(1).stores(table);
        db.open();
        return db
    }

    const bulkcreate = (dbtable, data) =>{
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

    
    

    const handleEnter = (event)=> {
        if (event.keyCode === 13) {
          const form = event.target.form;
          const index = Array.prototype.indexOf.call(form, event.target);
          form.elements[index + 1].focus();
          event.preventDefault();
        }
      }

      const handleFinalEnter = (event)=> {
        if (event.keyCode === 13) {
          const form = event.target.form;
          const index = Array.prototype.indexOf.call(form, event.target);
          form.elements[index + 1].focus();
          event.preventDefault();

          database();
        let id = parseInt(document.getElementById('updateid').value);
        const firstname = document.getElementById('fname');
        const lastname = document.getElementById('lname');
        const phno = document.getElementById('phno');
        const emercont = document.getElementById('Econtact');
        const emerphno = document.getElementById('Ephone');
        const teamname = document.getElementById('clubname');
        const licenseorg = document.getElementById('licenseorg');
        const licenseno = document.getElementById('licenseno');

        if(firstname.value != "" && lastname.value != "" && phno.value != "" && emercont.value != "" && emerphno.value != "" ){
            var regex = /^[a-zA-Z\s]+$/;
        var regex1 = /^[a-zA-Z0-9\s]+$/;
        var patt1 = /^[0-9]+$/;

        if (teamname.value == "")
        { teamname.value = " "; }

        if (licenseorg.value=="")
        { licenseorg.value = " "; }
        
        if (licenseno.value == "")
        { licenseno.value = " "; }



        if (firstname.value == "") {
            document.getElementById('fnamevalid').style.display = "inline-block";
        }else {
            document.getElementById('fnamevalid').style.display = "none";
        }
        // for validation check
        if (firstname.value != "") {
            if (regex.test(firstname.value) == false) {
                document.getElementById('fnamevalid1').style.display = "inline-block";
            } else {
                document.getElementById('fnamevalid1').style.display = "none";
            }
        }
    
        //for empty check
        if (lastname.value == "") {
            document.getElementById('lnamevalid').style.display = "inline-block";
        }
        else { document.getElementById('lnamevalid').style.display = "none"; }
    
        // for validation check
        if (lastname.value != "") {
            if (regex.test(lastname.value) == false) {
                document.getElementById('lnamevalid1').style.display = "inline-block";
            }
            else { document.getElementById('lnamevalid1').style.display = "none"; }
        }
        //for empty check
        if (phno.value == "" || phno.value.length > 14) {
            document.getElementById('phnovalid').style.display = "inline-block";
        }
        else { document.getElementById('phnovalid').style.display = "none"; }
        // for validation check
        if (phno.value != "") {
            if (patt1.test(phno.value) == false) {
                document.getElementById('phnovalid1').style.display = "inline-block";
            }
            else { document.getElementById('phnovalid1').style.display = "none"; }
        }
        // for empty check
        if (emercont.value == "" || emercont.value.length > 11) {
            document.getElementById('Econtactvalid').style.display = "inline-block";
        }
        else { document.getElementById('Econtactvalid').style.display = "none"; }
        // for validation check
        if (emercont.value != "") {
            if (regex.test(emercont.value) == false) {
                document.getElementById('Econtactvalid1').style.display = "inline-block";
            }
            else { document.getElementById('Econtactvalid1').style.display = "none"; }
        }
        // for empty check
        if (emerphno.value == "")
        { document.getElementById('Ephonevalid').style.display = "inline-block"; }
        else { document.getElementById('Ephonevalid').style.display = "none"; }
        // for validation check
        if (emerphno.value != "") {
            if (patt1.test(emerphno.value) == false) { document.getElementById('Ephonevalid1').style.display = "inline-block"; }
            else { document.getElementById('Ephonevalid1').style.display = "none"; }
        }
    
        if (regex.test(teamname.value) == false) { document.getElementById('clubnamevalid').style.display = "inline-block"; }
        else { document.getElementById('clubnamevalid').style.display = "none"; }
    
        if (regex.test(licenseorg.value) == false) { document.getElementById('licenseorgvalid').style.display = "inline-block"; }
        else { document.getElementById('licenseorgvalid').style.display = "none"; }
    
        if (regex1.test(licenseno.value) == false) { document.getElementById('licensenovalid').style.display = "inline-block"; }
        else { document.getElementById('licensenovalid').style.display = "none"; }
    
        if (firstname.value == "" || regex.test(firstname.value) == false || lastname.value == "" || regex.test(lastname.value) == false || phno.value == "" || patt1.test(phno.value) == false || emercont.value == "" || regex.test(emercont.value) == false || emerphno.value == "" || patt1.test(emerphno.value) == false || regex.test(teamname.value) == false || regex.test(licenseorg.value) == false || regex1.test(licenseno.value) == false) {
            let shownotif = document.getElementById("shownotif");
            
        }
        else{
            if (id) {
                db.competitor.update(id, {

                    first_name: firstname.value.toUpperCase(),
                    last_name: lastname.value.toUpperCase(),
                    phoneNo: phno.value,
                    emergency_Contact: emercont.value.toUpperCase(),
                    emergency_phno: emerphno.value,
                    team_name: teamname.value.toUpperCase(),
                    licensing_org: licenseorg.value.toUpperCase(),
                    license_No: licenseno.value.toUpperCase()

                })
                history.goBack();
            }
            else {
                bulkcreate(db.competitor, {
                    first_name: firstname.value.toUpperCase(),
                    last_name: lastname.value.toUpperCase(),
                    phoneNo: phno.value,
                    emergency_Contact: emercont.value.toUpperCase(),
                    emergency_phno: emerphno.value,
                    team_name: teamname.value.toUpperCase(),
                    licensing_org: licenseorg.value.toUpperCase(),
                    license_No: licenseno.value.toUpperCase()

                })

                history.goBack();
                    
            }
            firstname.value = lastname.value = phno.value = emercont.value = emerphno.value = teamname.value = licenseorg.value = licenseno.value = "";
        }
        }

        }
      }

      const showpopup = () => {
          database();
        let id = parseInt(document.getElementById('updateid').value);
        const firstname = document.getElementById('fname');
        const lastname = document.getElementById('lname');
        const phno = document.getElementById('phno');
        const emercont = document.getElementById('Econtact');
        const emerphno = document.getElementById('Ephone');
        const teamname = document.getElementById('clubname');
        const licenseorg = document.getElementById('licenseorg');
        const licenseno = document.getElementById('licenseno');
    
    
        if (firstname.value === "" && lastname.value === "" && phno.value === "" && emercont.value === "" && emerphno.value === "" ) {
            history.goBack();
        }

        else if(firstname.value === "" || lastname.value === "" || phno.value === "" || emercont.value === "" || emerphno.value === "" ){
            var modal = document.getElementById("myModal1");
            modal.style.display = "block";
        }

       else if(firstname.value != "" && lastname.value != "" && phno.value != "" && emercont.value != "" && emerphno.value != "" ){
              
        var regex = /^[a-zA-Z\s]+$/;
        var regex1 = /^[a-zA-Z0-9\s]+$/;
        var patt1 = /^[0-9]+$/;

        if (teamname.value == "")
        { teamname.value = " "; }

        if (licenseorg.value=="")
        { licenseorg.value = " "; }
        
        if (licenseno.value == "")
        { licenseno.value = " "; }



        if (firstname.value == "") {
            document.getElementById('fnamevalid').style.display = "inline-block";
        }else {
            document.getElementById('fnamevalid').style.display = "none";
        }
        // for validation check
        if (firstname.value != "") {
            if (regex.test(firstname.value) == false) {
                document.getElementById('fnamevalid1').style.display = "inline-block";
            } else {
                document.getElementById('fnamevalid1').style.display = "none";
            }
        }
    
        //for empty check
        if (lastname.value == "") {
            document.getElementById('lnamevalid').style.display = "inline-block";
        }
        else { document.getElementById('lnamevalid').style.display = "none"; }
    
        // for validation check
        if (lastname.value != "") {
            if (regex.test(lastname.value) == false) {
                document.getElementById('lnamevalid1').style.display = "inline-block";
            }
            else { document.getElementById('lnamevalid1').style.display = "none"; }
        }
        //for empty check
        if (phno.value == "" || phno.value.length > 14) {
            document.getElementById('phnovalid').style.display = "inline-block";
        }
        else { document.getElementById('phnovalid').style.display = "none"; }
        // for validation check
        if (phno.value != "") {
            if (patt1.test(phno.value) == false) {
                document.getElementById('phnovalid1').style.display = "inline-block";
            }
            else { document.getElementById('phnovalid1').style.display = "none"; }
        }
        // for empty check
        if (emercont.value == "" || emercont.value.length > 11) {
            document.getElementById('Econtactvalid').style.display = "inline-block";
        }
        else { document.getElementById('Econtactvalid').style.display = "none"; }
        // for validation check
        if (emercont.value != "") {
            if (regex.test(emercont.value) == false) {
                document.getElementById('Econtactvalid1').style.display = "inline-block";
            }
            else { document.getElementById('Econtactvalid1').style.display = "none"; }
        }
        // for empty check
        if (emerphno.value == "")
        { document.getElementById('Ephonevalid').style.display = "inline-block"; }
        else { document.getElementById('Ephonevalid').style.display = "none"; }
        // for validation check
        if (emerphno.value != "") {
            if (patt1.test(emerphno.value) == false) { document.getElementById('Ephonevalid1').style.display = "inline-block"; }
            else { document.getElementById('Ephonevalid1').style.display = "none"; }
        }
    
        if (regex.test(teamname.value) == false) { document.getElementById('clubnamevalid').style.display = "inline-block"; }
        else { document.getElementById('clubnamevalid').style.display = "none"; }
    
        if (regex.test(licenseorg.value) == false) { document.getElementById('licenseorgvalid').style.display = "inline-block"; }
        else { document.getElementById('licenseorgvalid').style.display = "none"; }
    
        if (regex1.test(licenseno.value) == false) { document.getElementById('licensenovalid').style.display = "inline-block"; }
        else { document.getElementById('licensenovalid').style.display = "none"; }
    
        if (firstname.value == "" || regex.test(firstname.value) == false || lastname.value == "" || regex.test(lastname.value) == false || phno.value == "" || patt1.test(phno.value) == false || emercont.value == "" || regex.test(emercont.value) == false || emerphno.value == "" || patt1.test(emerphno.value) == false || regex.test(teamname.value) == false || regex.test(licenseorg.value) == false || regex1.test(licenseno.value) == false) {
            let shownotif = document.getElementById("shownotif");
            
        }
        else{
            if (id) {
                db.competitor.update(id, {

                    first_name: firstname.value.toUpperCase(),
                    last_name: lastname.value.toUpperCase(),
                    phoneNo: phno.value,
                    emergency_Contact: emercont.value.toUpperCase(),
                    emergency_phno: emerphno.value,
                    team_name: teamname.value.toUpperCase(),
                    licensing_org: licenseorg.value.toUpperCase(),
                    license_No: licenseno.value.toUpperCase()

                })
                history.goBack();
            }
            else {
                bulkcreate(db.competitor, {
                    first_name: firstname.value.toUpperCase(),
                    last_name: lastname.value.toUpperCase(),
                    phoneNo: phno.value,
                    emergency_Contact: emercont.value.toUpperCase(),
                    emergency_phno: emerphno.value,
                    team_name: teamname.value.toUpperCase(),
                    licensing_org: licenseorg.value.toUpperCase(),
                    license_No: licenseno.value.toUpperCase()

                })

                history.goBack();
                    
            }
            firstname.value = lastname.value = phno.value = emercont.value = emerphno.value = teamname.value = licenseorg.value = licenseno.value = "";
        }
       }
    }


    return(
        <>
         
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 "> </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mx-auto "> 
            <div className="container-fluid mt-3 ">

                    <span className=" float-left " style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
                        <button   onClick={() => { showpopup();}} type="button" className="btn buttonarrow " ><RiArrowLeftSLine style={{marginBottom:"1px"}} size="1.5em"/>Save</button>
                    </span>
                    
                    

            
            
             </div>

            <br></br>

            <div className="container-fluid" style={{marginTop:"70px" }}>

            <form>
                <fieldset style={{marginTop:"20px", padding: "10px" , border:"solid",  borderColor: "#007bff", borderWidth: "0.5px", boxShadow: "6px 10px 17px -6px rgba(53,60,61,1)"}}>
                <legend style={{marginLeft:"10px",color:"#007bff"}}>Mandatory</legend>
                <div className="form-group">
                    <input type="hidden" id="updateid" />
                    <label>First Name *</label>
                    <input type="text" onKeyDown={handleEnter} className="form-control" id="fname"  placeholder="First Name" maxLength="20"/>
                    <label id="fnamevalid" style={{color:"red",display:"none"}}>First Name Is Required </label>
                    <label id="fnamevalid1"style={{color:"red",display:"none"}}>Only Alphabets Are Acceptable</label>
                
                </div>
                <div className="form-group">
                    <label>Last Name *</label>
                    <input type="text" onKeyDown={handleEnter} className="form-control" id="lname"  required placeholder="Last Name" maxLength="20"/>
                    <label id="lnamevalid" style={{color:"red",display:"none"}}>Last Name Is Required</label>
                    <label id="lnamevalid1" style={{color:"red",display:"none"}}>Only Alphabets Are Acceptable</label>
                
                </div>
                <div className="form-group">
                    <label>Your Phone Number  *</label>
                    <input type="number"  onKeyDown={handleEnter}  className="form-control" id="phno"  required placeholder="Your Phone Number" maxLength={14}/>
                    <label id="phnovalid" style={{color:"red",display:"none"}}>Phone Number Is Required /</label>
                    <label id="phnovalid1" style={{color:"red",display:"none"}}>Only Digits Are Acceptable</label>
                    
                </div>
                <div className="form-group">
                    <label>Emergency Contact and Phone *</label>
                    <input type="text"  onKeyDown={handleEnter}  className="form-control" id="Econtact"  required placeholder="Emergency Contact Name" maxLength={20}/>
                    <label id="Econtactvalid" style={{color:"red",display:"none"}}>Emergency Contact Is Required  </label>
                    <label id="Econtactvalid1" style={{color:"red",display:"none"}}>Only Alphabets Are Acceptable</label>

                </div>
                <div className="form-group">
                    <input type="number"  onKeyDown={handleFinalEnter}  className="form-control" id="Ephone"   required placeholder="Emergency Phone Number" maxLength={11}/>
                    <label id="Ephonevalid" style={{color:"red",display:"none"}}>Emergency Phnone Number Is Required</label>
                    <label id="Ephonevalid1" style={{color:"red",display:"none"}}>Only Digits Are Acceptable</label>
                
                </div>
            </fieldset>
    
                <fieldset style={{marginTop:"20px", marginBottom:"20px", padding: "10px" , border:"solid",  borderColor: "#007bff", borderWidth: "0.5px", boxShadow: "6px 10px 17px -6px rgba(53,60,61,1)"}}>
                    <legend style={{marginLeft:"10px", color:"#007bff"}}>Optional</legend>

                    <div className="form-group">
                        <label>Team / Club Name</label>
                        <input type="text"  onKeyDown={handleEnter}  className="form-control" id="clubname" placeholder="Team / Club Name" maxLength={20}/>
                        <label id="clubnamevalid" style={{color:"red",display:"none"}}>Only Alphabets Are Acceptable</label>
                    </div>
                    <div className="form-group">
                        <label>Licensing Organization</label>
                        <input type="text"  onKeyDown={handleEnter}  className="form-control" id="licenseorg" placeholder="Licensing Organization" maxLength={20}/>
                        <label id="licenseorgvalid"  style={{color:"red",display:"none"}}>Only Alphabets Are Acceptable</label>
                    </div>
                    <div className="form-group">
                        <label>License Number</label>
                        <input type="text"  onKeyDown={handleEnter}  className="form-control" id="licenseno" placeholder="License Number" maxLength={20}/>
                        <label id="licensenovalid" style={{color:"red",display:"none"}}>Only Alphabets And Digits Are Acceptable</label>
                    </div>
                </fieldset>
            </form>

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

                                <button onClick={() => {
                                    history.goBack();
                                }} type="button" className="btn btn-outline-danger" style={{float:"left", fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))",  borderRadius: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Don't Save</button>


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

export default Formpage;