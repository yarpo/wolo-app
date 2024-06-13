import React from 'react';
import { Label, Card, TextInput, Select } from "flowbite-react";
import { useTranslation } from "react-i18next";

const EditShift = ({ shifts, districts, modifyShifts }) => {
    const { t } = useTranslation();

    const formatTime = (time) => {
        let hours, minutes;
        if (typeof time === 'string') {
            [hours, minutes] = time.split(":");
        }
        return `${hours}:${minutes}`;
    };

    return (
        <div className="flex items-center gap-2">
            {shifts.map((shift, index) => (
                <div className="organiser-create-event-row" key={index}>
                    <Card>
                        <h2>{t('shift') +' '+ (index+1)}</h2>
                        <div className="col">
                            <div className="flex items-center gap-2">
                                <div className="col">
                                    <Label htmlFor={`shifts.${index}.startTime`} value={t('startTime')} />
                                    <TextInput
                                        value={formatTime(shift.startTime)}
                                        onChange={(e) => {
                                            modifyShifts('update', index, 'startTime', e.target.value + ':00');
                                        }}
                                        id={`shifts.${index}.startTime`}
                                        type="time"
                                        name={`shifts.${index}.startTime`}
                                    />
                                </div>
                                <div className="col">
                                    <Label htmlFor={`shifts.${index}.endTime`}value={t('endTime')} />
                                    <TextInput
                                        value={formatTime(shift.endTime)}
                                        onChange={(e) => {
                                            modifyShifts('update', index, 'endTime', e.target.value + ':00');
                                        }}
                                        id={`shifts.${index}.endTime`}
                                        type="time"
                                        name={`shifts.${index}.endTime`}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <Label htmlFor={`shifts.${index}.capacity`} value={t('capacity')}  />
                                <TextInput
                                    value={shift.capacity}
                                    onChange={(e) => modifyShifts('update', index, 'capacity', e.target.value)}
                                    id={`shifts.${index}.capacity`}
                                    type="number"
                                    name={`shifts.${index}.capacity`}
                                />
                            </div>
                            <div className="col">
                                <Label htmlFor={`shifts.${index}.requiredMinAge`}value={t('ageRestrictions')}  />
                                <TextInput
                                    value={shift.requiredMinAge}
                                    onChange={(e) => modifyShifts('update', index, 'requiredMinAge', e.target.value)}
                                    id={`shifts.${index}.requiredMinAge`}
                                    type="number"
                                    name={`shifts.${index}.requiredMinAge`}
                                />
                            </div>
                            <div className="col">
                                <Label htmlFor={`shifts.${index}.shiftDirectionsEN`} value={t('shiftDirectionEN')} />
                                <TextInput
                                    value={shift.shiftDirectionsEN}
                                    onChange={(e) => modifyShifts('update', index, 'shiftDirectionsEN', e.target.value)}
                                    id={`shifts.${index}.shiftDirectionsEN`}
                                    type="text"
                                    name={`shifts.${index}.shiftDirectionsEN`}
                                />
                            </div>
                            <div className="col">
                                <Label htmlFor={`shifts.${index}.shiftDirectionsPL`} value={t('shiftDirectionPL')}  />
                                <TextInput
                                    value={shift.shiftDirectionsPL}
                                    onChange={(e) => modifyShifts('update', index, 'shiftDirectionsPL', e.target.value)}
                                    id={`shifts.${index}.shiftDirectionsPL`}
                                    type="text"
                                    name={`shifts.${index}.shiftDirectionsPL`}
                                />
                            </div>
                            <div className="col">
                                <Label htmlFor={`shifts.${index}.shiftDirectionsRU`} value={t('shiftDirectionRU')}  />
                                <TextInput
                                    value={shift.shiftDirectionsRU}
                                    onChange={(e) => modifyShifts('update', index, 'shiftDirectionsRU', e.target.value)}
                                    id={`shifts.${index}.shiftDirectionsRU`}
                                    type="text"
                                    name={`shifts.${index}.shiftDirectionsRU`}
                                />
                            </div>
                            <div className="col">
                                <Label htmlFor={`shifts.${index}.shiftDirectionsUA`} value={t('shiftDirectionUA')}  />
                                <TextInput
                                    value={shift.shiftDirectionsUA}
                                    onChange={(e) => modifyShifts('update', index, 'shiftDirectionsUA', e.target.value)}
                                    id={`shifts.${index}.shiftDirectionsUA`}
                                    type="text"
                                    name={`shifts.${index}.shiftDirectionsUA`}
                                />
                            </div>
                            <div className="col">
                                <Label htmlFor={`shifts.${index}.street`} value={t('street')} />
                                <TextInput
                                    value={shift.street}
                                    onChange={(e) => modifyShifts('update', index, 'street', e.target.value)}
                                    id={`shifts.${index}.street`}
                                    type="text"
                                    name={`shifts.${index}.street`}
                                />
                            </div>
                            <div className="col">
                                <Label htmlFor={`shifts.${index}.homeNum`} value={t('homeNum')} />
                                <TextInput
                                    value={shift.homeNum}
                                    onChange={(e) => modifyShifts('update', index, 'homeNum', e.target.value)}
                                    id={`shifts.${index}.homeNum`}
                                    type="number"
                                    name={`shifts.${index}.homeNum`}
                                />
                            </div>
                            <div className="col">
                                <Label htmlFor={`shifts.${index}.districtId`} value={t('district')} />						
                                <Select
                                    id={`shifts.${index}.districtId`}
                                    name={`shifts.${index}.districtId`}
                                    value={shift.districtId}
                                    onChange={(e) => modifyShifts('update', index, 'districtId', e.target.value)}
                                >
                                    {districts.map(district => (
                                        <option key={district.id} value={district.id}>{district.name}</option>
                                    ))}
                                </Select>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default EditShift;