import { Button } from "@material-tailwind/react";
import PropTypes from 'prop-types';

const Button_Component = ({onClickData, disabledData}) => {
    return (
        <>
            <div>
                <Button size="lg" color="blue" onClick={onClickData} disabled={disabledData} >Guardar</Button>
            </div>
        </>
    );
}
Button_Component.propTypes = {
    onClickData: PropTypes.func.isRequired,
    disabledData: PropTypes.bool.isRequired
}
export default Button_Component;