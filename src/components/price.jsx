import { Input } from '@material-tailwind/react';
import { useState, useEffect } from 'react';
import { BsCashCoin } from "react-icons/bs";
import PropTypes from 'prop-types';

// ... (importaciones y otros códigos)

const IntegerInputWithVAT = ({ setValue, name }) => {
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        const totalWithVAT = calculateWithVAT();
        setValue(name, totalWithVAT); // Aquí se pasa el monto total con impuesto al setValue
    }, [setValue, name, amount]);


    function calculateWithVAT() {
        if (isNaN(amount)) {
            return setAmount(0);
        }
        const vat = 0.19;
        const total = amount + amount * vat;
        return total // Redondear a dos decimales
    }

    const handleChange = (e) => {
        const input = e.target.value;
        // Validar que el input es un número entero
        if (/^\d*$/.test(input)) {
            setAmount(parseInt(input, 10));
        }
    };

    return (
        <div className='m-3'>
            <Input
                className=''
                size='lg'
                type="text"
                id="amount"
                value={amount === 0 ? '' : amount}
                onChange={handleChange}
                icon={<BsCashCoin />}
            />
            <div className='p-5'>
                <p>Con IVA del 19%: {calculateWithVAT()} </p>
            </div>
        </div>
    );
};

// Resto del código...

// ... (PropTypes y exportación)


IntegerInputWithVAT.propTypes = {
    register: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    setTotal: PropTypes.func.isRequired
}

export default IntegerInputWithVAT;
