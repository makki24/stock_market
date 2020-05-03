import React, {Component} from "react";
import {baseUrl} from "../shared/baseUrl";
class HomeComponent extends Component
{
    constructor() {
    super();
    this.style = {
       color: "#80CAEF",
       fontSize: "45px",
       textAlign: "",
       background:"#1B3C65",
       fontFamily:'verdana',
       fontWeight:'bold'
    };
    this.style2={
        color: "#163B65",
       fontSize: "35px",
       textAlign: "",
       background: '#7ACCF1',
       fontFamily:'verdana',
       fontWeight:'bold',
       alignItems:'center'
    }
    this.smstyle2={
        color: "#163B65",
       fontSize: "25px",
       textAlign: "",
       background: '#7ACCF1',
       fontFamily:'verdana',
       fontWeight:'bold',
       alignItems:'center'
    };
    this.smstyle={
        color: "#80CAEF",
       fontSize: "35px",
       textAlign: "",
       background: '#1B3C65',
       fontFamily:'verdana',
       fontWeight:'bold',
       alignItems:'center'
    }
  }
    render()
    {
        return(
            <div>
                <div className={'container2 d-none d-md-block'}>
                    <div className={'row p-3 p-md-5'} style={this.style}>
                        <div className={'col-6 offset-md-2 col-md-4'}>
                            WHY CHOOSE MIND TRADE?
                        </div>
                    </div>
                    <div className={'row p-3 p-md-3'} style={this.style2}>
                        <div className={'col-5 col-md-3 offset-md-2'}>
                            WE CARE FOR YOUR TRADE
                        </div>
                        <div className={'col-6 col-md-3 offset-md-2'}>
                            <img src={baseUrl+'images/heartInhand.jpeg'} className={'homePageLogo'} alt={''}/>
                        </div>
                    </div>
                    <div className={'row p-3 p-md-2'} style={{...this.style2,background:'#BAC4D0',color:'#1E3A5F'}}>
                        <div className={'col-5 col-md-3 offset-md-2'}  >
                            <img src={baseUrl+'images/bulb.jpeg'} className={'homePageLogo'} alt={''}/>
                        </div>
                        <div className={'col-5 col-md-3  offset-md-2'}>
                            GET PERSONALIZED SUGGESTIONS FROM INDUSTRY EXPERTS
                        </div>
                    </div>
                    <div className={'row p-3 p-md-2'} style={{...this.style2,background:'#7ACCF1',color:'#143A67'}}>
                        <div className={'col-5 col-md-3  offset-md-2'}>
                            GET BROKERS WITH SPECIALIZED EXPERIENCE IN INDUSTRY
                        </div>
                        <div className={'col-5 col-md-3 offset-md-2'}  >
                            <img src={baseUrl+'images/shakeHand.jpeg'} className={'homePageLogo'} alt={''}/>
                        </div>
                    </div>
                    <div className={'row p-3 p-md-3'} style={{...this.style2,background:'#BAC4D0',color:'#223C5D'}}>
                        <div className={'col-5 col-md-3 offset-md-2'}  >
                            <img src={baseUrl+'images/diamond.jpeg'} className={'homePageLogo'} alt={''}/>
                        </div>
                        <div className={'col-5 col-md-4  offset-md-2'}>
                            WE PROVIDE STATE OF THE ART SERVICES WITH ON DEMAND CUSTOMER SERVICE
                        </div>
                    </div>
                    <div className={'row p-3 p-md-3'} style={{...this.style2,background:'#1B3C65',color:'#78C1E2',fontSize:'20px'}}>
                        <div className={'col-5 col-md-5 offset-md-2'}>
                            "TRADING IS GAME OF MIND AND YOU NEED LION'S HEART TO PLAY IT"<br /><br/>
                             BY SHUBHAM AND SYED<br/>
                             FOUNDERS MIND TRADE INC.
                        </div>
                    </div>
                </div>
                <div className={'container2 d-block d-md-none'}>
                    <div className={'row p-3 p-md-5'} style={this.smstyle}>
                        <div className={'col-10 '}>
                            WHY CHOOSE MIND TRADE?
                        </div>
                    </div>
                    <div className={'row p-2 p-md-3'} style={{...this.smstyle2}}>
                        <div className={'col-7'}>
                            WE CARE FOR YOUR TRADE
                        </div>
                        <div className={'col-5'}>
                            <img src={baseUrl+'images/heartInhand.jpeg'} className={'smhomePageLogo'} alt={''}/>
                        </div>
                    </div>
                    <div className={'row p-2'} style={{...this.smstyle2,background:'#BAC4D0',color:'#1E3A5F',fontSize:'20px'}}>
                        <div className={'col-5'}  >
                            <img src={baseUrl+'images/bulb2.jpeg'} className={'smhomePageLogo'} alt={''}/>
                        </div>
                        <div className={'col-6'}>
                            GET PERSONALIZED SUGGESTIONS FROM INDUSTRY EXPERTS
                        </div>
                    </div>
                    <div className={'row p-2'} style={{...this.smstyle2,background:'#7ACCF1',color:'#143A67',fontSize:'20px'}}>
                        <div className={'col-6 col-md-3  offset-md-2'}>
                            GET BROKERS WITH SPECIALIZED EXPERIENCE IN INDUSTRY
                        </div>
                        <div className={'col-5 col-md-3 offset-md-2'}  >
                            <img src={baseUrl+'images/shakeHand.jpeg'} className={'smhomePageLogo'} alt={''}/>
                        </div>
                    </div>
                    <div className={'row p-2'} style={{...this.smstyle2,background:'#BAC4D0',color:'#223C5D',fontSize:'20px'}}>
                        <div className={'col-5 '}  >
                            <img src={baseUrl+'images/diamond.jpeg'} className={'smhomePageLogo'} alt={''}/>
                        </div>
                        <div className={'col-7 '}>
                            WE PROVIDE STATE OF THE ART SERVICES WITH ON DEMAND CUSTOMER SERVICE
                        </div>
                    </div>
                    <div className={'row p-3 '} style={{...this.smstyle2,background:'#1B3C65',color:'#78C1E2',fontSize:'15px'}}>
                        <div className={'col-12 '}>
                            "TRADING IS GAME OF MIND AND YOU NEED LION'S HEART TO PLAY IT"<br /><br/>
                             BY SHUBHAM AND SYED<br/>
                             FOUNDERS MIND TRADE INC.
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent;