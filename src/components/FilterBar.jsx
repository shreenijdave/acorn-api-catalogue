import React from 'react';
import {
  Box,
  TextField,
  Button,
  Autocomplete
} from '@mui/material';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// FilterBar Component
// Renders content filters (type, category, tag, search input, and reset button)
const FilterBar = ({ filters, setFilters, allTypes, allCategories, allTags }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        mb: 3,
        alignItems: 'flex-end',
      }}
    >
    
    {/* Content Type Filter */}
    <Autocomplete
      options={allTypes}
      value={filters.type}
      onChange={(e, newValue) => setFilters({ ...filters, type: newValue || '' })}
      renderInput={(params) => (
        <TextField {...params} label="Content Type" placeholder="Type or select" variant="outlined"
          sx={{
            '& .MuiInputBase-root': {
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.2s',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2', // primary color
            borderWidth: '2px',
          },
          }}
        />
      )}
      fullWidth
      clearOnEscape
      freeSolo
      sx={{
        minWidth: { xs: '100%', sm: 240 },
        flex: '1 1 auto',
      }}
    />


    {/* Category Filter */}
    <Autocomplete
      options={allCategories}
      value={filters.category}
      onChange={(e, newValue) => setFilters({ ...filters, category: newValue || '' })}
      renderInput={(params) => (
        <TextField {...params} label="Category" placeholder="Type or select" 
          sx={{
          '& .MuiInputBase-root': {
            borderRadius: 2,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'all 0.2s',
          },
          '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#1976d2', // primary color
          borderWidth: '2px',
          },
          }}
        />
      )}
          
          clearOnEscape
          freeSolo
          sx={{
            minWidth: { xs: '100%', sm: 240 },
            flex: '1 1 auto',
          }}
    />

    {/* Tag Filter */}
        <Autocomplete
          options={allTags}
          value={filters.tag}
          onChange={(e, newValue) => setFilters({ ...filters, tag: newValue || '' })}
          renderInput={(params) => (
            <TextField {...params} label="Tag" placeholder="Type or select" sx={{
              '& .MuiInputBase-root': {
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1976d2', // primary color
            borderWidth: '2px',
          },
          }} 
        />
        )}
          
        clearOnEscape
        freeSolo
        sx={{
        minWidth: { xs: '100%', sm: 240 },
        flex: '1 1 auto',
        }}
        />

        {/* Search By Name */}
        <TextField
          label="Search by name"
          placeholder="Enter course name"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          variant="outlined"
          fullWidth
          sx={{
            minWidth: { xs: '100%', sm: 240 },
            flex: '1 1 auto',
            '& .MuiInputBase-root': {
              borderRadius: 2,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              transition: 'all 0.2s ease-in-out',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976d2',
              borderWidth: '2px',
            },
          }}
        />

        {/* Reset Filters Button */}
        <Button
          variant="outlined"
          size="small"
          startIcon={<RestartAltIcon />}
          onClick={() => setFilters({ type: '', category: '', tag: '', search: '' })}
          sx={{
            height: 40,
            borderRadius: '20px',
            textTransform: 'none',
            px: 2,
            fontWeight: 500,
            color: '#1976d2',
            borderColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#e3f2fd',
              borderColor: '#1976d2',
            },
          }}
        >
          Reset Filters
        </Button>
      </Box>
  );
};

export default FilterBar;
