import React ,{useState, useEffect}from "react";
import Dexie from "dexie";
import QrReader from "react-qr-reader";
import {useHistory, useLocation} from "react-router-dom";
import {RiArrowLeftSLine} from "react-icons/ri";
import {CgPlayTrackNext} from "react-icons/cg";
import {CgPlayTrackPrev} from "react-icons/cg";
import {BiCheck} from "react-icons/bi";
import {MdBlock} from "react-icons/md";
import {FaSignOutAlt} from "react-icons/fa";



const Eventqrscanner = (props) =>{

    

    let history = useHistory();
    let location = useLocation();

    
    const[result, setresult] = useState();
    const[racenoo, setracenoo] = useState()
    const[officials, setOfficials] = useState();
    const[scanneddata, setScannedData] = useState();
    const[comp, setcomp] = useState(location.state.data.competitors);
    const[skip, setskip] = useState({
        visible:true, 
        text:"Skip", 
        icon:<CgPlayTrackNext style={{marginBottom:"1px"}} size="1.5em"/>
    });
    const[assignvalue, setassignvalue] = useState(parseInt(location.state.data.racenoo)+1);
    const[primary, setprimary] = useState(location.state.data.id);


    


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

    database();


    
    useEffect(()=>{
        db.table("officials")
            .toArray()
            .then((officials)=>{
                setOfficials(officials)
            })
        db.table("scanneddata")
            .toArray()
            .then((scanneddata)=>{
                setScannedData(scanneddata)
            })
    },[])

    if(scanneddata !== undefined){
        console.log(scanneddata.length)
    }
    
    
    
    const handleskip = () =>{    

        if(skip.visible === true)
            {setskip({visible:!skip.visible, text:"Unskip", icon:<CgPlayTrackPrev style={{marginBottom:"1px"}} size="1.5em"/>});
            setassignvalue(assignvalue + 1);
        }else{
            setskip({visible:!skip.visible, text:"Skip", icon:<CgPlayTrackNext style={{marginBottom:"1px"}} size="1.5em"/>});
            setassignvalue(assignvalue - 1);
        }

    }

    
    const handleScan = data => {
        if (data) {
          setresult(data)
        }
      }
    const handleError = err => {
        console.error(err)
      }

    const goBack = () => {

        history.goBack();
    }

    const backtoscanner = () => {
        setresult(undefined)
    }

    let qrreader;
    let qrresult;
    let resultcomponent;
    let backbutton = <span style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
    
                        <button onClick={goBack} type="button" class="btn buttonarrow float-left"  ><RiArrowLeftSLine style={{marginBottom:"1px"}} size="1.5em"/>Back</button>
    
    </span>
    
    let a=new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em

function beep(vol, freq, duration){
  let v=a.createOscillator()
  let u=a.createGain()
  v.connect(u)
  v.frequency.value=freq
  v.type="square"
  u.connect(a.destination)
  u.gain.value=vol*0.01
  v.start(a.currentTime)
  v.stop(a.currentTime+duration*0.001)
}

    if(result === undefined){
                        qrreader =<QrReader delay={300}
                                    onError={handleError}
                                    onScan={handleScan}
                                    style={{ width:"100%"}}
                                  />
                        qrresult = null; 
                        backbutton = null;
    }else{
        
    const assigndata = () => {
        bulkcreate(db.scanneddata,{
            eventname:location.state.data.id,
            fullname:qrresult[0],
            phonenumber:qrresult[1],
            emer_contact:qrresult[2],
            emer_ph:qrresult[3],
            teamname:qrresult[4],
            licenseorg:qrresult[5],
            licenseno:qrresult[6],
            race_no:assignvalue,
            position:"0"
        })

        db.officials.update(primary,{
            racenoo:assignvalue,
            competitors:comp+1
        })
        setcomp(comp+1)
        setresult(undefined);
        setassignvalue(assignvalue+1);
        setskip({visible:true, text:"Skip", icon:<CgPlayTrackNext style={{marginBottom:"1px"}} size="1.5em"/>});
      }

        

        qrreader = null
        qrresult = result.split(",");
        let modal = document.getElementById("myModal1")
        
        if(scanneddata.length !== 0){
        scanneddata.map(x=>{
            if(location.state.data.id === x.eventname){
                if(qrresult[1] === x.phonenumber){
                    qrreader =<QrReader delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width:"100%"}}
                />
                modal.style.display="block"
                setresult(undefined)
                db.scanneddata.where('phonenumber').equals(qrresult[1]).each(function (data) {
                    setracenoo(data.race_no);
                });
                } 
                else{
                    beep(100,300,300);
                    resultcomponent = <div className="row" style={{padding:"10px", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                    <div  className="col-sm-6">
                    
                    <h2 style={{color:"#27ae60",fontWeight:"500"}}>{qrresult[0]}</h2>
                    
                    <h6 style={{marginBottom:"35px"}}>{qrresult[1]}</h6>
                    <h6 >{qrresult[4]}</h6>
                    <h6 >{qrresult[5]}</h6>
                    <h6 >{qrresult[6]}</h6>
                    <h5 >Emergency Contact:</h5>
                    <h6 >{qrresult[2]}</h6>
                    <h6 >{qrresult[3]}</h6>
                    </div>
                    <div className="col-sm-6" style={{display:"grid"}}>
                    <div className="btn-group-vertical " style={{paddingTop:"15px"}}>
                        <button onClick={assigndata} type="button" data-id="${data.id}" className="btn btn-outline-primary "  style={{padding:"0px", fontSize:"20px", float:"right", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginBottom:"17px", }}>Assign {assignvalue}<BiCheck style={{marginBottom:"1px"}} size="1.5em"/></button>
                        <button onClick={handleskip} type="button" data-id="${data.id}" className="btn btn-outline-warning "  style={{padding:"0px", fontSize:"20px", float:"right", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginBottom:"17px", }}>{skip.text}{skip.icon}</button>
                        <button onClick={backtoscanner} type="button" data-id="${data.id}" className="btn btn-outline-danger "   style={{padding:"0px", fontSize:"20px", float:"right", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginBottom:"10px",}}>Reject<MdBlock style={{marginBottom:"1px"}} size="1.2em"/></button>
                    </div>
                    </div>
                    </div>
                }
                
            }
            
        })

    }else{
        beep(300,300,300);
            resultcomponent = <div className="row" style={{padding:"10px", boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <div  className="col-sm-6">
            
            <h2 style={{color:"#27ae60",fontWeight:"500"}}>{qrresult[0]}</h2>
            
            <h6 style={{marginBottom:"35px"}}>{qrresult[1]}</h6>
            <h6 >{qrresult[4]}</h6>
            <h6 >{qrresult[5]}</h6>
            <h6 >{qrresult[6]}</h6>
            <h5 >Emergency Contact:</h5>
            <h6 >{qrresult[2]}</h6>
            <h6 >{qrresult[3]}</h6>
            </div>
            <div className="col-sm-6" style={{display:"grid"}}>
            <div className="btn-group-vertical " style={{paddingTop:"15px"}}>
                <button onClick={assigndata} type="button" data-id="${data.id}" className="btn btn-outline-primary "  style={{padding:"0px", fontSize:"20px", float:"right", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginBottom:"17px", }}>Assign {assignvalue}<BiCheck style={{marginBottom:"1px"}} size="1.5em"/></button>
                <button onClick={handleskip} type="button" data-id="${data.id}" className="btn btn-outline-warning "  style={{padding:"0px", fontSize:"20px", float:"right", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginBottom:"17px", }}>{skip.text}{skip.icon}</button>
                <button onClick={backtoscanner} type="button" data-id="${data.id}" className="btn btn-outline-danger "   style={{padding:"0px", fontSize:"20px", float:"right", borderRadius:"5px",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginBottom:"10px",}}>Reject<MdBlock style={{marginBottom:"1px"}} size="1.2em"/></button>
            </div>
            </div>
            </div>
        
        
    }
        
        backbutton = null;
    }
    
    const hidemodal = () => {
        let modal1 = document.getElementById("myModal1");
        modal1.style.display = "none";
    }
    
    
    return(
        <>
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 mt-4"> </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mt-3 mx-auto ">
                {backbutton}

                <div id="insertmsg" class=" insertmsg" align="center"><h5>Data Inserted Successfully..</h5></div>
                <div id="deletemsg" class=" deletemsg" align="center"><h5>Data Deleted Successfully..</h5></div>
                <br></br>
                <div className="container">
                <div class="container" align="left">
                    <div className="col-12">
                        {qrreader}
                    </div>
                <div className="py-2" id="con" align="left">
                    {resultcomponent}
                    
                </div>
                </div>
                </div>

                <div class="container py-2" id="con1" align="left">
                <div className="row " id= "nothing"  style={{padding:"10px", marginTop:"5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginLeft:"0px", marginRight:"0px"}}>
                    <div className="col-sm-12" id="signonid1" >
                    <h3 style={{display: "block", color:"#27ae60", fontWeight:"500"}}>{location.state.data.eventname}</h3>
                    <h5 style={{display: "block"}}><span style={{color:"red", fontWeight:"500",marginBottom:"35px"}}>Date: </span>{location.state.data.date} </h5>
                    <h5 style={{display: "block"}}><span style={{color:"red", fontWeight:"500",marginBottom:"35px"}}>Total Competitors: </span>
                    {
                        // officials !== undefined 
                        // ? officials.map(x => {
                        //     return location.state.data.id === x.id 
                        //     ? x.competitors 
                        //     : null})
                        // : null
                        comp
                    }
                    
                    </h5>
                        
                    </div>
                    
                </div>
                <div className="col-sm-12" align="left" style={{padding:"10px", marginTop:"10px"}}>
                        <button onClick={handleskip} type="button" className="btn btn-outline-primary" id="skipbtn"  style={{float:"right",fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius:"5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", marginBottom:"5px"}}>{skip.text}{skip.icon}<i className="fa fa-step-forward"></i></button>
                        
                        <h4 style={{display:"inline-block"}}>Next race</h4>
                        <h4>number to</h4>
                        <h4>issue :</h4>
                        <h2>{assignvalue}</h2>
    

                        <h1 id="raceno"></h1>
                        <button onClick={goBack} type="button" className="btn btn-outline-success"  style={{fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Finish <FaSignOutAlt style={{marginBottom:"1px"}} size="1em"/></button>
                    </div>
                </div>
                
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 mt-4"> </div>
                <div onClick={
                    hidemodal
                } id="myModal1" class="modal">

                    <div class="modal-content maincontainer">
                        <div class="row">
                            <div class="col-sm-12" align="left">
                                <span class="close"  >&times;</span>
                                <h3 style={{textAlign:"center"}}>Already Scanned</h3>
                                
                                <h3 style={{textAlign:"center"}}>Race number: {racenoo}</h3>
                                <hr />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm-12">

                                
            </div>
        </div>
    </div>
</div>

            
        </>
    )
}


export default Eventqrscanner;