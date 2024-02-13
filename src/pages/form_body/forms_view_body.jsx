import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Select, Option, Input, Popover,
    PopoverHandler,
    PopoverContent, Textarea, Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter, Button,
} from '@material-tailwind/react';
import { es } from 'date-fns/locale';
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import CarModels from '../../models/car_models.js';
import ButtonComponent from '../../components/button.jsx';
import SelectorYearsComponent from '../../components/selector_years'
import IntegerInputWithVAT from '../../components/price.jsx';


const FormsViewBody = () => {
    const fuelOptions = [
        { id: 1, valueFuel: 'Gasolina' },
        { id: 2, valueFuel: 'Petroleo' }
    ];
    const [date, setDate] = useState();
    const handlerChangeValue = (value) => {
        console.log('year Car', value)
        setValue('yearCar', value)
    };

    const [totalAmount, setTotalAmount] = useState(0);

    const handlerChangeDate = (selecData) => {
        setDate(selecData);
        setValue('scanData', selecData);
        console.log(selecData);
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            yearCar: '',
            scanData: '',
            chassisNumber: '',
            observations: 'Ninguna observación',
            faultsDetected: '',
            amount: 0
        },
    });
    const CarBrandModels = CarModels.map((e) => (
        <Option key={e.id} value={e.carBrand}>
            {e.carBrand}
        </Option>
    ));
    const FuelOptionsValue = fuelOptions.map((e) => (
        <Option key={e.id} value={e.valueFuel}>
            {e.valueFuel}
        </Option>
    ));
    const handlerSubmitForm = async (data) => {
        handleOpen();
        let results = await fetch(
            'http://localhost:3000/', {
            method: "post",
            body: JSON.stringify({ data }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        );
        results = await results.json();
        if (results) {
            console.log(results.json());
        }
        console.log('manejador de data :', data);
        console.log('Monto Total con IVA:', totalAmount);
    }

    return (
        <>
            <div className="p-5">
                <h1 className="text-xl">Ingresar datos de diagnóstico del vehículo</h1>
                <div className="p-2">
                    <form
                        className="p-5 flex flex-col space-y-3 bg-slate-800"
                        onSubmit={handleSubmit((data, e) => handlerSubmitForm(data, e))}
                    >
                        <div className="grid grid-cols-3 m-2 space-x-2 smartphone:grid-cols-1 smartphone:space-y-3 smartphone:m-3 smartphone:space-x-0">
                            <div>
                                <Select
                                    {...register('carBrand', {
                                        required: "* Ingresar marca de vehiculo"
                                    })}
                                    label="Marca de vehículo"
                                    onChange={(e) => {
                                        setValue('carBrand', e);
                                        console.log(e
                                        )
                                    }}
                                >
                                    {CarBrandModels}
                                </Select>
                            </div>
                            <div>
                                <SelectorYearsComponent
                                    selectedYear=''
                                    onChange={handlerChangeValue}
                                    register={register}
                                />
                            </div>
                            <div>
                                <Select
                                    {...register('fuel')}
                                    label="Tipo de combustible"
                                    onChange={(e) => {
                                        setValue('fuel', e)
                                        console.log(e)
                                    }}
                                >
                                    {FuelOptionsValue}
                                </Select>
                            </div>
                        </div>

                        <div className='grid grid-cols-2 m-2 space-x-3 smartphone:grid-cols-1 smartphone:space-x-0 smartphone:space-y-5'>
                            <div>
                                <Popover placement="bottom">
                                    <PopoverHandler>
                                        <Input
                                            label="Fecha de scaneo"
                                            onChange={() => null}
                                            value={date ? format(date, "P") : ""}
                                        />
                                    </PopoverHandler>
                                    <PopoverContent>
                                        <DayPicker
                                            locale={es}
                                            mode="single"
                                            selected={date}
                                            onSelect={handlerChangeDate}
                                            showOutsideDays
                                            className="border-0"
                                            classNames={{
                                                caption: "flex justify-center py-2 mb-4 relative items-center",
                                                caption_label: "text-sm font-medium text-gray-900",
                                                nav: "flex items-center",
                                                nav_button:
                                                    "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                                                nav_button_previous: "absolute left-1.5",
                                                nav_button_next: "absolute right-1.5",
                                                table: "w-full border-collapse",
                                                head_row: "flex font-medium text-gray-900",
                                                head_cell: "m-0.5 w-9 font-normal text-sm",
                                                row: "flex w-full mt-2",
                                                cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                                                day: "h-9 w-9 p-0 font-normal",
                                                day_range_end: "day-range-end",
                                                day_selected:
                                                    "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                                                day_today: "rounded-md bg-gray-200 text-gray-900",
                                                day_outside:
                                                    "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                                                day_disabled: "text-gray-500 opacity-50",
                                                day_hidden: "invisible",
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <Input label="Numero de chasis" {...register('chassisNumber', {
                                    maxLength: { value: 17, message: "* Numero VIN demasiado largo" },
                                    minLength: { value: 17, message: "* Ingresar numero VIN" },
                                    required: '* Numero de VIN es requerido'
                                })} onInput={(e) => {
                                    e.target.value = e.target.value.toUpperCase();
                                }} />
                                <p className='text-red-600'>{errors.chassisNumber?.message}</p>
                            </div>
                        </div>
                        <div className='p-3 pt-5'>
                            <Textarea label="Observaciones" {...register('observations', {
                                minLength: { value: 2, message: "ingresar una observacion" }
                            })} />
                            <p>{errors.observations?.message}</p>
                        </div>
                        <div className='m-2 '>
                            <Textarea label="Fallas detectadas" {...register('faultsDetected', {
                                required: "* Ingresar fallas detectadas"
                            })} />
                            <p className='text-red-500'>{errors.faultsDetected?.message}</p>
                        </div>
                        <label className='m-3'>Monto total a pagar</label>
                        <div>
                            <IntegerInputWithVAT
                                setValue={setValue}
                                name="amount"
                                setTotal={setTotalAmount}
                            />
                            <p className="text-red-600">{errors.amount?.message}</p>
                        </div>
                        <div className=''>
                            <Button onClick={handleOpen} color='blue' className='m-3'>
                                Guardar datos
                            </Button>
                            <Dialog open={open} handler={handleOpen}>
                                <DialogHeader>Guardar informacion.</DialogHeader>
                                <DialogBody>
                                    Al aceptar deseas guardar toda esta información, si esta de acuerdo aceptar en caso contrario cancelar
                                </DialogBody>
                                <DialogFooter>
                                    <Button
                                        color="red"
                                        onClick={handleOpen}
                                        className="mr-1"
                                        size='lg'
                                    >
                                        <span>Cancelar</span>
                                    </Button>
                                    <ButtonComponent onClickData={handleSubmit(handlerSubmitForm)} />
                                </DialogFooter>
                            </Dialog>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default FormsViewBody;
