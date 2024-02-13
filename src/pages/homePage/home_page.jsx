// PageViewHome.js
import { useEffect, useState } from "react";
import HeaderView from "../../components/header";
import { format } from 'date-fns';
import { Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { DialogComponent } from "../../components/dialogComponent";

export default function PageViewHome() {
    const [data, setData] = useState([]);
    const [selectedCard, setSelectedCard] = useState();

    async function fetchData() {
        const res = await fetch('http://localhost:3000/api/documentos');
        res.json()
            .then(dataRes => {
                setData(dataRes);
            })
            .catch(e => console.error(e));
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleCardSelection = (id) => {
        const selected = data.find(card => card._id === id);
        setSelectedCard(selected);
    }

    return (
        <>
            <HeaderView />
            <body>
                <div className="grid grid-cols-4 m-4 smartphone:flex flex-col tablet:flex">
                    {data.length > 0 ? (
                        data.map((i) => (
                            <div key={i._id}>
                                <Card className="mt-6 w-96 h-64 max-w-96 max-h-96 bg-blue-gray-200">
                                    <CardBody className="m-1 h-52 max-h-52 max-w-full">
                                        <div className="text-wrap">
                                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                                <p className="">N° Chasis {i.chassisNumber}</p>
                                            </Typography>
                                            <Typography color="black" className="text-wrap" variant="h6">
                                                <p>Fecha de documento: {format(new Date(i.scanData), 'yyyy-MM-dd')}</p>
                                                <p>Marca: {i.carBrand}</p>
                                                <p className="truncate">Fallas detectadas: {i.faultsDetected}</p>
                                                <p>{i._id}</p>
                                            </Typography>
                                        </div>
                                    </CardBody>
                                    <CardFooter className="pt-0">
                                        <DialogComponent data={selectedCard} onClick={() => handleCardSelection(i._id)} />
                                        {console.log(selectedCard)}
                                    </CardFooter>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <div className="p-10 w-auto h-auto">
                            <p className="text-center font-bold text-lg w-auto">
                                No existen datos disponible, recargar por favor...
                            </p>
                        </div>
                    )}


                </div>
            </body>
        </>
    );
}
