import React, {Component} from 'react';
import './style/component.css'
import CalendarSlot from "../components/CalendarSlot";
import moment from 'moment';
import {bookingSchedule, getAllSchedule, userRegister} from '../services/ScheduleService';
import {chain, isEmpty, isEqual} from 'lodash';
import Cart from "../components/Cart";
import UserForm from "../components/UserForm";
import InstaGallery from "../components/InstaGallery";
import Swal from 'sweetalert2';
import '../../node_modules/animate.css';
import {getAllStudios} from "../services/RoomService";


const initialSchedules = [
    {
    "id": "2",
    "studio_id": "1",
    "booking_id": "1",
    "type": "full",
    "slot": "2020-11-19 11:00:00",
    "created_at": "2020-11-12 00:00:00"
}, {
    "id": "3",
    "studio_id": "1",
    "booking_id": "1",
    "type": "full",
    "slot": "2020-11-19 12:00:00",
    "created_at": "2020-11-12 00:00:00"
}, {
    "id": "4",
    "studio_id": "1",
    "booking_id": "1",
    "type": "full",
    "slot": "2020-11-19 13:00:00",
    "created_at": "2020-11-12 00:00:00"
}, {
    "id": "5",
    "studio_id": "1",
    "booking_id": "1",
    "type": "full",
    "slot": "2020-11-19 01:00:00",
    "created_at": "2020-11-12 00:00:00"
}, {
    "id": "6",
    "studio_id": "1",
    "booking_id": "1",
    "type": "full",
    "slot": "2020-11-19 14:00:00",
    "created_at": "2020-11-12 00:00:00"
}, {
    "id": "7",
    "studio_id": "1",
    "booking_id": "1",
    "type": "full",
    "slot": "2020-11-19 18:00:00",
    "created_at": "2020-11-12 00:00:00"
}]

class Studios extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: [],
            timeSchedule: [],
            bookedSchedule: [],
            cartHeader: ['#', 'Date', 'Room', 'Time Slot', 'Price', 'Action'],
            isOpenForm: false,
            instaFeed: [],
            date: moment(),
            studios: [],
            studio: {
                "id": "2",
                "name": "Brich",
                "status": "active",
                "type": "studio",
                "max_reservation": "1",
                "tax": "12",
                "price": "98",
                "created_at": "2020-11-12 00:00:00"
            },
            busySlots: [],
        }
    }

    componentDidMount = async () => {
        const {date} = this.state;
        try {

        } catch (err) {
        }
        const roomsStudios = await getAllStudios();
        this.weekFormat(moment(date).format('YYYY-MM-DD'));
        this.setState({studios:roomsStudios})
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

    changeDate = date => {
        this.setState({date: date});
        this.weekFormat(moment(date).format('YYYY-MM-DD'));

    }

    dataWithTime = async () => {
        const {header} = this.state;
        let dateWithTime = [];
        for (let i = 0; i < 12; i++) {
            const row = header.map((item, index) => ({
                dateWithTime: moment(item).add(i + 8, 'hour').format('YYYY-MM-DD HH:mm:ss'),
                status: 'available'
            }));
            dateWithTime.push(row);
        }
        const slots = await getAllSchedule();
        this.setState(state => {
            return {
                timeSchedule: dateWithTime,
                busySlots:slots
            }
        }, () => this.bookedSlotTimeMapping());
    }


    bookedSlotTimeMapping = async () => {
        let {timeSchedule, busySlots} = this.state;
        let newColSchedule = [];
        busySlots.forEach(slot => {
            timeSchedule.forEach(schedule => {
                const XY = schedule.map((item, i) => ({
                    ...item,
                    date: moment(item.dateWithTime).format('YYYY-MM-DD'),
                    status: (isEqual(slot.slot, item.dateWithTime) && item.status !== 'booked') ? 'booked' : item.status
                }));
                // console.log(XY);
                newColSchedule.push(XY);
            });
            timeSchedule = newColSchedule;
            newColSchedule = [];
        });

        // console.log(newColSchedule);
        console.log(timeSchedule);
        await this.setState(state => {
            return {timeSchedule: timeSchedule}
        }, () => {
            // console.log(this.state.timeSchedule);
        });
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

        Swal.fire({
            toast: true,
            position: 'top',
            icon: 'success',
            title: `Added ${moment(date).format('YYYY-MM-DD HH:mm:A')} slot to cart.`,
            showClass: {
                popup: 'animate__animated animate__fadeInDown',
                // icon: '',

            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp',
            },
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            width: 'auto',
            padding: '14px',

        });
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

    goToFinalStep = () => {
        this.setState({isOpenForm: true})
    }

    submitForm = async data => {
        const {bookedSchedule} = this.state;
        let schedule = [];
        bookedSchedule.forEach((scheduleData, i) => {
            scheduleData.data.forEach(item => {
                schedule.push(item.dateWithTime);
            });
        })
        try {
            await userRegister(data);
            let promises = [];
            if ((data.name && !isEmpty(schedule))) {
                const createPromises = schedule.map(async entry => {
                    return await bookingSchedule({schedule: entry, name: data.name});
                });
                promises = [...promises, ...createPromises];
            }
            await Promise.all(promises);
        } catch (e) {

        }

    }

    render() {
        const {
            header,
            timeSchedule,
            bookedSchedule,
            cartHeader,
            isOpenForm,
            instaFeed,
            date,
            studios,
            studio
        } = this.state
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
                        goToFinalStep={() => this.goToFinalStep()}
                        removeTimeSlot={(date) => this.removeBookingSchedule(date)}
                    >
                    </Cart>
                )}
                {!isOpenForm && (
                    <CalendarSlot header={header}
                                  studios={studios}
                                  selectedStudio={studio}
                                  timeSchedule={timeSchedule}
                                  changeDate={(date) => this.changeDate(date)}
                                  currentDate={moment(date).format('YYYY-MM-DD')}
                                  removeBookingSchedule={(date) => this.removeBookingSchedule(date)}
                                  addSchedule={(date) => this.addSchedule(date)}></CalendarSlot>
                )}

                {isOpenForm && (
                    <UserForm getFormValue={(data) => this.submitForm(data)}></UserForm>
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
