import React, {useState} from 'react';
import { Label, Card, TextInput, Select } from "flowbite-react";

const EditShift = ({ shifts, districts, modifyShifts }) => {
	const newShift = useState({
    startTime: '', 
    endTime: '', 
    capacity: '', 
    isLeaderRequired: false, 
    requiredMinAge: '', 
    shiftDirections: '', 
    street: '', 
    homeNum: '', 
    districtId: '' 
});

const districtMap = Object.fromEntries(
	districts.map((district) => [district.name, district.id])
);


const formatTime = (time) => {
    let hours, minutes;
    if (typeof time === 'string') {
        [hours, minutes] = time.split(":");
    } else if (typeof time === 'object') {
        hours = time.hour.toString().padStart(2, '0');
        minutes = time.minute.toString().padStart(2, '0');
    }
    return `${hours}:${minutes}`;
}
	
	return (
	
	<div className="flex items-center gap-2">
		{shifts.map((shift, index) => (
			<div className="organiser-create-event-row" key={index}>
				<Card>
					<h2>shift</h2>
					<div className="col">
						<div className="flex items-center gap-2">
							<div className="col">
								<Label
									htmlFor={`shifts.${index}.startTime`}
									value="Start Time"
								/>
								<TextInput
									value={formatTime(shift.startTime)}
									onChange={(e) => {
										const [hour, minute] = e.target.value.split(":");
										const timeObject = {
											hour: parseInt(hour, 10),
											minute: parseInt(minute, 10),
											second: 0,
											nano: 0
										};
										modifyShifts('update', index, 'startTime', timeObject);
									}}
									id={`shifts.${index}.startTime`}
									type="time"
									name={`shifts.${index}.startTime`}
								/>
							</div>
							<div className="col">
								<Label htmlFor={`shifts.${index}.endTime`} value="End Time" />
								<TextInput
									value={formatTime(shift.endTime)}
									onChange={(e) => {
										const [hour, minute] = e.target.value.split(":");
										const timeObject = {
											hour: parseInt(hour, 10),
											minute: parseInt(minute, 10),
											second: 0,
											nano: 0
										};
										modifyShifts('update', index, 'endTime', timeObject);
									}}
									id={`shifts.${index}.endTime`}
									type="time"
									name={`shifts.${index}.endTime`}
								/>
							</div>
						</div>
						<div className="col">
							<Label htmlFor={`shifts.${index}.capacity`} value="Capacity" />
								<TextInput
									value={shift.capacity}
									onChange={(e) => modifyShifts('update', index, 'capacity', e.target.value)}
									id={`shifts.${index}.capacity`}
									type="number"
									name={`shifts.${index}.capacity`}
								/>
							</div>
						

							<div className="col">
							<Label
							htmlFor={`shifts.${index}.requiredMinAge`}
							value="Required Minimum Age"
							/>
								<TextInput
									value={shift.requiredMinAge}
									onChange={(e) => modifyShifts('update', index, 'requiredMinAge', e.target.value)}
									id={`shifts.${index}.requiredMinAge`}
									type="number"
									name={`shifts.${index}.requiredMinAge`}
								/>
							</div>
						
					

							<div className="col">
						<Label
							htmlFor={`shifts.${index}.shiftDirectionsEN`}
							value="Shift Directions EN"
						/>
						<TextInput
									value={shift.shiftDirectionsEN}
									onChange={(e) => modifyShifts('update', index, 'shiftDirectionsEN', e.target.value)}
									id={`shifts.${index}.shiftDirectionsEN`}
									type="text"
									name={`shifts.${index}.shiftDirectionsEN`}
								/>
							</div>
							<div className="col">
						<Label
							htmlFor={`shifts.${index}.shiftDirectionsPL`}
							value="Shift Directions PL"
						/>
						<TextInput
									value={shift.shiftDirectionsPL}
									onChange={(e) => modifyShifts('update', index, 'shiftDirectionsPL', e.target.value)}
									id={`shifts.${index}.shiftDirectionsPL`}
									type="text"
									name={`shifts.${index}.shiftDirectionsPL`}
								/>
							</div>
							<div className="col">
						<Label
							htmlFor={`shifts.${index}.shiftDirectionsRU`}
							value="Shift Directions RU"
						/>
						<TextInput
									value={shift.shiftDirectionsRU}
									onChange={(e) => modifyShifts('update', index, 'shiftDirectionsRU', e.target.value)}
									id={`shifts.${index}.shiftDirectionsRU`}
									type="text"
									name={`shifts.${index}.shiftDirectionsRU`}
								/>
							</div>
							<div className="col">
						<Label
							htmlFor={`shifts.${index}.shiftDirectionsUA`}
							value="Shift Directions UA"
						/>
						<TextInput
									value={shift.shiftDirectionsUA}
									onChange={(e) => modifyShifts('update', index, 'shiftDirectionsUA', e.target.value)}
									id={`shifts.${index}.shiftDirectionsUA`}
									type="text"
									name={`shifts.${index}.shiftDirectionsUA`}
								/>
							</div>
							<div className="col">
						<Label htmlFor={`shifts.${index}.street`} value="Street" />
						<TextInput
									value={shift.street}
									onChange={(e) => modifyShifts('update', index, 'street', e.target.value)}
									id={`shifts.${index}.street`}
									type="text"
									name={`shifts.${index}.street`}
								/>
							</div>
							<div className="col">
						<Label htmlFor={`shifts.${index}.homeNum`} value="Home Number" />
						<TextInput
									value={shift.homeNum}
									onChange={(e) => modifyShifts('update', index, 'homeNum', e.target.value)}
									id={`shifts.${index}.homeNum`}
									type="number"
									name={`shifts.${index}.homeNum`}
								/>
							</div>
							<div className="col">
						<Label htmlFor={`shifts.${index}.districtId`} value="District" />						
									<Select id={`shifts.${index}.districtId`} name={`shifts.${index}.districtId`}
									value={districtMap[shift.district]} 
									onChange={(e) => modifyShifts('update', index, 'districtId', e.target.value)}>
									{districts.map(district => (
										<option key={district.id} value={district.id}>{district.name}</option>
								))}
						</Select>
						</div>
					</div>
					<div className="col">
						<button type="button" onClick={() => modifyShifts('remove', index)} className="white_button">
							Remove Shift
						</button>
					</div>
				</Card>
			</div>
		))}
		<button type="button" className='confirm_button'   onClick={() => modifyShifts('add', newShift)}>
        Add Shift</button>

	</div>
	);
};

export default EditShift;