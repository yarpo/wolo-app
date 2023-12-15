import '../../../styles/shift-checkbox.scss';

const ShiftCheckbox = () => {
    return (
        <div>
            <div className="shift_checkbox">
            <   label htmlFor="shift_hours"><input type='checkbox' id="shift_hours"/>00:00 - 00:00</label>
            </div>
            <p id="shift_num_of_volunteers">Volunteers: <strong>2</strong> / <strong>5</strong></p>
        </div>
    );
};

export default ShiftCheckbox;
