import React, {useContext} from 'react';
import Row from "react-bootstrap/Row";
import {Context} from "../index";
import Card from "react-bootstrap/Card";

const BrandBar = () => {
    const {device} = useContext(Context)
    return (
        <Row className="d-flex" style={{marginLeft:4}}>
            {device.brands.map(brand =>
                <Card
                    style={{cursor:'pointer',
                            width:'15%'
                    }}
                    key={brand.id}
                    className="p-3 d-flex"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}

                </Card>
            )}
        </Row>
    );
};

export default BrandBar;