import { Select, Option } from '@material-tailwind/react';
import PropTypes from 'prop-types';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: currentYear - 1800 }, (_, i) => currentYear - i);

const SelectorYears = ({ selectedYear, onChange, register }) => {
    return (
        <>
            <Select value={selectedYear} onChange={onChange} label='Año del vehículo' {...register}>
                {years.map((value) => (
                    <Option key={value} value={value}>
                        {value}
                    </Option>   
                ))}
            </Select>
        </>
    );
};

SelectorYears.propTypes = {
    selectedYear: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
}

export default SelectorYears;


