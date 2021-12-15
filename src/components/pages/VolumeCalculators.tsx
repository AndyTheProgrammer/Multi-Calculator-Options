import React from 'react'
import * as Volume from './index'

export default function VolumeCalculators(){
    return(
        <>
            <Volume.CapsuleVolume/>
            <Volume.ConeVolume/>
            <Volume.ConicalFrustumVolume/>
            <Volume.CubeVolume/>
            <Volume.CylinderVolume/>
            <Volume.EllipsoidVolume/>
            <Volume.RectangularTankVolume/>
            <Volume.SphereVolume />
            <Volume.SphericalCapVolume />
            <Volume.SquarePyramidVolume />
            <Volume.TubeVolume/>
        </>
    );
}