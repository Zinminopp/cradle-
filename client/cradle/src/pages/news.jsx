import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    useTheme,
    Box,
    Container,
    Grid,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
  } from '@mui/material';
import Navbar from '../components/navbar';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const theme = useTheme();

  useEffect(() => {
    const apiKey = '3de4e35a34b84e39971d570b784eda0c';
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;

    axios
      .get(newsApiUrl)
      .then((response) => {
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category]);

  return (
    <Box>
        <Box display={'flex'}>
         <Navbar />
        </Box>
        <Box>
          <Container maxWidth="lg" backgroundColor="#FFFAFA">
              <Grid container spacing={3}>
                  <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                      <InputLabel id="category-label"sx={{ color: 's2B1B17', backgroundColor: theme.palette.neutral.main }}>Select Category</InputLabel>
                      <Select
                      labelId="category-label"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Select Category"
                      >
                      <MenuItem value="general">General</MenuItem>
                      <MenuItem value="business">Business</MenuItem>
                      <MenuItem value="entertainment">Entertainment</MenuItem>
                      <MenuItem value="health">Health</MenuItem>
                      <MenuItem value="science">Science</MenuItem>
                      <MenuItem value="sports">Sports</MenuItem>
                      <MenuItem value="technology">Technology</MenuItem>
                      </Select>
                  </FormControl>
                  </Grid>
                  {news.map((article, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                          <Paper elevation={3}>
                              <a href={article.url} target="_blank" rel="noopener noreferrer">
                                  <img src={article.urlToImage} alt={article.title} width="100%" height="auto" />
                                  <Typography variant="h6" gutterBottom sx={{ color: theme.palette.neutral.main}}>
                                      {article.title}
                                  </Typography>
                                  <Typography variant="body2" sx={{ color: theme.palette.neutral.main }}>
                                      {article.description}
                                  </Typography>
                              </a>
                          </Paper>
                      </Grid>
                  ))}
              </Grid>
          </Container>
        </Box>
    </Box>

  );
};



export default NewsPage;
