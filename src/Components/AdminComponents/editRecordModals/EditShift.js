import React from "react";
import { Label, Card, TextInput } from "flowbite-react";
import { Field } from "formik";

const EditShift = ({ shifts }) => (
  
	<div className="flex items-center gap-2">
		{shifts.map((shift, index) => (
			<div className="organiser-create-event-row" key={index}>
				<Card>
					<h2>shift</h2>
					<div className="col">
            <div className="flex items-center gap-2">
            <div className="col">
						<Label htmlFor={`shifts.${index}.startTime`} value="Start Time" />
            <Field as={TextInput} value={shift.startTime} onChange={(a) => console.log(a)} id={`shifts.${index}.startTime`} type="time" name={`shifts.${index}.startTime`} />
            </div>
            <div className="col">
            <Label htmlFor={`shifts.${index}.endTime`} value="End Time" />
            <Field as={TextInput} value={shift.endTime} onChange={(a) => console.log(a) } id={`shifts.${index}.startTime`} type="time" name={`shifts.${index}.startTime`} />
            </div>
            </div>
						<Label htmlFor={`shifts.${index}.capacity`} value="Capacity" />

						<Label
							htmlFor={`shifts.${index}.isLeaderRequired`}
							value="Is Leader Required?"
						/>

						<br />

						<Label
							htmlFor={`shifts.${index}.requiredMinAge`}
							value="Required Minimum Age"
						/>

						<Label
							htmlFor={`shifts.${index}.shiftDirections`}
							value="Shift Directions"
						/>

						<Label htmlFor={`shifts.${index}.street`} value="Street" />

						<Label htmlFor={`shifts.${index}.homeNum`} value="Home Number" />

						<Label htmlFor={`shifts.${index}.districtId`} value="District" />
					</div>
					<div className="col">
						<button
							type="button"
							onClick={() => {}}
							className="white_button"
						>
							Remove Shift
						</button>
					</div>
				</Card>
			</div>
		))}
		<button
			type="button"
			className="confirm_button"
			onClick={() => {}
			}
		>
			Add Shift
		</button>
	</div>
);

export default EditShift;
