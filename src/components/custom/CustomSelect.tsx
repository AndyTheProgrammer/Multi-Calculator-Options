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

interface SelectProps {
  id?: String;
  value?: any;
  measurement?: any;
  col?: Boolean;
  onChange?: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | React.ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  };
}

const CustomSelect = (props: SelectProps) => {
  const { id, value, measurement, onChange } = props

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
          className="form-control "
          value={value}
          style={{
            backgroundColor: COLORS.newInput,
            fontWeight: 500,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%'
          }}
        >
          {Angle.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
                style={{ color: COLORS.text, fontWeight: 500, fontSize: 14 }}
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
          className="form-control "
          value={value}
          style={{
            backgroundColor: COLORS.newInput,
            fontWeight: 500,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%'
          }}
        >
          {Capacity.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
                style={{ color: COLORS.text, fontWeight: 500, fontSize: 14 }}
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
          className="form-control "
          value={value}
          style={{
            backgroundColor: COLORS.newInput,
            fontWeight: 500,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%'
          }}
        >
          {Length.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
                style={{ color: COLORS.text, fontWeight: 500, fontSize: 14 }}
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
          className="form-control "
          value={value}
          style={{
            backgroundColor: COLORS.newInput,
            fontWeight: 500,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%'
          }}
        >
          {Speed.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
                style={{ color: COLORS.text, fontWeight: 500, fontSize: 14 }}
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
          className="form-control "
          value={value}
          style={{
            backgroundColor: COLORS.newInput,
            fontWeight: 500,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%'
          }}
        >
          {Data.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
                style={{ color: COLORS.text, fontWeight: 500, fontSize: 14 }}
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
          className="form-control "
          value={value}
          style={{
            backgroundColor: COLORS.newInput,
            fontWeight: 500,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%'
          }}
        >
          {Time.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
                style={{ color: COLORS.text, fontWeight: 500, fontSize: 14 }}
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
          className="form-control "
          value={value}
          style={{
            backgroundColor: COLORS.newInput,
            fontWeight: 500,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%'
          }}
        >
          {Weight.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
                style={{ color: COLORS.text, fontWeight: 500, fontSize: 14 }}
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
      <div className="form-group col-8">
        <Field
          as="select"
          id={id}
          className="form-control "
          value={value}
          style={{
            backgroundColor: COLORS.newInput,
            fontWeight: 500,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%'
          }}
        >
          {genders.map(({ type, label }) => (
            <option
              key={type}
              value={type}
              style={{ color: COLORS.text, fontWeight: 500, fontSize: 14 }}
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
          className="form-control "
          value={value}
          style={{
            backgroundColor: COLORS.newInput,
            fontWeight: 500,
            border: 'solid',
            borderWidth: 1,
            borderColor: 'gray',
            width: '100%'
          }}
        >
          {Units.map(({ type, units }) => (
            units.map(({ name, unit }) => (
              <option
                key={unit}
                value={unit}
                style={{ color: COLORS.text, fontWeight: 500, fontSize: 14 }}
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
