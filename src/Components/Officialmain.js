import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import Dexie from "dexie";
import Edit from "../Images/edit.png";
import {FaRegCalendarAlt} from "react-icons/fa";
import {RiArrowLeftSLine} from "react-icons/ri";
import {FaSignInAlt} from "react-icons/fa";
import {FaEdit} from "react-icons/fa";
import {FaDownload} from "react-icons/fa";
import {ImBin} from "react-icons/im";
import CsvDownloader from "react-csv-downloader";

export const Eventcard = (props) => {

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
        db.officials.update(props.data.id,{
            results: props.result,
            competitors: props.length
         })
         
    },[])


    return(
        <div className="row" onClick={() => {props.display(props.data.id,props.index)}} id= {`official${props.data.id}`}  style={{padding:"10px", marginTop:"25px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <div className="col-sm-12" data-id={props.data.id} >
                <h3 style={{display: "block", color:"#27ae60", fontWeight:"500", marginBottom:"35px"}}>{props.data.eventname}</h3>
                <img onClick={() => {props.display(props.data.id)}} data-id={props.data.id} id="signonimg" style={{marginTop:"-7px",float: "right",cursor:"pointer"}} src={Edit} alt="Click To Edit" width="50" height="50" />     
                <h5 style={{display: "block"}}><span style={{color:"red", fontWeight:"500",marginBottom:"35px"}}>Date:</span> {props.data.date}</h5>
                <h5 style={{display: "block"}}><span style={{color:"red", fontWeight:"500",marginBottom:"35px"}}>Total Competitors:</span> {props.length}</h5>
                <h5 style={{display: "block"}}><span style={{color:"red", fontWeight:"500",marginBottom:"35px"}}>Results:</span> {props.result}</h5>
            </div>
        </div>
    )
        
}

    const Officialmain = () => {

        let history = useHistory();

        const[officialsData, setOfficialsData] = useState();
        const[index, setindex] = useState();
        const[csvindex, csvsetindex] = useState();
        const[qrscannerstate, setqrscannerstate]  = useState();
        const[entrantsdata, setentrantsdata] = useState();
        const[entrantseditstate, setentrantseditstate] = useState();
        const[scanneddata, setscanneddata] = useState();


        const columns = [{
            id: 'first',
            displayName: 'EVENTNAME'
          }, {
            id: 'second',
            displayName: 'FULLNAME'
          },{
            id: 'third',
            displayName: 'PHONENUMBER'
          },{
            id: 'fourth',
            displayName: 'EMERGENCYCONTACT'
          },{
            id: 'fifth',
            displayName: 'EMERGENCYPHONENUMBER'
          },{
            id: 'sixth',
            displayName: 'TEAMNAME'
          },{
            id: 'seventh',
            displayName: 'LICENSEORGANIZATION'
          },{
            id: 'eighth',
            displayName: 'LICENSENUMBER'
          },{
            id: 'ninth',
            displayName: 'RACENUMBER'
          },{
            id: 'tenth',
            displayName: 'POSITION'
          }];

        

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
            
               
        const datas = [];


        
    
        useEffect(()=>{ 
            database();
            db.table("officials")
                .orderBy("date")
                .toArray()
                .then((officials)=>{
                    setOfficialsData(officials)
                })
                
        },[])

    const completedelete = () => {
        database();
        let id = parseInt(document.getElementById('modaleventid').value);
        db.table('officials').delete(id)
        
        hidemodal();
        
        db.table("officials")
            .toArray()
            .then((officials)=>{
                setOfficialsData(officials)
            })
    
    }

    const deleteevent = () => {
        
        let modal = document.getElementById("myModal1");
        modal.style.display = "block";
        
    }

    


    const editevent = () => {

        database();
        
        history.push({
            pathname:"/Createevent",
        })

        let id = parseInt(document.getElementById('modaleventid').value);
        
        db.officials.get(id, data => {
            document.getElementById('updateeventid').value = id || 0;
            document.getElementById('evename').value = data.eventname || "";
            document.getElementById('evedate').value = data.date;
        })
    }

    const nextPageEvent = () => {
        history.push({
            pathname:"/Createevent"
        })
    }

    const goBack = () => {
        history.goBack();
    }

    const hidemodal = () => {
        let modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    const hidemodal1 = () => {
        let modal = document.getElementById("myModal1");
        modal.style.display = "none";
    }


    const display = (did,index) => {

        database();
        
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        let id = parseInt(did);
        setindex(id)
        csvsetindex(index)
        
        db.officials.get(id, data => {
            document.getElementById('modalevename').innerText = data.eventname;
            document.getElementById('modelevedate').innerText = data.date;
            document.getElementById('modelevecompetitor').innerText = data.competitors;
            document.getElementById('modeleveresults').innerText = data.results;
            document.getElementById('modaleventid').value = data.id;
        
        })
        
    }    

    let eventmap;
    let z = []
    let p =[]
    let csv=[]


        if (officialsData !== undefined && scanneddata !== undefined){
            eventmap = 
            officialsData.map((y, index1)=>(

                z = [],
                p =[],  
                csv=[],
                scanneddata.map((x, index)=>(  
                    
                    x.eventname===y.id?
                    z.push(index):null,
                    
                    x.eventname===y.id&&x.position!=="0"?
                    p.push(index):null,

                    x.eventname===y.id && index1===0?
                    csv.push({
                        first: y.eventname,
                        second: x.fullname,
                        third: x.phonenumber,
                        fourth: x.emer_contact,
                        fifth: x.emer_ph,
                        sixth: x.teamname,
                        seventh: x.licesneorg,
                        eighth: x.licesneno,
                        ninth: x.race_no,
                        tenth: x.position,
                    }):null
                    
    
                    
                )), datas.push(csv),
             <Eventcard  length={z.length} result={p.length} display={display} data={y} index={index1}/> 
                
            ))
            
        }else{
            eventmap = "Please wait...";
        }

        


    const nextPage = () => {
        history.push({
            pathname:"/Eventqrscanner",
            state:{
                data:qrscannerstate,
                data2:officialsData
            }
        })
    }
    

    const qrscanner = (did) => {

        database();

            let id = parseInt(did);
            db.officials.get(id, data => {
                
                setqrscannerstate(data);
        
            },)
   
    }

   
    

    useEffect(()=>{
        if(qrscannerstate !== undefined){
            nextPage();
        }
        
    },[qrscannerstate])

    const nextPage2 = () =>{
        history.push({
            pathname:"/Entrantsdata",
            state:{
                data:entrantsdata,
                length: officialsData.competitors    
            }
        })
    }

    useEffect(()=>{
        if(entrantsdata !== undefined){
            nextPage2();
        }
        
    },[entrantsdata])

    const entrantspage = (index) =>{

        database(); 

        let id = parseInt(index);
            db.officials.get(id, data => {
                
                setentrantsdata(data);
        
            },)
    }
    
    const nextPage3 = () =>{
        history.push({
            pathname:"/Entrantsedit",
            state:{
                data:entrantseditstate,
                
            }
        })
    }

    useEffect(()=>{
        if(entrantseditstate !== undefined){
            nextPage3();
        }
        
    },[entrantseditstate])

    const entrantseditpage = (index) =>{

        database();

        let id = parseInt(index);
            db.officials.get(id, data => {
                
                setentrantseditstate(data);
        
            },)
    }


    useEffect(()=>{
        database();
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                
                setscanneddata(scanneddata)
                

            })
    },[])

    
    const showModal = () => {

    }
    

    return(
        
            <>
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 "> </div>
                
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-3 mx-auto ">
                

                    <span className=" float-left " style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
                    <button  onClick={goBack} type="button" class="btn buttonarrow"  ><RiArrowLeftSLine style={{marginBottom:"1px"}} size="1.5em"/>Back</button>
                    </span>

                    <span className=" float-right " style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
                    <button  onClick={nextPageEvent} type="button" class="btn buttonplain" >Create Event <FaRegCalendarAlt style={{marginBottom:"1px"}} size="1.5em"/> <i class="fa fa-calendar"></i></button>
                    </span>
                
                
                

                <div id="insertmsg" class=" insertmsg" align="center"><h5>Data Inserted Successfully..</h5></div>
                <div id="deletemsg" class=" deletemsg" align="center"><h5>Data Deleted Successfully..</h5></div>
                <br></br>
                <div className="container">
                <div class="container" style={{marginTop:"55px"}} align="left">
                    <h1>Events:</h1>
                    
                </div>
                </div>

                <div class="container py-2" id="con1" align="left">
                    {eventmap}
                </div>
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 "> </div>

                <div onClick={hidemodal} id="myModal" className="modal">
                <div className="modal-content maincontainer">
                    <div className="row">
                        <div className="col-sm-12" align="left">
                            <input type="hidden" id="modaleventid" />
                            <span className="close" onClick={hidemodal}>&times;</span>
                            <h6 id="filenameid" style={{display:"none",color:"#27ae60",fontWeight:"500"}}></h6>
                            <h3 id="modalevename" style={{color:"#27ae60",fontWeight:"500"}}></h3>
                            <h5 style={{color:"red", fontWeight:"500"}}>Date: <span id="modelevedate" style={{color:"black"}}></span></h5>
                            <h5 style={{color:"red", fontWeight:"500"}}>Competitors: <span id="modelevecompetitor"  style={{color:"black"}}></span></h5>
                            <h5 style={{color:"red", fontWeight:"500"}}>Results: <span id="modeleveresults"  style={{color:"black"}}></span></h5>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-6 btn-group-vertical">
                                <button onClick={() =>{qrscanner(index)}} type="button" id="signonevent"  className="btn btn-outline-primary" style={{fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Sign On <FaSignInAlt style={{marginBottom:"1px"}} size="1em"/></button>
                                <button onClick={editevent} type="button" id="editevent"  className="btn btn-outline-warning" style={{marginTop:"8px",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))",borderRadius:"5px", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Edit Event <FaEdit style={{marginBottom:"1px"}} size="1em"/></button>
                                <button type="button" className="btn btn-outline-success"  style={{marginTop:"8px",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius:"5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}><CsvDownloader
                                        filename="myfile"
                                        separator=";"
                                        wrapColumnChar="'"
                                        columns={columns}
                                        datas={datas[csvindex]}
                                        className="btn-outline-success"
                                        style={{background:"transparent", border:"none", outline:"none"}}
                                        text="Download" /> <FaDownload style={{marginBottom:"1px"}} size="1em"/></button>
                            </div>
                            <div className="col-6 btn-group-vertical ">
                                <button onClick={()=>{entrantspage(index)}} type="button" id="viewEntrants"  className="btn btn-outline-primary" style={{fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius: "5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>View Entrants <FaRegCalendarAlt style={{marginBottom:"1px"}} size="1em"/></button>
                                <button onClick={()=>{entrantseditpage(index)}} type="button" id="Editresults"  className="btn btn-outline-warning" style={{marginTop:"8px",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))",borderRadius:"5px", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Edit Results <FaEdit style={{marginBottom:"1px"}} size="1em"/></button>
                                <button onClick={deleteevent} type="button" id="deleteevent"  className="btn btn-outline-danger" style={{marginTop:"8px",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius:"5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Delete <ImBin style={{marginBottom:"1px"}} size="1em"/></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    

                <div onClick={hidemodal1} id="myModal1" class="modal">

                    
                    <div class="modal-content maincontainer">
                        <div class="row">
                            <div class="col-sm-12" align="left">
                                <span class="close" onClick={hidemodal} >&times;</span>
                                <h3>Delete License</h3>
                                <hr />
                                <h5>Are you sure?</h5>
                                <hr />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">

                                <button onClick={completedelete} type="button"  class="btn btn-outline-danger" style={{float:"left", fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius: "5px",  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Delete</button>


                                <button onClick={hidemodal1} type="button"  class="btn btn-outline-primary" style={{float:"right",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius:"5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Keep</button>

            </div>
        </div>
    </div>
</div>

        </>
        
    )
}

export default Officialmain