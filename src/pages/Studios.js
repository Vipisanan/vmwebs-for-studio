import React, {Component} from 'react';
import './style/component.css'
import Calendar from "../components/Calendar";
import moment from 'moment';
import {bookingSchedule, getSchedule, userRegister} from '../services/ScheduleService';

import {chain, isEmpty} from 'lodash';
import Cart from "../components/Cart";
import UserForm from "../components/UserForm";
import InstaGallery from "../components/InstaGallery";
import {getInstaFeed} from "../services/InstaService";


const initialSchedules = [
    {
        "id": "1",
        "std_user_id": "1",
        "schedule": "2020-11-08 08:00:00",
        "created_at": "2020-10-26 06:37:20"
    },
    {
        "id": "1",
        "std_user_id": "1",
        "schedule": "2020-11-11 08:00:00",
        "created_at": "2020-10-26 06:37:20"
    },
    {
        "id": "2",
        "std_user_id": "6",
        "schedule": "2020-11-09 08:00:00",
        "created_at": "2020-11-06 14:42:02"
    },
    {
        "id": "3",
        "std_user_id": "6",
        "schedule": "2020-11-08 09:00:00",
        "created_at": "2020-11-08 09:04:51"
    }
]

class Studios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: [],
            timeSchedule: [],
            bookedSchedule: [],
            cartHeader: ['#', 'Date', 'Room', 'Time Slot', 'Price', 'Action'],
            isOpenForm:false,
            instaFeed:[]
        }
    }

    componentDidMount = async () => {
        try {
            const dt = getSchedule();
        } catch (err) {
        }
        const instaFeed = await getInstaFeed();
        this.weekFormat(moment().format('YYYY-MM-DD'));
        this.setState({instaFeed});
    }

    weekFormat = date => {
        let weekData = [];
        for (let i = 0; i < 7; i++) {
            weekData.push(moment(date).add(i, 'day').format('YYYY-MM-DD'))
        }

        this.setState(state => {
            return {header: weekData}
        }, () => this.dataWithTime())
    }

    dataWithTime = () => {
        const {header} = this.state;
        let dateWithTime = [];
        for (let i = 0; i < 12; i++) {
            const row = header.map((item, index) => ({
                dateWithTime: moment(item).add(i + 8, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                status: 'available'
            }));
            dateWithTime.push(row);

        }
        //checking which slot is booked
        let merged = [];
        let allInOne = [];
        dateWithTime.forEach(item=>{
            for (let i = 0; i <7; i++){
                allInOne.push(item[i]);
            }
        })
        console.log(allInOne);
        let test=[];
        initialSchedules.forEach(init=>{
          merged = allInOne.map(item=>({
            ...item,
              date:moment(item.dateWithTime).format('YYYY-MM-DD'),
              status: (init.schedule === item.dateWithTime) ? 'booked' : 'available'
            }))
            test.push(merged);
        });
        console.log(test);
        //format again by 7
        // let group = [];
        // let r1 =merged.splice(0,7);
        // let r2 =merged.splice(0,7);
        // let r3 =merged.splice(0,7);
        // let r4 =merged.splice(0,7);
        // let r5 =merged.splice(0,7);
        // let r6 =merged.splice(0,7);
        // let r7 =merged.splice(0,7);
        // let r8 =merged.splice(0,7);
        // let r9 =merged.splice(0,7);
        // let r10 =merged.splice(0,7);
        // let r11 =merged.splice(0,7);
        // let r12 =merged.splice(0,7);
        // group.push(r1);
        // group.push(r2);
        // group.push(r3);
        // group.push(r4);
        // group.push(r5);
        // group.push(r6);
        // group.push(r7);
        // group.push(r8);
        // group.push(r9);
        // group.push(r10);
        // group.push(r11);
        // group.push(r12);

        // console.log(dateWithTime);
        this.setState({timeSchedule: dateWithTime})
    }

    addSchedule = date => {
        const {timeSchedule, bookedSchedule} = this.state;
        let dateWithTime = [];
        let addSchedule = []
        for (let i = 0; i < 12; i++) {
            const row = timeSchedule[i].map((item, index) => ({
                dateWithTime: item.dateWithTime,
                status: (item.status === 'available') ? ((item.dateWithTime === date) ? 'booking' : item.status) : item.status
            }));
            dateWithTime.push(row);
        }
        dateWithTime.forEach(item => {
            const schedule = item.filter(item => item.status === 'booking').map((item, index) => ({
                date: moment(item.dateWithTime).format('YYYY-MM-DD'),
                dateWithTime: item.dateWithTime,
                room: 'Willium',
                price: 95
            }));
            addSchedule.push(schedule)
        })
        const addedDate = addSchedule.filter(item => !isEmpty(item));
        let allSelectedData = [];
        addedDate.forEach(item => {
            item.forEach(sItem => {
                allSelectedData.push(sItem);
            })
        })

        const groupByDate = chain(allSelectedData).groupBy("date").map((value, key) => ({
            date: key,
            data: value,
            discount: this.addDiscount(value.length),
            price: value[0].price
        })).value();
        console.log(groupByDate);
        this.setState({timeSchedule: dateWithTime, bookedSchedule: groupByDate})
    }

    addDiscount = (dis) => {
        switch (dis) {
            case 1:
                return 4;
            case 2:
                return 5;
            case 3:
                return 8;
            case 4:
                return 10;
            default :
                return 13;
        }
    }

    removeBookingSchedule = date => {
        const {timeSchedule} = this.state;
        let dateWithTime = [];
        let addSchedule = []
        for (let i = 0; i < 12; i++) {
            const row = timeSchedule[i].map((item, index) => ({
                dateWithTime: item.dateWithTime,
                status: (item.status === 'booking') ? ((item.dateWithTime === date) ? 'available' : item.status) : item.status
            }));
            dateWithTime.push(row);
        }

        dateWithTime.forEach(item => {
            const schedule = item.filter(item => item.status === 'booking').map((item, index) => ({
                date: moment(item.dateWithTime).format('YYYY-MM-DD'),
                dateWithTime: item.dateWithTime,
                room: 'Willium',
                price: 95
            }));
            addSchedule.push(schedule)
        })
        const addedDate = addSchedule.filter(item => !isEmpty(item));
        let allSelectedData = [];
        addedDate.forEach(item => {
            item.forEach(sItem => {
                allSelectedData.push(sItem);
            })
        })

        const groupByDate = chain(allSelectedData).groupBy("date").map((value, key) => ({
            date: key,
            data: value,
            discount: this.addDiscount(value.length)
        })).value();
        console.log(groupByDate);
        this.setState({timeSchedule: dateWithTime, bookedSchedule: groupByDate})
    }

    goToFinalStep=()=>{
        this.setState({isOpenForm:true})
    }

    submitForm = async data=>{
        const {bookedSchedule} = this.state;
        let schedule=[];
        bookedSchedule.forEach((scheduleData , i) =>{
            scheduleData.data.forEach(item =>{
                schedule.push(item.dateWithTime);
            });
        })
        try {
            await userRegister(data);
            let promises = [];
            if ((data.name && !isEmpty(schedule))) {
                const createPromises = schedule.map(async entry => {
                    return await bookingSchedule({schedule:entry , name:data.name});
                });
                promises = [...promises, ...createPromises];
            }
            await Promise.all(promises);
        }catch (e) {

        }

    }
    render() {
        const {header, timeSchedule, bookedSchedule, cartHeader ,isOpenForm ,instaFeed} = this.state
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
                {!isEmpty(bookedSchedule) && !isOpenForm && (
                    <Cart
                        header={cartHeader}
                        data={bookedSchedule}
                        goToFinalStep={()=>this.goToFinalStep()}
                        removeTimeSlot={(date) => this.removeBookingSchedule(date)}
                    >
                    </Cart>
                )}
                {!isOpenForm && (
                    <Calendar header={header}
                              timeSchedule={timeSchedule}
                              removeBookingSchedule={(date) => this.removeBookingSchedule(date)}
                              addSchedule={(date) => this.addSchedule(date)}></Calendar>
                )}

                {isOpenForm && (
                    <UserForm getFormValue={(data)=>this.submitForm(data)}></UserForm>
                )}
                {!isEmpty(instaFeed) && (
                    <InstaGallery instaFeed={instaFeed.data}></InstaGallery>
                )}
            </div>
        );
    }
}
//{
//
//     "email": "vipi@gFromPostman",
//     "photographer_name": "vipi",
//     "name": "newUser",
//     "shoot_type": "shoot_type JSON body passed.",
//     "note": "note FromPostman body passed."
//
// }

export default Studios;
