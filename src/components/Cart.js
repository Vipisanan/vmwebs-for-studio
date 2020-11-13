import React from 'react';
import moment from 'moment';
import '../pages/style/calendar.css'

const Cart = props => {
    const {header, data, removeTimeSlot, goToFinalStep} = props;
    const getSubTotal = (item) => {
        return item.data.length * item.data[0].price;
    }
    const getDiscount = (item) => {
        return (item.data.length * item.data[0].price) * (item.discount / 100);
    }
    const getNetTotal = () => {
        let total = 0;
        data.forEach(item => {
            total += (getSubTotal(item) - getDiscount(item));
        })
        return total;
    }

    return (
        <div className="table-responsive-lg">
            <br/>
            <table className="table table-sm table-striped">
                <thead>
                <tr>
                    {header.map((item, index) => {
                        return (<th scope="col">
                            {item}
                        </th>)
                    })}
                </tr>
                </thead>

                {data.map((studio, index) => {
                    return studio.map((day, inDay) => {
                        console.log(day);
                           return (
                               <tbody>
                               {
                                   day.data.map((slot, sIndex) => {
                                       return (
                                           <tr>
                                               <td>{sIndex + 1}</td>
                                               <td>{slot.date}</td>
                                               <td>{slot.studio[0].name}</td>
                                               <td>{moment(slot.slot).format('HH:mm:A')}</td>
                                               <td>$ {slot.studio[0].price}</td>
                                               <td>
                                                   <p onClick={() => removeTimeSlot(slot.slot , slot.studio[0].id)}
                                                      style={{textAlign: 'center', color: 'red', fontWeight: 'bold'}}>X</p>
                                               </td>
                                           </tr>
                                       )
                                   })
                               }
                               <tr>
                                   <td>Discount</td>
                                   <td></td>
                                   <td></td>
                                   <td></td>
                                   <td>{day.data[0].studio_id}</td>
                                   <td>-</td>
                               </tr>
                               <tr>
                                   <td>Total</td>
                                   <td></td>
                                   <td></td>
                                   <td></td>
                                   <td>{}</td>
                                   <td>-</td>
                               </tr>
                               </tbody>

                               );

                        })

                })}


                {/*{data.map((item, i) => {*/}
                {/*    return (*/}
                {/*        <tbody>*/}
                {/*        {item.data.map((single, index) =>{*/}
                {/*            return (*/}
                {/*                <tr>*/}
                {/*                    <td>{index+1}</td>*/}
                {/*                    <td>{single.date}</td>*/}
                {/*                    <td>{single.room}</td>*/}
                {/*                    <td>{moment(single.dateWithTime).format('HH:mm:A')}</td>*/}
                {/*                    <td>$ {single.price}</td>*/}
                {/*                    <td>*/}
                {/*                        <p onClick={() => removeTimeSlot(single.dateWithTime)} style={{textAlign:'center' , color: 'red', fontWeight: 'bold'}}>X</p>*/}
                {/*                    </td>*/}
                {/*                </tr>*/}
                {/*            )*/}
                {/*        })}*/}

                {/*//             <tr>*/}
                {/*//                 <td>Sub Total</td>*/}
                {/*//                 <td></td>*/}
                {/*//                 <td></td>*/}
                {/*                <td></td>*/}
                {/*                <td style={{fontWeight: 'bold'}}>$ {getSubTotal(item)}</td>*/}
                {/*                <td></td>*/}
                {/*            </tr>*/}
                {/*        <tr>*/}
                {/*            <td>Discount {item.discount}%</td>*/}
                {/*            <td></td>*/}
                {/*            <td></td>*/}
                {/*            <td></td>*/}
                {/*            <td style={{fontWeight: 'bold'}}>{getDiscount(item).toPrecision(2)}</td>*/}
                {/*            <td></td>*/}
                {/*        </tr>*/}

                {/*        </tbody>*/}

                {/*//     );*/}
                {/*// })}*/}
                {/*// <tbody>*/}
                {/*// <br/>*/}
                {/*// <tr>*/}
                {/*//     <td style={{fontWeight: 'bold'}}>Total</td>*/}
                {/*//     <td></td>*/}
                {/*    <td></td>*/}
                {/*    <td></td>*/}
                {/*//     <td style={{fontWeight: 'bold'}}>{getNetTotal().toPrecision(3)}</td>*/}
                {/*//     <td></td>*/}
                {/*// </tr>*/}
                {/*// <tr>*/}
                {/*    <td style={{fontWeight: 'bold'}}>Tax (13 %)</td>*/}
                {/*    <td></td>*/}
                {/*    <td></td>*/}
                {/*    <td></td>*/}
                {/*    <td style={{fontWeight: 'bold'}}>?</td>*/}
                {/*    <td></td>*/}
                {/*</tr>*/}
                {/*</tbody>*/}
                <div className="container" style={{textAlign: 'center'}}>
                    <br/>
                    <button type="button" className="btn btn-success"
                            onClick={() => {
                                goToFinalStep() && goToFinalStep()
                            }}>Proceed Next
                    </button>

                </div>

            </table>
        </div>
    );
}
export default Cart;
