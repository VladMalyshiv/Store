import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import {Button, Col, Image, Row} from "react-bootstrap";
import starDevice from '../Assets/star-device.png'
import Card from "react-bootstrap/Card";
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../htttp/deviceAPI";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    const {id} = useParams()

    useEffect(() =>{
        fetchOneDevice(id).then(data => setDevice(data))
        console.log(id)
    },[])

    return (
        <Container className=" mt-4">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>

                <Col md={4}>
                    <Row className='d-flex align-items-center'>
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex justify-content-center align-items-center"
                            style={{background:`url(${starDevice}) no-repeat center center`, width:250, height:240, backgroundSize:'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>

                <Col md={4}>
                    <Card
                        className="d-flex flex-column justify-content-around align-items-center"
                        style={{width:300, height:300, fontSize:32}}
                    >
                        <h2>От:{device.price} руб.</h2>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики:</h1>
                {device.info.map((info,index) =>
                    <Row
                        style={{background:index %2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                        key={info.id}
                    >
                        {info.title} : {info.description}
                    </Row>
                )}
            </Row>
        </Container>
)
    ;
};

export default DevicePage;