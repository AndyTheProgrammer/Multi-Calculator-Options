import React from 'react'
import LengthConverter from '../TemperalComponentsFolder/other/LengthConverter'
import AreaConverter from '../TemperalComponentsFolder/other/AreaConverter'
import TemperatureConverter from '../TemperalComponentsFolder/other/TemperatureConverter'
import VolumeConverter from '../TemperalComponentsFolder/other/VolumeConverter'
import TimeConverter from '../TemperalComponentsFolder/other/TimeConverter'
import WeightConverter from '../TemperalComponentsFolder/other/WeightConverter'
import HorsePowerConverter from '../TemperalComponentsFolder/other/HorsePowerConverter'
import DataUnitConverter from '../TemperalComponentsFolder/other/DataUnitConverter'

function ConvertersPage(){

    return(
        <div>
            <div className="container d-flex justify-content-center mb-4">
                <h4>Converters Page</h4>
            </div>
            <LengthConverter />
            <AreaConverter />
            <TemperatureConverter />
            <VolumeConverter />
            <TimeConverter />
            <WeightConverter />
            <HorsePowerConverter />
            <DataUnitConverter />
        </div>
    );
}

export { ConvertersPage }