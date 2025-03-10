import React from 'react';
import { TextField, Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { sharedStyles } from '../styles';
import MyDatePicker from './MyDatePicker';
import { useAppContext } from '../contexts/AppContext';

const getTargetTime = (quotaType, accommodationClass) => {
  if (quotaType === 'GENERAL') return '07:59:53';
  if (['SL', 'FC', '2S', 'VS'].includes(accommodationClass)) return '10:59:53';
  return '09:59:53';
};

const formatStationCode = (value) => value.toUpperCase().replace(/[^A-Z]/g, '');
const formatTrainNumber = (value) => value.replace(/\D/g, '');

function TrainDetails() {
  const { formData, setFormData, handleChange } = useAppContext();

  const handleStationCode = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: formatStationCode(value) });
  };

  const handleTrainNumber = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: formatTrainNumber(value) });
  };

  const handleQuotaTypeChange = (event) => {
    const { value } = event.target;
    const targetTime = getTargetTime(value, formData?.accommodationClass);
    setFormData({ ...formData, quotaType: value, targetTime });
  };

  const handleAccommodationClassChange = (event) => {
    const { value } = event.target;
    const targetTime = getTargetTime(formData?.quotaType, value);
    setFormData({ ...formData, accommodationClass: value, targetTime });
  };

  return (
    <Box sx={sharedStyles.container}>
      <Typography
        variant='h5'
        gutterBottom
        align='center'
        sx={{ fontWeight: 'bold', color: '#333', mb: 3 }}
      >
        Train Details
      </Typography>
      <MyDatePicker formData={formData} handleChange={handleChange} />
      <TextField
        fullWidth
        label='Train Number'
        id='trainNumber'
        name='trainNumber'
        value={formData.trainNumber}
        onChange={handleTrainNumber}
        margin='normal'
        required
        variant='outlined'
        placeholder='Enter train number i.e. 11061'
        slotProps={{
          input: {
            sx: sharedStyles.input, // Apply shared input styles
          },
        }}
      />
      <TextField
        fullWidth
        label='From'
        id='from'
        name='from'
        value={formData.from}
        onChange={handleStationCode}
        margin='normal'
        required
        variant='outlined'
        placeholder='Enter origin station code i.e. LTT'
        slotProps={{
          input: {
            sx: sharedStyles.input, // Apply shared input styles
          },
        }}
      />
      <TextField
        fullWidth
        label='To'
        id='to'
        name='to'
        value={formData.to}
        onChange={handleStationCode}
        margin='normal'
        required
        variant='outlined'
        placeholder='Enter destination station code i.e. BSB'
        slotProps={{
          input: {
            sx: sharedStyles.input, // Apply shared input styles
          },
        }}
      />
      <FormControl fullWidth margin='normal'>
        <InputLabel id='quotaType-label'>Quota Type</InputLabel>
        <Select
          labelId='quotaType-label'
          id='quotaType'
          name='quotaType'
          value={formData.quotaType}
          onChange={handleQuotaTypeChange}
          label='Quota Type'
          variant='outlined'
          sx={{ backgroundColor: 'white' }}
        >
          <MenuItem value='GENERAL'>GENERAL</MenuItem>
          <MenuItem value='TATKAL'>TATKAL</MenuItem>
          <MenuItem value='PREMIUM TATKAL'>PREMIUM TATKAL</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <InputLabel id='accommodationClass-label'>
          Accommodation Class
        </InputLabel>
        <Select
          labelId='accommodationClass-label'
          id='accommodationClass'
          name='accommodationClass'
          value={formData.accommodationClass}
          onChange={handleAccommodationClassChange}
          label='Accommodation Class'
          variant='outlined'
          sx={{ backgroundColor: 'white' }}
        >
          <MenuItem value='SL'>Sleeper (SL)</MenuItem>
          <MenuItem value='3A'>AC 3 Tier (3A)</MenuItem>
          <MenuItem value='2A'>AC 2 Tier (2A)</MenuItem>
          <MenuItem value='1A'>AC First Class (1A)</MenuItem>
          <MenuItem value='3E'>AC 3 Economy (3E)</MenuItem>
          <MenuItem value='EC'>Exec. Chair Car (EC)</MenuItem>
          <MenuItem value='CC'>AC Chair car (CC)</MenuItem>
          <MenuItem value='EV'>Vistadome AC (EV)</MenuItem>
          <MenuItem value='2S'>Second Sitting (2S)</MenuItem>
          <MenuItem value='FC'>First Class (FC)</MenuItem>
          <MenuItem value='VC'>Vistadome Chair Car (VC)</MenuItem>
          <MenuItem value='VS'>Vistadome Non AC (VS)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default TrainDetails;
