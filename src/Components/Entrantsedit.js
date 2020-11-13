import React,{useEffect, useState} from "react";
import Dexie from "dexie";
import {useHistory, useLocation} from "react-router-dom";
import {RiArrowLeftSLine} from "react-icons/ri"

const Entrantsdata = () => {

    

    let history = useHistory();
    let location = useLocation();

    const goBack = () => {
        history.goBack();
    }

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

    
    useEffect(()=>{
        database();
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                setOfficialsData(scanneddata)
            })
    },[])
    

    let y = [];
    if(officialsData !== undefined){
        officialsData.map(x => {
            location.state.data.id === x.eventname && !isNaN(x.position) ?
            y.push(parseInt(x.position))
            :
            console.log("array")
        })
    }
    else{
        y = null
    }

    const plusButton = (index, position) =>{
        database();

        if(position === "DQ" || position === "DNF" || position === "DNS"){
            db.scanneddata.update(index,{
                position: "0" 
            })
        }else{
            db.scanneddata.update(index,{
                position: (Math.max.apply(null,y) + 1).toString() 
             })
        }
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                setOfficialsData(scanneddata)
            })
            
    }


    const DQButton = (index) =>{
        database();
        db.scanneddata.update(index,{
           position: "DQ"
        })
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                setOfficialsData(scanneddata)
            })
            
    }

    const DNFButton = (index) =>{
        database();
        db.scanneddata.update(index,{
           position: "DNF"
        })
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                setOfficialsData(scanneddata)
            })
            
    }

    const DNSButton = (index) =>{
        database();
        db.scanneddata.update(index,{
           position: "DNS"
        })
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                setOfficialsData(scanneddata)
            })
            
    }

    const UndoButton = (index) => {
        database();
        db.scanneddata.update(index,{
           position: "0"
        })
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                setOfficialsData(scanneddata)
            })   
    }
    
    

    return(
        <>
            <div className=" col-lg-3 col-md-12 col-sm-12 col-xs-12 "></div>
            <div className=" col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-3 mx-auto ">
            <div class="row col-12">
            <span className=" float-left " style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
            <button onClick={goBack} type="button" class="btn buttonarrow" ><RiArrowLeftSLine style={{marginBottom:"1px"}} size="1.5em"/>Back</button>
            </span>

                
            </div>

                <div class="container col-12" align="left" style={{padding:"10px", marginTop:"30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <input type="hidden" id="signonid1" />
                    <h3 id="Epageevename" style={{color:"#27ae60",fontWeight:"500"}}>{location.state.data.eventname}</h3>
                    <h5 style={{color:"red", fontWeight:"500"}}>Date: <span id="Epageevedate" style={{color:"black"}}>{location.state.data.date}</span></h5>
                    <h5 style={{color:"red", fontWeight:"500"}}>Total Competitors: <span id="Epagecompetitor" style={{color:"black"}}>{location.state.data.competitors}</span></h5>
                </div>
            

            
                    
                    <div class="col-12" style={{padding:"0px 10px 0px 10px", marginTop:"30px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name/Team</th>
                                    <th scope="col">position</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="scantbody">
                                {officialsData !== undefined?
                                    officialsData.map(x => (
                                        location.state.data.id === x.eventname ?
                                            <tr>
                                                <td>{x.race_no}</td>
                                                <td>{x.fullname} / {x.teamname}</td>
                                                <td>{x.position === "0" ? null : x.position}</td>
                                                {x.position!=="0"?<td><button onClick={()=>{UndoButton(x.id);}} class="btn btn-outline-primary" id="fourbuttons0" style={{ float:"right",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>UNDO</button>
                                                    </td>:<td>
                                                    <button onClick={()=>{DNSButton(x.id);}} class="btn btn-outline-primary" id="fourbuttons1" style={{float:"right",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>DNS</button>
                                                    <button onClick={()=>{DNFButton(x.id);}} class="btn btn-outline-primary" id="fourbuttons2" style={{float:"right",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>DNF</button>
                                                    <button onClick={()=>{DQButton(x.id);}} class="btn btn-outline-primary" id="fourbuttons3" style={{float:"right",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>DQ</button>
                                                    <button onClick={()=>{plusButton(x.id, x.position);}} class="btn btn-outline-primary" id="fourbuttons4" style={{float:"right",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }}>+</button>
                                                </td>}
                                            </tr>
                                        :
                                        null
                                )) : null
                                }
                            </tbody>
                        </table>
                    </div>
                    
                    <div id="myModal" class="modal">
                        
                        <div class="modal-content maincontainer">
                            <div class="row">
                                <div class="col-sm-12" align="left">
                                    <span class="close">&times;</span>
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