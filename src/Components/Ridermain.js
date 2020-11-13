import React, {useState, useEffect} from "react";
import "../App.css"
import {useHistory} from "react-router-dom";
import Dexie from "dexie";
import {RiArrowLeftSLine} from "react-icons/ri";
import {RiArrowRightSLine} from "react-icons/ri";
import {FaSignInAlt} from "react-icons/fa";
import {FaEdit} from "react-icons/fa";
import {ImBin} from "react-icons/im";

export const Ridermaincard = (props)=> {
    
    let id = props.data.id
    
    return(
        <>
            <div className="row" id={`competitor${id}`} style={{padding:"10px", marginTop:"35px",boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        <div  className="col-sm-6">
                            
                            <h2 style={{color:"#27ae60",fontWeight:"500"}}>{props.data.first_name} {props.data.last_name}</h2>
                            
                            <h6 style={{marginBottom:"35px"}}>{props.data.phoneNo}</h6>
                            <h6 >{props.data.team_name}</h6>
                            <h6 >{props.data.licensing_org}</h6>
                            <h6 >{props.data.license_No}</h6>
                            <h5 >Emergency Contact:</h5>
                            <h6 >{props.data.emergency_Contact}</h6>
                            <h6 >{props.data.emergency_phno}</h6>
                        </div>
                        <div className="col-sm-6" style={{display:"grid"}}>
                            <div className="btn-group-vertical " style={{paddingTop:"15px"}}>
                                <button onClick={()=>{props.signOn(id)}}type="button" data-id="${data.id}" className="btn btn-outline-primary "  style={{padding:"0px",fontSize:"20px", height:"", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginBottom:"15px", }}>Sign On <FaSignInAlt style={{marginBottom:"1px"}} size="1em"/></button>
                                <button onClick={()=>{props.editvalues(id)}} type="button" data-id="${data.id}" className="btn btn-outline-warning "  style={{padding:"0px",fontSize:"20px", height:"", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginBottom:"15px", }}>Edit <FaEdit style={{marginBottom:"1px"}} size="1em"/></button>
                                <button onClick={()=>{props.deletecard(id)}} type="button" data-id="${data.id}" className="btn btn-outline-danger "   style={{padding:"0px",fontSize:"20px", height:"", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", }}>Delete <ImBin style={{marginBottom:"1px"}} size="1em"/></button>
                            </div>
                        </div>
            </div>

        </>
    )
    
}

const Ridermain = () => {

    

    
    let history = useHistory();
    
    const[data, setData] = useState();
    const[riderqr, setriderqr]=useState();
    
    const productdb = (dbname, table)=>{
        const db = new Dexie(dbname);
        db.version(1).stores(table);
        db.open();
        return db;
    }



    let db;
    function database(){
        db = productdb("competitordb",{
            competitor: "++id, first_name, last_name, phoneNo,emergency_Contact,emergency_phno,team_name,licensing_org,license_No", 
            officials: "++id, eventname, date, competitors, results,position,racenoo,download",
            scanneddata: "++id,eventname,fullname,phonenumber,emer_contact,emer_ph,teamname,licenseorg,licenseno,race_no,position"
        })
    }

    database();

    
    
    useEffect(()=>{
        db.table("competitor")
            .toArray()
            .then((competitor)=>{
                setData(competitor)
            })
    },[])

    const nextPage = () =>{
        history.push({
            pathname:"/Formpage"
        })
    }

    const goBack = () => {
        history.goBack();
    }

    const deletecardModal = (x) => {
        var modal = document.getElementById("myModal2");
        modal.style.display = "block";
        document.getElementById("modalcompid").value = x;
    }

    const deletecard = () => {
        let id = parseInt(document.getElementById('modalcompid').value);
        db.table('competitor').delete(id)
        keepcard();

        db.table("competitor")
        .toArray()
        .then((competitor)=>{
            setData(competitor)
        })
    }

    const nextPageQr = () =>{
        history.push({
            pathname:"/riderqr",
            state:{
                data:riderqr
            }
        })
    }

    const signOn = (did) => {

        let id = parseInt(did);
        db.competitor.get(id, data => {
            
            setriderqr(data)
    
        },)
        
    }

    useEffect(()=>{
        if(riderqr !== undefined){
         nextPageQr();   
            
        }
    },[riderqr])


    
    

    const editvalues = (did) => {
        history.push({
            pathname:"/Formpage"
        })
        let id = parseInt(did);
        db.competitor.get(id, data => {
            document.getElementById('updateid').value = id|| 0;
            document.getElementById('fname').value = data.first_name || "";
            document.getElementById('lname').value = data.last_name || "";
            document.getElementById('phno').value = data.phoneNo || "";
            document.getElementById('Econtact').value = data.emergency_Contact || "";
            document.getElementById('Ephone').value = data.emergency_phno || "";
            document.getElementById('clubname').value = data.team_name || "";
            document.getElementById('licenseorg').value = data.licensing_org || "";
            document.getElementById('licenseno').value = data.license_No || "";
        })
    }

    const keepcard = () =>{
      var modal = document.getElementById("myModal2");
      modal.style.display = "none";
    }


    let emptyrider;
    if(data !== undefined){
        emptyrider = data.map((x)=>(<Ridermaincard data={x} editvalues={editvalues} deletecard={deletecardModal}  signOn={signOn}/>))
    }else{
        emptyrider = "No records to display or PLEASE WAIT!";
    }

    return(
        <>
            <div>
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 "> </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-3 mx-auto "> 
                            
                
                    
                    <span className="float-left" style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
                        <button  onClick={goBack} type="button" className="btn buttonarrow "  ><RiArrowLeftSLine style={{marginBottom:"1px"}} size="1.5em"/>Back</button>
                    </span>
                    <span className=" float-right" style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
                        <button  onClick={nextPage} type="button" className="btn buttonplain"  >Add New Id <RiArrowRightSLine style={{marginBottom:"1px"}} size="1.5em"/></button>
                    </span>
                    
                    
                
                
                    <br></br>
                
                    <div className="container">
                    <div id="deletemsg" className=" deletemsg" align="center"><h5>Data Deleted Successfully..</h5></div>
                    <div className="ml-1" style={{marginTop:"55px"}} align="left">
                        <p style={{fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))"}}>Please choose a license to sign on with today:</p>
                    </div>

                <div className="py-2" id="con" align="left">
                    {/* Card display renders here */}
                    
                    {emptyrider}
                </div>
            
                    </div>
                </div>
            </div>
        
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 "> </div> 

            <div onClick={keepcard} id="myModal2" className="modal">
                <div className="modal-content maincontainer">
                    <div className="row">
                        <div className="col-sm-12" align="left">
                            <input type="hidden" id="modalcompid" />
                            <span className="close" onClick={keepcard}>&times;</span>
                            <h3>Delete License</h3>
                            <hr />
                            <h5>Are you sure?</h5>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            
                                <button onClick={deletecard} type="button" className="btn btn-outline-danger" style={{float:"left", fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius: "5px" , boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Delete</button>
                        
                                <button onClick={keepcard} type="button" className="btn btn-outline-primary" style={{float:"right", fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius:"5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Keep</button>
                                
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Ridermain