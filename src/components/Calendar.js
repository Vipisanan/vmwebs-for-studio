import React from 'react';
import moment from 'moment';
import Moment from "react-moment";
import '../pages/style/calendar.css'

const Calendar = props => {
    const {header, timeSchedule, addSchedule, removeBookingSchedule} = props;
    return (
        <div>
            <br/>
            <table className="table">
                <thead>
                <tr>
                    {header.map((item, index) => {
                        return (<th scope="col">
                            <Moment format="ddd MMM  DD" withTitle>
                                {moment(item)}
                            </Moment>
                        </th>)
                    })

                    }
                </tr>
                </thead>
                <tbody>
                {timeSchedule.map((item, index) => {
                    return (<tr key={index}>
                        <td style={{minHeight: '10px!important', overflow:'hidden'}}>
                            <div className="row">
                                <p className="col-8" style={{
                                    fontWeight: (item[0].status === 'available') ? 'normal' : 'bold',
                                    color: (item[0].status === 'available') ? 'black' : 'green',
                                    textDecorationLine:(item[0].status === 'booked') ? 'line-through' : 'none',
                                    cursor:'pointer'
                                }}
                                   onClick={() => {
                                       addSchedule(item[0].dateWithTime) && addSchedule(item[0].dateWithTime)
                                   }}
                                >
                                    {moment(item[0].dateWithTime).format('HH:mm:A')}
                                </p>
                                {(item[0].status === 'booking') && (
                                    <p className="col-4" style={{color: 'red', fontWeight: 'bold' ,cursor:'pointer'}}
                                       onClick={() => removeBookingSchedule(item[0].dateWithTime) && removeBookingSchedule(item[0].dateWithTime)}>X</p>
                                )}
                            </div>
                        </td>
                        <td>
                            <div className="row">
                                <p className="col-8" style={{
                                    fontWeight: (item[1].status === 'available') ? 'normal' : 'bold',
                                    color: (item[1].status === 'available') ? 'black' : 'green',
                                    cursor:'pointer'
                                }}
                                   onClick={() => {
                                       addSchedule(item[1].dateWithTime) && addSchedule(item[1].dateWithTime)
                                   }}
                                >
                                    {moment(item[1].dateWithTime).format('HH:mm:A')}
                                </p>
                                {(item[1].status === 'booking') && (
                                    <p className="col-4" style={{color: 'red', fontWeight: 'bold' ,cursor:'pointer'}}
                                       onClick={() => removeBookingSchedule(item[1].dateWithTime) && removeBookingSchedule(item[1].dateWithTime)}>X</p>
                                )}
                            </div>
                        </td>

                        <td>
                            <div className="row">
                                <p className="col-8" style={{
                                    fontWeight: (item[2].status === 'available') ? 'normal' : 'bold',
                                    color: (item[2].status === 'available') ? 'black' : 'green',
                                    cursor:'pointer'
                                }}
                                   onClick={() => {
                                       addSchedule(item[2].dateWithTime) && addSchedule(item[2].dateWithTime)
                                   }}
                                >
                                    {moment(item[2].dateWithTime).format('HH:mm:A')}
                                </p>
                                {(item[2].status === 'booking') && (
                                    <p className="col-4" style={{color: 'red', fontWeight: 'bold' ,cursor:'pointer'}}
                                       onClick={() => removeBookingSchedule(item[2].dateWithTime) && removeBookingSchedule(item[2].dateWithTime)}>X</p>
                                )}
                            </div>
                        </td>

                        <td>
                            <div className="row">
                                <p className="col-8" style={{
                                    fontWeight: (item[3].status === 'available') ? 'normal' : 'bold',
                                    color: (item[3].status === 'available') ? 'black' : 'green',
                                    cursor:'pointer'
                                }}
                                   onClick={() => {
                                       addSchedule(item[3].dateWithTime) && addSchedule(item[2].dateWithTime)
                                   }}
                                >
                                    {moment(item[3].dateWithTime).format('HH:mm:A')}
                                </p>
                                {(item[3].status === 'booking') && (
                                    <p className="col-4" style={{color: 'red', fontWeight: 'bold' ,cursor:'pointer'}}
                                       onClick={() => removeBookingSchedule(item[3].dateWithTime) && removeBookingSchedule(item[2].dateWithTime)}>X</p>
                                )}
                            </div>
                        </td>

                        <td>
                            <div className="row">
                                <p className="col-8" style={{
                                    fontWeight: (item[4].status === 'available') ? 'normal' : 'bold',
                                    color: (item[4].status === 'available') ? 'black' : 'green',
                                    cursor:'pointer'
                                }}
                                   onClick={() => {
                                       addSchedule(item[4].dateWithTime) && addSchedule(item[2].dateWithTime)
                                   }}
                                >
                                    {moment(item[4].dateWithTime).format('HH:mm:A')}
                                </p>
                                {(item[4].status === 'booking') && (
                                    <p className="col-4" style={{color: 'red', fontWeight: 'bold' ,cursor:'pointer'}}
                                       onClick={() => removeBookingSchedule(item[4].dateWithTime) && removeBookingSchedule(item[2].dateWithTime)}>X</p>
                                )}
                            </div>
                        </td>

                        <td>
                            <div className="row">
                                <p className="col-8" style={{
                                    fontWeight: (item[5].status === 'available') ? 'normal' : 'bold',
                                    color: (item[5].status === 'available') ? 'black' : 'green',
                                    cursor:'pointer'
                                }}
                                   onClick={() => {
                                       addSchedule(item[5].dateWithTime) && addSchedule(item[2].dateWithTime)
                                   }}
                                >
                                    {moment(item[5].dateWithTime).format('HH:mm:A')}
                                </p>
                                {(item[5].status === 'booking') && (
                                    <p className="col-4" style={{color: 'red', fontWeight: 'bold' ,cursor:'pointer'}}
                                       onClick={() => removeBookingSchedule(item[5].dateWithTime) && removeBookingSchedule(item[2].dateWithTime)}>X</p>
                                )}
                            </div>
                        </td>

                        <td>
                            <div className="row">
                                <p className="col-8" style={{
                                    fontWeight: (item[6].status === 'available') ? 'normal' : 'bold',
                                    color: (item[6].status === 'available') ? 'black' : 'green',
                                    cursor:'pointer'
                                }}
                                   onClick={() => {
                                       addSchedule(item[6].dateWithTime) && addSchedule(item[2].dateWithTime)
                                   }}
                                >
                                    {moment(item[6].dateWithTime).format('HH:mm:A')}
                                </p>
                                {(item[6].status === 'booking') && (
                                    <p className="col-4" style={{color: 'red', fontWeight: 'bold' ,cursor:'pointer'}}
                                       onClick={() => removeBookingSchedule(item[6].dateWithTime) && removeBookingSchedule(item[2].dateWithTime)}>X</p>
                                )}
                            </div>
                        </td>

                    </tr>);
                })}

                </tbody>
            </table>
        </div>
    );
}
export default Calendar;
