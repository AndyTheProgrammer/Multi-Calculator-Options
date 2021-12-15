import React from 'react'
import * as SurfaceArea from './index'

export default function SurfaceAreaCalculator(){
    return(
        <>
            <SurfaceArea.BallSurfaceArea />
            <SurfaceArea.CapsuleSurfaceArea />
            <SurfaceArea.ConeSurfArea />
            <SurfaceArea.ConicalFrustrumSurfaceArea />
            <SurfaceArea.CubeSurfArea/>
            <SurfaceArea.CylindricalTankSurfArea/>
            <SurfaceArea.EllipsoidSurfaceArea/>
            <SurfaceArea.SquarePyramidSurfaceArea/>
        </>
    );
}