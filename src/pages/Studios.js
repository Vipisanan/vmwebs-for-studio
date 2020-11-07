import React , {Component} from 'react';
import './style/component.css'
import Calendar from "../components/Calendar";
import moment from 'moment';
import { getSchedule } from '../services/ScheduleService';

import { chain, filter, find, max } from 'lodash';



class Studios extends Component{
    constructor(props){
        super(props);
        this.state = {
            header: [],
            timeSchedule: [],
        }
    }
    componentDidMount  = ()=>{
        try {
            const dt = getSchedule();
            console.log(dt);
        }catch(err){
            console.log(err);

            alert("error")
        }

        this.weekFormat(moment().format('YYYY-MM-DD'));
    }
    weekFormat=date=>{
        let weekData=[];
        for (let i=0; i<7; i++){
            weekData.push(moment(date).add(i, 'day').format('YYYY-MM-DD'))
        }

        this.setState(state=>{return{header:weekData}},()=>this.dataWithTime())
    }
    dataWithTime =()=>{
        const {header} =this.state;
        let dateWithTime=[];
        for (let i = 0; i <12; i++){
            const row = header.map((item, index) =>({
                dateWithTime: moment(item).add(i+8 , 'hour').format('YYYY-MM-DD HH:mm:ss'),
                status:'available'
            }));
            dateWithTime.push(row);
        }
        this.setState({timeSchedule:dateWithTime})
    }
    addSchedule=date=>{
        const {timeSchedule} =this.state;
        let dateWithTime=[];
        for (let i = 0; i <12; i++){
            const row = timeSchedule[i].map((item, index) =>({
                dateWithTime: item.dateWithTime,
                status:(item.status === 'available') ? ((item.dateWithTime === date) ? 'booking':item.status) :item.status
            }));
            dateWithTime.push(row);
        }
        this.setState({timeSchedule:dateWithTime})
    }

    removeBookingSchedule=date=>{
        const {timeSchedule} =this.state;
        let dateWithTime=[];
        for (let i = 0; i <12; i++){
            const row = timeSchedule[i].map((item, index) =>({
                dateWithTime: item.dateWithTime,
                status:(item.status === 'booking') ? ((item.dateWithTime === date) ? 'available':item.status) :item.status
            }));
            dateWithTime.push(row);
        }
        this.setState({timeSchedule:dateWithTime})
    }
    render() {
        const {header ,timeSchedule} = this.state
        return (
            <div className="container">
                <div className="booking-steps-wrapper">
                    <div className="container">
                        <div className="row">
                            <div className=" col-md-4">
                                <div className="booking-step-wrapper date-time-step  active">
                                    <div className="icon"></div>
                                    <div className="text">
                                        <div className="big">Step 01</div>
                                        <div className="small">Date &amp; Start Time</div>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-md-4">
                                <div className="booking-step-wrapper details-step">
                                    <div className="icon"></div>
                                    <div className="text">
                                        <div className="big">Step 02</div>
                                        <div className="small">Details</div>
                                    </div>
                                </div>
                            </div>
                            <div className=" col-md-4">
                                <div className="booking-step-wrapper payment-step">
                                    <div className="icon"></div>
                                    <div className="text">
                                        <div className="big">Step 03</div>
                                        <div className="small">Payment</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Calendar header={header}
                          timeSchedule={timeSchedule}
                          removeBookingSchedule={(date)=>this.removeBookingSchedule(date)}
                          addSchedule={(date)=>this.addSchedule(date)}></Calendar>
            </div>
        );
    }
}
export default Studios;
