import React from 'react'
import PopulationStandardDeviationCalculator from '../TemperalComponentsFolder/math/PopulationStandardDeviationCalculator'
import StatisticsCalculator from '../TemperalComponentsFolder/math/StatisticsCalculator'
import AverageCalculator from '../TemperalComponentsFolder/math/AverageCalculator'
import SampleStandardDeviationCalculator from '../TemperalComponentsFolder/math/SampleStandardDeviationCalculator'
import ConfidenceIntervalCalculator from '../TemperalComponentsFolder/math/ConfidenceIntervalCalculator'
import PercentageCalculator from '../TemperalComponentsFolder/math/PercentageCalculator'
import PercentageChangeCalculator from '../TemperalComponentsFolder/math/PercentageChangeCalculator'
import PercentageDifferenceCalculator from '../TemperalComponentsFolder/math/PercentageDifferenceCalculator'
import PercentErrorCalculator from '../TemperalComponentsFolder/math/PercentErrorCalculator'
import LogCalculator from '../TemperalComponentsFolder/math/LogCalculator'
import ExponentCalculator from '../TemperalComponentsFolder/math/ExponentCalculator'
import SquareRootCalculator from '../TemperalComponentsFolder/math/SquareRootCalculator'
import CubeRootCalculator from '../TemperalComponentsFolder/math/CubeRootCalculator'
import GeneralRootCalculator from '../TemperalComponentsFolder/math/GeneralRootCalculator'
import GeometricSequencestCalculator from '../TemperalComponentsFolder/math/GeometricSequencestCalculator'
import PythagoreanTheoremCalculator from '../TemperalComponentsFolder/math/PythagoreanTheoremCalculator'
import PermutationCalculator from '../TemperalComponentsFolder/math/PermutationCalculator'


function MathPage(){
    return(
        <div>
            <div className="container d-flex justify-content-center mb-4">
                <h4>Math Page</h4>
            </div>
            {/* <StatisticsCalculator/> */}
            <AverageCalculator />
            {/* <PopulationStandardDeviationCalculator />
            <SampleStandardDeviationCalculator/>
            <ConfidenceIntervalCalculator />
            <PercentageCalculator/>
            <PercentageChangeCalculator />
            <PercentageDifferenceCalculator/>
            <PercentErrorCalculator />
            <LogCalculator />
            <ExponentCalculator />
            <SquareRootCalculator />
            <CubeRootCalculator />
            <GeneralRootCalculator />
            <GeometricSequencestCalculator />
            <PythagoreanTheoremCalculator />
            <PermutationCalculator /> */}
        </div>
    );
}

export{ MathPage }