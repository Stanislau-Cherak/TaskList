import React from 'react';

import { Radio, RadioGroup, FormControlLabel, Box } from '@mui/material';

interface RadioButtonsProps {
  preFilter: string,
  onChange: (value: string) => void
}

const RadioButtons: React.FC<RadioButtonsProps> = ({ preFilter, onChange }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onChange((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <RadioGroup
        row
        sx={{
          display: 'flex',
          mb: 5,
          justifyContent: 'space-around'
        }}

        aria-labelledby='controlled-radio-buttons-group'
        name='controlled-radio-buttons-group'
        value={preFilter}
        onChange={handleChange}
      >
        <FormControlLabel
          value='all'
          control={<Radio />}
          label='All'
        />
        <FormControlLabel
          value='active'
          control={<Radio />}
          label='Active'
        />
        <FormControlLabel
          value='done'
          control={<Radio />}
          label='Done'
        />
      </RadioGroup>
    </>
  )
}

export default RadioButtons;
