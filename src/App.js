import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Button,
  createTheme,
  ThemeProvider,
  Toolbar,
  AppBar,
  CssBaseline
} from '@mui/material';

const theme = createTheme({
  palette: {
    background: {
      default: '#e0f7fa',
    },
  },
});

const App = () => {
  const [items, setItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState(7);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 15);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
     {/* Navbar */}
      <AppBar position="static">
        <Container maxWidth="md">
          <Toolbar style={{ justifyContent: 'center' }}>
            <Typography variant="h5" style={{ textAlign: 'center' }}>
              Api App: Fetching data from JSON Placeholder Api using axios
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

    {/* Paper containing fetched data */}
      <Container maxWidth="md" style={{ marginTop: '20px' }}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            List of Items:
          </Typography>
          <List>
            {items.slice(0, visibleItems).map((item) => (
              <ListItem key={item.id} disableGutters style={{ borderBottom: '1px solid #ddd' }}>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
          {visibleItems < items.length && (
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              onClick={handleLoadMore}
            >
              Load More
            </Button>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default App;
