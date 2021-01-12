import React, {Component} from 'react';
// import './style/chip.css';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import moment from "moment";
import {isEqual} from "lodash";

const styles=theme =>({
    chip : {
        display: 'inlineBlock',
        padding: '0 10px 0 10px',
        // height: '36px',
        fontSize: '16px',
        lineHeight: '40px',
        borderRadius: '25px',
        width: '124px',
        backgroundColor:props => chipBgColor(props.status),
        // borderColor: props => chipColor(props.label),
        color: props => chipColor(props.status),
        textTransform: props => (props.uppercase ? 'uppercase' : 'capitalize'),
        '&>:img':{
                float: 'left',
                margin:' 0 10px 0 -25px',
                height: '50px',
                width: '50px',
                borderRadius: '50%'
            }
    },
    closebtn : {
    paddingLeft: '10px',
    color: '#888',
    fontWeight: 'bold',
    float: 'right',
    fontSize: '20px',
    cursor: 'pointer',
        '&>: hover':{
            color: '#000'
        }
    }
});
const chipBgColor = type =>{
    switch (type.toUpperCase()) {
        case 'AVAILABLE':
            return 'rgba(6,196,179,0.12)';
        case 'HOLIDAYS':
            return 'rgba(255,193,108,0.12)';
        case 'BOOKING':
            return 'rgba(255,122,122,0.12)';
        case 'BOOKED':
            return 'rgba(6,196,179,0.22)';

        default:
            return '#ff357d';
    }
}
const chipColor = type => {
    switch (type.toUpperCase()) {
        case 'AVAILABLE':
            return '#06C4B3';
        case 'HOLIDAYS':
            return '#ffc16c';
        case 'BOOKING':
            return '#FF7A7A';
        case 'BOOKED':
            return '#06c4b3';

        default:
            return '#f8f1f1';
    }
};
// class CustomChips extends Component
const CustomChips = props=>{
    const {classes ,status,dateWithTime ,onCloseChips, onClickChip ,item} = props;

    const handleClick=()=>{
        if(onClickChip){
            props.onClickChip(item);
        }
    }
    const handleClose=()=>{
       if(onCloseChips){
           onCloseChips(item);
        }
    }

       return (
           <div className={classes.chip}>
               {console.log(status)}
               {isEqual(status , 'holidays') && (
                   <p style={{margin: 0}} >
                       HOLIDAY
                   </p>
               )}
               {isEqual(status , 'available') && (
                   <p style={{margin: 0 , cursor: 'pointer'}} onClick={handleClick}>
                       {moment(dateWithTime).format('hh:mm:A')}
                   </p>
               )}
               {isEqual(status , 'booking') && (
                   <p style={{margin: 0 }}>
                       {moment(dateWithTime).format('hh:mm:A')}
                       <span className={classes.closebtn}
                             onClick={handleClose} >&times;</span>
                   </p>
               )}
               {isEqual(status , 'booked') && (
                   <p style={{margin:0 ,textDecoration: 'line-through'}}>
                       {moment(dateWithTime).format('hh:mm:A')}
                   </p>
               )}
           </div>
       )
}

CustomChips.defaultProps={
    status:'available',
    variant:"outline",
    upperCase:false,
    isCloseBtn:false,
}
CustomChips.propTypes={
    label:PropTypes.string,
    variant:PropTypes.string,
    upperCase:PropTypes.bool,
    isCloseBtn:PropTypes.bool,
}
export default withStyles(styles)(CustomChips);
