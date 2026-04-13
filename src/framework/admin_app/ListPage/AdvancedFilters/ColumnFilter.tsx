import React, { useState, MouseEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { useSearchParams } from 'react-router-dom';
import { TableHeaderItem } from '../types';

interface ColumnFilterProps {
  header: TableHeaderItem;
}

export default function ColumnFilter({ header }: ColumnFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  // Parse existing filter for this field if any
  // URL params look like: fieldName[operator][type]=value
  let initialOperator = 'eq';
  let initialValue = '';
  // Try to find the param using query string parsing logic simply
  searchParams.forEach((value, key) => {
    if (key.startsWith(`${header.field}[`)) {
      const match = key.match(/\[(.*?)\]/);
      if (match && match[1]) {
        initialOperator = match[1];
        initialValue = value;
      }
    }
  });

  const [operator, setOperator] = useState(initialOperator);
  const [value, setValue] = useState(initialValue);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'filter-popover' : undefined;

  const handleApply = () => {
    const newParams = new URLSearchParams(searchParams);
    
    // Remove existing filters for this field
    const keysToRemove: string[] = [];
    newParams.forEach((val, key) => {
      if (key.startsWith(`${header.field}[`)) {
        keysToRemove.push(key);
      }
    });
    keysToRemove.forEach(key => newParams.delete(key));

    if (value !== '') {
      let typeStr = 'str';
      if (header.type === 'number') {
        typeStr = 'num';
      }
      // For boolean we could add 'boo', but currently not in types
      newParams.set(`${header.field}[${operator}][${typeStr}]`, value);
      // Reset to page 0 on apply
      newParams.set('page', '0');
    }

    setSearchParams(newParams);
    handleClose();
  };

  const handleClear = () => {
    const newParams = new URLSearchParams(searchParams);
    const keysToRemove: string[] = [];
    newParams.forEach((val, key) => {
      if (key.startsWith(`${header.field}[`)) {
        keysToRemove.push(key);
      }
    });
    keysToRemove.forEach(key => newParams.delete(key));
    
    setValue('');
    setSearchParams(newParams);
    handleClose();
  };

  // Determine available operators based on field type
  const isNumber = header.type === 'number';
  const isDate = header.type === 'date';
  
  const operators = [
    { value: 'eq', label: 'Equals (==)' },
    { value: 'ne', label: 'Not Equals (!=)' },
    ...(isNumber || isDate ? [
      { value: 'gt', label: 'Greater Than (>)' },
      { value: 'ge', label: 'Greater or Equal (>=)' },
      { value: 'lt', label: 'Less Than (<)' },
      { value: 'le', label: 'Less or Equal (<=)' },
    ] : [])
  ];

  const isActive = initialValue !== '';

  return (
    <>
      <IconButton 
        size="small" 
        onClick={handleClick}
        color={isActive ? "primary" : "default"}
      >
        <FilterListIcon fontSize="small" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2, minWidth: 200 }}>
          <Typography variant="subtitle2">Filter {header.name}</Typography>
          
          <TextField
            select
            label="Operator"
            value={operator}
            onChange={(e) => setOperator(e.target.value)}
            size="small"
            fullWidth
          >
            {operators.map((op) => (
              <MenuItem key={op.value} value={op.value}>
                {op.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Value"
            type={isDate ? 'date' : isNumber ? 'number' : 'text'}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            size="small"
            fullWidth
            InputLabelProps={isDate ? { shrink: true } : undefined}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1 }}>
            <Button size="small" onClick={handleClear} color="error">
              Clear
            </Button>
            <Button size="small" variant="contained" onClick={handleApply}>
              Apply
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
}
