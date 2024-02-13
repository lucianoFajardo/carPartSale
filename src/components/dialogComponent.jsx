import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import PropTypes from 'prop-types';
import { format } from 'date-fns';

export function DialogComponent({ onClick, data }) {
    const [size, setSize] = React.useState(null);
    const handleOpen = (value) => setSize(value);
    const dataget = data;

    return (
        <>
            <div className="mb-3 flex gap-3">
                <Button onClick={() => { handleOpen("xxl"); onClick(); }}>ver mas</Button>
            </div>
            <Dialog open={size === "xxl"} size={size} handler={handleOpen}>
                {
                    dataget && (
                        <>
                            <DialogHeader>Informe de auto: {dataget.carBrand}</DialogHeader>
                            <DialogBody color="black">
                                <div className="outline-dotted p-5 outline-offset-1 outline-blue-500">
                                    <div className="m-5 space-y-5 font-bold text-black grid grid-row-3 divide-y divide-blue-200 divide-dashed">
                                        <p >Marca del auto: {dataget.carBrand}</p>
                                        <p >Fecha de informe: {format(new Date(dataget.scanData), 'yyyy-MM-dd')}</p>
                                        <p >N° chasis: {dataget.chassisNumber}</p>
                                        <p >Tipo de combustible: {dataget.fuel}</p>
                                        <p >Observaciones: {dataget.observations} </p>
                                        <p >Fallas detectadas: {dataget.faultsDetected}</p>
                                        <p >Monto total: {dataget.amount}</p>
                                    </div>
                                </div>
                            </DialogBody>
                        </>
                    )
                }
                <DialogFooter>
                    <Button
                        variant="gradient"
                        color="green"
                        onClick={() => handleOpen(null)}
                    >
                        <span>Ok</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

DialogComponent.propTypes = {
    onClick: PropTypes.func.isRequired,
    data: PropTypes.object,
};