import React,{useEffect} from "react";
import QRcode from "qrcode.react";
import {useHistory, useLocation} from "react-router-dom";
import {RiArrowLeftSLine} from "react-icons/ri";


const Riderqr = () => {

    
    
    let history = useHistory();
    let location = useLocation();

    const goBack = () => {
        history.goBack();
    }

    useEffect(()=>{console.log(location.state.data)},[location])
    let string = `${location.state.data.first_name} ${location.state.data.last_name},${location.state.data.phoneNo},${location.state.data.emergency_Contact},${location.state.data.emergency_phno},${location.state.data.team_name},${location.state.data.licensing_org},${location.state.data.license_No}`    

    return(
        <>
        <div>
            
            <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12 "> </div>
            <div className="col-lg-5 col-md-12 col-sm-12 col-xs-12 mt-3 mx-auto "> 
                        
            

                    <span className=" float-left " style={{filter: "drop-shadow(-1px 6px 3px rgba(50, 50, 0, 0.5))"}}>
                    <button  onClick={goBack} type="button" className="btn buttonarrow"  ><RiArrowLeftSLine style={{marginBottom:"1px"}} size="1.5em"/>Back</button>
                    </span>
                
                
            
            
                <br></br>
            
                <div className="container">
                <div id="deletemsg" className=" deletemsg" align="center"><h5>Data Deleted Successfully..</h5></div>
               
                

            <div className="py-2" id="con" align="left">
                {/* Card display renders here */}
                
                
                <div className="row" id="updateid" style={{padding:"10px", marginTop:"35px",boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                
                <div className="col-12 text-center">
                    <QRcode className="" value={string} size={500}/>
                    
                </div>
                
                
                            <div  className="col-sm-6">
                               
                            <h6>{location.state.data.first_name} {location.state.data.last_name}</h6>
                            
                            <h6 style={{marginBottom:"35px"}}>{location.state.data.phoneNo}</h6>
                            <h6 >{location.state.data.team_name}</h6>
                            <h6 >{location.state.data.licensing_org}</h6>
                            <h6 >{location.state.data.license_No}</h6>
                            <h5 >Emergency Contact:</h5>
                            <h6 >{location.state.data.emergency_Contact}</h6>
                            <h6 >{location.state.data.emergency_phno}</h6>
                            
                            </div>
                            <div className="col-sm-6" style={{display:"grid"}}>
                                
                            </div>
                </div>

        
                
            </div>
        
                </div>
            </div>
        </div>
    
        <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12"> </div> 

        <div id="myModal2" className="modal">
            <div className="modal-content maincontainer">
                <div className="row">
                    <div className="col-sm-12" align="left">
                        <input type="hidden" id="modalcompid" />
                        <span className="close" >&times;</span>
                        <h3>Delete License</h3>
                        <hr />
                        <h5>Are you sure?</h5>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        
                            <button  type="button" className="btn btn-outline-danger" style={{float:"left", fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius: "5px" , boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Delete</button>
                    
                            <button type="button" className="btn btn-outline-primary" style={{float:"right", fontSize: "calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)))", borderRadius:"5px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>Keep</button>
                            
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default Riderqr;