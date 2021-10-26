import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Col, Dropdown, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {Context} from "../../index";
import {createDevices, fetchBrands, fetchDevices, fetchTypes} from "../../htttp/deviceAPI";
import {observer} from "mobx-react-lite";

const CreateDevice =  observer (({show, onHide}) => {
    const {device} = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)

    useEffect(()=>{
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const [info, setInfo] = useState([])

    const addInfo = () =>{
        setInfo([...info, {title:'', description:'', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) =>{
        setInfo(info.map(i => i.number === number ? {...i, [key]:value} : i))
    }

    const selectFile = e =>{
        setFile(e.target.files[0])
    }
    const addDevice = () => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        formData.append('info', JSON.stringify(info))
        createDevices(formData).then(data => onHide())
    }

    return (
        <Modal
            size="lg"
            centered
            show={show}
            onHide={onHide}
        >
            <Modal.Header >
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{ device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedType(type)}
                                    key={type.id}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>{ device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => device.setSelectedBrand(brand)}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className="mt-3"
                        placeholder={"Введите название"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder={"Введите стоимость"}
                        type="number"
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                    />
                    <Form.Control
                        className="mt-3"
                        type="file"
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button
                        variant={"outline-dark"}
                        onClick={addInfo}
                    >
                        Добавить новую харакеристику
                    </Button>
                    {info.map(i =>
                        <Row className="d-flex align-items-end" key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    className="mt-3"
                                    placeholder={"Введите название характеристики"}
                                    value={i.title}
                                    onChange={e => changeInfo('title', e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    className="mt-3"
                                    placeholder={"Введите описание характеристики"}
                                    value={i.description}
                                    onChange={e => changeInfo('description', e.target.value, i.number)}
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    onClick={() => removeInfo(i.number)}
                                    variant={"outline-danger"}

                                >
                                    Удалить характеристику
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;