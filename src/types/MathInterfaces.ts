/* eslint-disable camelcase */

// MATH INTERFACES

// Surface Area

export interface BallSurfaceArea {
  radius: string;
  radius_unit: string;
  method: string;
}
export interface SurfaceAreaI {
  radius: string;
  radius_unit: string;
  method: string;
}

export interface CubeAreaI {
  edge_length: string;
  edge_unit: string;
  method: string;
}

export interface ConeAreaI {
  radius: string;
  radius_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface RectangularAreaI {
  length: string;
  length_unit: string;
  width: string;
  width_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface CylindricalTankAreaI {
  radius: string;
  radius_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface SquarePyramidSurfaceAreaI {
  base: string;
  base_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface CapsuleSurfaceAreaI {
  radius: string;
  radius_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface ConicalFrustrumSurfaceAreaI {
  top_radius: string;
  top_radius_unit: string;
  bottom_radius: string;
  bottom_radius_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface EllipsoidSurfaceAreaI {
  axis1: string;
  axis1_unit: string;
  axis2: string;
  axis2_unit: string;
  axis3: string;
  axis3_unit: string;
  method: string;
}

export interface SphericalCapSurfaceAreaI {
  radius: string;
  radius_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface RectangleAreaI {
  length: string;
  length_unit: string;
  width: string;
  width_unit: string;
  method: string;
}

// start here
export interface ParallelogramAreaI {
  breadth: string;
  breadth_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface EllipseAreaI {
  semi_major_axes_a: string;
  semi_major_axes_a_unit: string;
  semi_major_axes_b: string;
  semi_major_axes_b_unit: string;
  method: string;
}

export interface TrapezoidAreaI {
  base1: string;
  base1_unit: string;
  base2: string;
  base2_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface TriangleAreaI {
  sideA: string;
  sideA_unit: string;
  sideB: string;
  sideB_unit: string;
  sideC: string;
  sideC_unit: string;
  method: string;
}

export interface CircleAreaI {
  radius: string;
  radius_unit: string;
  method: string;
}

export interface SectorAreaI {
  radius: string;
  radius_unit: string;
  angle: string;
  angle_unit: string;
  method: string;
}

// Volume
export interface SphereVolumeCalculatorI {
  radius: string;
  radius_unit: string;
  method: string;
}

export interface ConeVolumeCalculatorI {
  radius: string;
  radius_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface CubeVolumeCalculatorI {
  edge_length: string;
  edge_unit: string;
  method: string;
}

export interface CylinderVolumeCalculatorI {
  radius: string;
  radius_unit: string;
  height_unit: string;
  height: string;
  method: string;
}

export interface RectangularTankVolumeI {
  length: string;
  length_unit: string;
  width: string;
  width_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface CapsuleVolumeCalculatorI {
  radius: string;
  radius_unit: string;
  height: string;
  height_unit: string;
  method: string;
}

export interface SphericalCapVolumeI {
  radius: string;
  radius_unit: string;
  height_unit: string;
  height: string;
  method: string;
}

export interface SquarePyramidVolumeI {
  base: string;
  base_unit: string;
  height_unit: string;
  height: string;
  method: string;
}

export interface EllipsoidVolumeCalculatorI {
  axis1: string;
  axis1_unit: string;
  axis2: string;
  axis2_unit: string;
  axis3: string;
  axis3_unit: string;
  method: string;
}

export interface TubeVolumeCalculatorI {
  outer_diameter: string;
  outer_diameter_unit: string;
  inner_diameter: string;
  inner_diameter_unit: string;
  length: string;
  length_unit: string;
  method: string;
}

export interface ConicalFrustumVolumeI {
  top_radius: string;
  top_radius_unit: string;
  bottom_radius: string;
  bottom_radius_unit: string;
  height_unit: string;
  height: string;
  method: string;
}

//end 11/04/2021
export interface SinglePointWithKnownSlopeI {
  y_1: string;
  distance: string;
  x_1: string;
  slope: string;
  method: string;
}

export interface SlopeCalculatorForTwoKnownPointsI {
  y_1: string;
  y_2: string;
  x_1: string;
  x_2: string;
  method: string;
}

export type AllMathCalculators =
  | BallSurfaceArea
  | SurfaceAreaI
  | CubeAreaI
  | ConeAreaI
  | RectangularAreaI
  | CylindricalTankAreaI
  | SquarePyramidVolumeI
  | CapsuleSurfaceAreaI
  | ConicalFrustrumSurfaceAreaI
  | EllipsoidSurfaceAreaI
  | SphericalCapSurfaceAreaI
  | SquarePyramidSurfaceAreaI
  | RectangleAreaI
  | ParallelogramAreaI
  | EllipseAreaI
  | TrapezoidAreaI
  | TriangleAreaI
  | CircleAreaI
  | SectorAreaI
  | SphereVolumeCalculatorI
  | CubeVolumeCalculatorI
  | CylinderVolumeCalculatorI
  | RectangularTankVolumeI
  | CapsuleVolumeCalculatorI
  | SphericalCapVolumeI
  | ConicalFrustrumSurfaceAreaI
  | TubeVolumeCalculatorI
  | SlopeCalculatorForTwoKnownPointsI
  | SinglePointWithKnownSlopeI;
