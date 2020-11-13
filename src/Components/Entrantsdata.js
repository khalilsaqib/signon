import React,{useState, useEffect} from "react";
import Dexie from "dexie";
import {useHistory, useLocation} from "react-router-dom";
import {RiArrowLeftSLine} from "react-icons/ri"
import info from "../Images/info.png";


const Entrantsdata = () => {

    
    
    let history = useHistory();
    let location = useLocation();
    const[officialsData, setOfficialsData] = useState();

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
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                setOfficialsData(scanneddata)
            })
            
    },[])

    const closeModal = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
    

    const showinfomodel = id =>{
        db.scanneddata.where('id').equals(id).each(function (data) {
                document.getElementById('infoname').innerText = data.fullname
                document.getElementById('infophno').innerText = data.phonenumber
                document.getElementById('infoteam').innerText = data.teamname
                document.getElementById('infolorg').innerText = data.licenseorg
                document.getElementById('infolno').innerText = data.licenseno
                document.getElementById('infoEname').innerText = data.emer_contact
                document.getElementById('infoEcon').innerText = data.emer_ph
        });
    
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
       
    }

    let eventmap;
    if (officialsData !== undefined){
        eventmap = officialsData.map(x => (
            location.state.data.id === x.eventname ?
            <tr>
                <td>{x.race_no}</td>
                <td>{x.fullname}</td>
                <td>{x.teamname}</td>
                <td><img onClick={()=>{showinfomodel(x.id)}} src={info} style={{width:"20px"}} alt="info"/></td>
            </tr>
            :
            null
        ))
    }else{
        eventmap = "Please Wait!";
    }

    
    

    return(
        <>
            <div className=" col-lg-3 col-md-12 col-sm-12 col-xs-12 "></div>
            <div className=" col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-3 mx-auto ">
            
            <div class="row col-12">
            <span className=" float-left " style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
            <button onClick={() => {history.goBack()}} type="button" class="btn buttonarrow" ><RiArrowLeftSLine style={{marginBottom:"1px"}} size="1.5em"/>Back</button>
            </span>
                
                
            </div>
            
                <div class="container col-12" align="left" style={{padding:"10px", marginTop:"30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <input type="hidden" id="signonid1" />
                    <h3 id="Epageevename" style={{color:"#27ae60",fontWeight:"500"}}>{location.state.data.eventname}</h3>
                    <h5 style={{color:"red", fontWeight:"500"}}>Date: <span id="Epageevedate" style={{color:"black"}}>{location.state.data.date}</span></h5>
                    <h5 style={{color:"red", fontWeight:"500"}}>Total Competitors: <span id="Epagecompetitor" style={{color:"black"}}>{location.state.data.competitors}</span></h5>
                </div>
            

            
                    
                    <div class="container col-12" style={{padding:"0px 10px 0px 10px", marginTop:"30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Team</th>
                                    
                                </tr>
                            </thead>
                            <tbody id="scantbody">
                                {eventmap}
                                
                            </tbody>
                        </table>
                    </div>
                    
                    <div onClick={closeModal} id="myModal" class="modal">
                        
                        <div  class="modal-content maincontainer">
                            <div class="row">
                                <div class="col-sm-12" align="left">
                                    <span onClick={closeModal} class="close">&times;</span>
                                    <h3 id="infoname" style={{color:"#27ae60",fontWeight:"500"}}></h3>
                                    <h5 id="infophno"></h5>
                                    <h5 id="infoteam"></h5>
                                    <h5 id="infolorg"></h5>
                                    <h5 id="infolno"></h5>
                                    <h3 style={{color:"#27ae60",fontWeight:"500"}}>Emergency Contact</h3>
                                    <h5 id="infoEname"></h5>
                                    <h5 id="infoEcon"></h5>
                                </div>
                            </div>
                        </div>
                    </div>

            </div>
            <div className=" col-lg-3 col-md-12 col-sm-12 col-xs-12 "></div>
        </>
    )
}

export default Entrantsdata