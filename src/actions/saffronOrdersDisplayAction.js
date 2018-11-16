//import axios from 'axios';
//import ENVIRONMENT_VARIABLES from '../environment.config';
import moment from 'moment';
import {
    SOD_INPROGRESS,
    SOD_NOT_SUCCESS,
    SOD_SUCCESS,
    SOD_CONNECTION_ERROR,
    SOD_RECENT_MOVE_TO_PROGRESS,
    SOD_RUNNING_LATE_MOVE_TO_PROGRESS
} from '../constants/actionTypes';

export const OrdersList = () => {
    try {
        return (dispatch) => {
            dispatch({type: SOD_INPROGRESS});
            // const token = "Bearer " + localStorage.getItem('accessToken');
            //
            // const api = {
            //     method: 'GET',
            //     headers: {'Authorization': token},
            //     url: ENVIRONMENT_VARIABLES.API_URL + "/oauths"
            // };
            // axios(api).then((response) => {
            //     if (response.status === 200) {
            //         dispatch({type: USER_SUCCESS, data: response.data});
            //     }
            // }).catch((error) => {
            //     debugger;
            //     if (error && error.response && (error.response.status === 400 || error.response.status === 403 || error.response.status === 401)) {
            //         dispatch({type: USER_CHANGE_NOT_SUCCESS, data: {error_msg: error.response.data.user_msg}});
            //     } else {
            //         dispatch({type: USER_CONNECTION_ERROR, data: {error_msg: error.message.toString()}});
            //     }
            // });

            setTimeout(function () {
                dispatch({
                    type: SOD_SUCCESS, runningOrder: [{
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }, {
                        status: "process",
                        column: "running",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "12345"
                    }], runningLate: [{
                        status: "late",
                        column: "running late",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "123"
                    }], recentOrders: [{
                        status: "waiting",
                        column: "recent orders",
                        orderTime: Date.now(),
                        orderStartTime: Date.now(),
                        orderNo: "123456"
                    }]
                });

            }, 3000);
        }
    } catch (error) {
        alert(error.message.toString());
    }
};

export const MoveToProgress = (order) => {
    try {
        return (dispatch) => {
            let column = order.column;
            //update Order from the api
            order.status = "process";
            order.column = "running";
            order.orderStartTime = Date.now();

            if (column === "running late") {
                dispatch({
                    type: SOD_RUNNING_LATE_MOVE_TO_PROGRESS,
                    order
                });
            } else {
                //update Order from the api
                dispatch({
                    type: SOD_RECENT_MOVE_TO_PROGRESS,
                    order
                });
            }
        }

    } catch (error) {
        alert(error.message.toString());
    }
};

