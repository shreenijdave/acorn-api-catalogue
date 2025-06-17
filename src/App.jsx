// React and Hooks
import React, { useEffect, useState } from "react";

// Material UI Components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import RestartAltIcon from '@mui/icons-material/RestartAlt'; 
import Autocomplete from "@mui/material/Autocomplete";

import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

// Custom Components
import FilterBar from './components/FilterBar';
import ContentCard from "./components/ContentCard";
import ContentModal from "./components/ContentModal";
import { fetchCatalogueItems } from "./api/content";

const App = () => {
  // All content items from the API
  const [items, setItems] = useState([]);
  
  // Filtered content based on user input
  const [filteredItems, setFilteredItems] = useState([]);
  
  // Active filter values
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    tag: "",
    search: "",
  });

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Item selected for modal preview
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch data on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCatalogueItems();
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        setError("Failed to load catalogue");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Apply filters whenever items or filters change
  useEffect(() => {
    let result = [...items];

    if (filters.type) {
      result = result.filter(
        (item) => item.contenttype?.toLowerCase() === filters.type.toLowerCase()
      );
    }

    if (filters.category) {
      result = result.filter(
        (item) =>
          item.category?.name?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.tag) {
      result = result.filter((item) =>
        (item.tags || []).some(
          (tag) => tag.name.toLowerCase() === filters.tag.toLowerCase()
        )
      );
    }

    if (filters.search) {
      result = result.filter((item) =>
        item.fullname?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    setFilteredItems(result);
  }, [filters, items]);

  // Extract unique values for filters
  const allTypes = [...new Set(items.map((item) => item.contenttype || ""))];
  const allCategories = [
    ...new Set(items.map((item) => item.category?.name).filter(Boolean)),
  ];

  const allTags = [
    ...new Set(
      items.flatMap((item) => (item.tags || []).map((tag) => tag.name))
    ),
  ];

  return (
    <Box>
      {/* Fixed header */} 
      <AppBar position="fixed" sx={{ bgcolor: '#000' }}>
        <Toolbar sx={{ justifyContent: 'center', gap: 1 }}>
          <Typography variant="h6">Filter Catalogue</Typography>
        </Toolbar>
      </AppBar>

      {/* Spacer to offset fixed AppBar */}
      <Box sx={{ height: 104 }} /> 
      
      {/* Main content container */}
      <Container>
        {/* Filter bar component */}
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          allTypes={allTypes}
          allCategories={allCategories}
          allTags={allTags}
        />
        
        {/* Loading and error handling */}
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {!loading && filteredItems.length === 0 && (
          <Typography>No content found.</Typography>
        )}

        {/* Content preview grid */}
        <Grid container spacing={2}>
          {filteredItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.contentid}>
              <ContentCard item={item} onClick={() => setSelectedItem(item)} />
            </Grid>
          ))}
        </Grid>

        {/* Modal to preview course details */}
        <ContentModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      </Container>

      <Box sx={{ height: 20 }} /> 
  </Box>
  );
};

export default App;
