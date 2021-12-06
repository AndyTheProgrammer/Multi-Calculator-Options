import * as React from 'react'
import { Field } from 'formik';
import { ArrowDownward } from '@material-ui/icons'

import Angle from '../../lib/Angle.json'
import Capacity from '../../lib/Capacity.json'
import Length from '../../lib/Length.json'
import Speed from '../../lib/Speed.json'
import Data from '../../lib/Data.json'
import Time from '../../lib/Time.json'
import Units from '../../lib/Units.json'
import Weight from '../../lib/Weight.json'

import { COLORS } from "../../common/shared";


const CustomSelect = (props: any) => {
  const { id, value, measurement } = props

  const genders = [
    {
      type: "male",
      label: "Male"
    },
    {
      type: "female",
      label: "Female"
    },
    {
      type: "other",
      label: "Other"
    }
  ]

  // If you have a better way to make this happen, have at it using the Units file, comparing the `measurement` to the `type`, and return the units for that object.
  if (measurement === "angle") {
    return (
      <div className="form-group col">
        <Field
          as="select"
          id={id}
          className="form-control form-control-sm"
          value={value}
          style={{ backgroundColor: COLORS.input }}
        >
          <option selected style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
            Select unit
          </option>
          {Angle.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
              >
                {name}
              </option>
            ))
          ))}
        </Field>
      </div>
    )

  } else if (measurement === "capacity") {
    return (
      <div className="form-group col">
        <Field
          as="select"
          id={id}
          className="form-control form-control-sm"
          value={value}
          style={{ backgroundColor: COLORS.input }}
        >
          <option selected style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Select unit</option>
          {Capacity.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
              >
                {name}
              </option>
            ))
          ))}
        </Field>
      </div>
    )

  } else if (measurement === "length") {
    return (
      <div className="form-group col">
        <Field
          as="select"
          id={id}
          className="form-control form-control-sm"
          value={value}
          style={{ backgroundColor: COLORS.input }}
        >
          <option selected style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Select unit</option>
          {Length.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
              >
                {name}
              </option>
            ))
          ))}
        </Field>
      </div>
    )

  } else if (measurement === "speed") {
    return (
      <div className="form-group col">
        <Field
          as="select"
          id={id}
          className="form-control form-control-sm"
          value={value}
          style={{ backgroundColor: COLORS.input }}
        >
          <option selected style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Select unit</option>
          {Speed.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
              >
                {name}
              </option>
            ))
          ))}
        </Field>
      </div>
    )

  } else if (measurement === "data") {
    return (
      <div className="form-group col">
        <Field
          as="select"
          id={id}
          className="form-control form-control-sm"
          value={value}
          style={{ backgroundColor: COLORS.input }}
        >
          <option selected style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Select unit</option>
          {Data.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
              >
                {name}
              </option>
            ))
          ))}
        </Field>
      </div>
    )

  } else if (measurement === "time") {
    return (
      <div className="form-group col">
        <Field
          as="select"
          id={id}
          className="form-control form-control-sm"
          value={value}
          style={{ backgroundColor: COLORS.input }}
        >
          <option selected style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Select unit</option>
          {Time.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
              >
                {name}
              </option>
            ))
          ))}
        </Field>
      </div>
    )
  } else if (measurement === "weight") {
    return (
      <div className="form-group col">
        <Field
          as="select"
          id={id}
          className="form-control form-control-sm"
          value={value}
          style={{ backgroundColor: COLORS.input }}
        >
          <option selected style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Select unit</option>
          {Weight.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
              >
                {name}
              </option>
            ))
          ))}
        </Field>
      </div>
    )
  } if (measurement === "gender") {
    return (
      <div className="form-group col">
        <Field
          as="select"
          id={id}
          className="form-control form-control-sm"
          value={value}
          style={{ backgroundColor: COLORS.input }}
        >
          <option selected style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Select gender</option>
          {genders.map(({ type, label }) => (
            <option
              key={type}
              value={type}
            >
              {label}
            </option>
          ))}
        </Field>
      </div>
    )
  } else {
    return (
      <div className="form-group col">
        <Field
          as="select"
          id={id}
          className="form-control form-control-sm"
          value={value}
          style={{ backgroundColor: COLORS.input }}
        >
          <option selected style={{ fontWeight: 'bold', fontStyle: 'italic' }}>Select unit</option>
          {Units.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
              >
                {name}
              </option>
            ))
          ))}
        </Field>
      </div>
    )
  }
}

export default CustomSelect
