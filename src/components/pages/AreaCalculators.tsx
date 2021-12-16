import React from 'react';
import * as Area from './index'


export default function AreaCalculator(){
    return(
        <>
            <Area.CircleArea/>
            <Area.EllipseArea/>
            <Area.ParallelogramArea />
            <Area.RectangularArea />
            <Area.SectorArea />
            <Area.TrapezoidArea/>
            <Area.TriangleArea/>
        </>
    );
}
