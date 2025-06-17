// src/App.jsx
import Autocomplete from '@mui/material/Autocomplete';
import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, CircularProgress, Box, TextField, MenuItem } from '@mui/material';
import ContentCard from './components/ContentCard';
import ContentModal from './components/ContentModal';
import { fetchCatalogueItems } from './api/content';

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({ type: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCatalogueItems();
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        setError('Failed to load catalogue');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    let result = [...items];
    if (filters.type) {
      result = result.filter(
        (item) => item.contenttype?.toLowerCase() === filters.type.toLowerCase()
      );
    }
    setFilteredItems(result);
  }, [filters, items]);

  const allTypes = [...new Set(items.map((item) => item.contenttype || ''))];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Acorn Catalogue</Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Autocomplete
  options={allTypes}
  value={filters.type}
  onChange={(e, newValue) => setFilters({ ...filters, type: newValue || '' })}
  renderInput={(params) => (
    <TextField {...params} label="Content Type" placeholder="Search or select…" />
  )}
  clearOnEscape
  freeSolo
  sx={{ minWidth: 240 }}
/>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && filteredItems.length === 0 && (
        <Typography>No content found.</Typography>
      )}

      <Grid container spacing={2}>
        {filteredItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.contentid}>
            <ContentCard item={item} onClick={() => setSelectedItem(item)} />
          </Grid>
        ))}
      </Grid>

      <ContentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </Container>
  );
};

export default App;
