// src/App.jsx
import Autocomplete from "@mui/material/Autocomplete";
import React, { useEffect, useState } from "react";
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
import ContentCard from "./components/ContentCard";
import ContentModal from "./components/ContentModal";
import { fetchCatalogueItems } from "./api/content";

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    tag: "",
    search: "",
  });
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
        setError("Failed to load catalogue");
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
    <Container>
      <Typography variant="h4" gutterBottom>
        Acorn Catalogue
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
          alignItems: "center",
          minWidth: { xs: "100%", sm: 220 },
        }}
      >
        {/* Content Type Combobox */}
        <Autocomplete
          options={allTypes}
          value={filters.type}
          onChange={(e, newValue) =>
            setFilters({ ...filters, type: newValue || "" })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Content Type"
              placeholder="Type or select"
            />
          )}
          sx={{ minWidth: 220 }}
          clearOnEscape
          freeSolo
        />

        {/* Category Combobox */}
        <Autocomplete
          options={allCategories}
          value={filters.category}
          onChange={(e, newValue) =>
            setFilters({ ...filters, category: newValue || "" })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              placeholder="Type or select"
            />
          )}
          sx={{ minWidth: 220 }}
          clearOnEscape
          freeSolo
        />

        {/* Tag Combobox */}
        <Autocomplete
          options={allTags}
          value={filters.tag}
          onChange={(e, newValue) =>
            setFilters({ ...filters, tag: newValue || "" })
          }
          renderInput={(params) => (
            <TextField {...params} label="Tag" placeholder="Type or select" />
          )}
          sx={{ minWidth: 220 }}
          clearOnEscape
          freeSolo
        />

        {/* Name Search */}
        <TextField
          label="Search by name"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          placeholder="Enter course name"
          sx={{ minWidth: 220 }}
        />
      </Box>
      <Button
        variant="outlined"
        onClick={() =>
          setFilters({ type: "", category: "", tag: "", search: "" })
        }
      >
        Reset Filters
      </Button>

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
