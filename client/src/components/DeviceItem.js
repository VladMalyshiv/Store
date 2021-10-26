import React from 'react';
import {Col, Image} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import star from "../Assets/star.png"
import {useHistory} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/Consts";


const DeviceItem = ({device}) => {

    const history = useHistory()

    return (
        <Col md={3} className="mt-5" onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor:'pointer'}}>
                <div>
                    <Image width={150} src={process.env.REACT_APP_API_URL + device.img}/>
                    <div className=" text-black-50 d-flex justify-content-between align-items-center mt-2">
                        <div>Samsung...</div>
                        <div className="d-flex align-items-center">
                            <div>{device.rating}</div>
                            <Image  style={{marginLeft:4}} width={13} height={15} src={star}/>
                        </div>
                    </div>
                    <div>{device.name}</div>
                </div>
            </Card>
        </Col>
    );
};

export default DeviceItem;