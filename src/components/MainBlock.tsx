import { Box, Button, CardActionArea, CardActions, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';

interface Dog {
    id: string;
    url: string;
    breeds: Breed[];
  }
  interface Breed {
    id: string;
    weight: Weight;
    name: string;
    temperament: string;
    life_span: string;
  }

  interface Weight {
    imperial: string;
    metric: string;
  }

const DogsList: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=20&page=${page}&api_key=live_OMTMoJ6hlIaS7p75QfY0M7r6NeTvdaWVS2FSsGhYfKI0qEtXEFl4qWusC7c0aXa7`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Dog[] = await response.json();
        setDogs(data);
      } catch (error) {
        setError('An error occurred while fetching the data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]); 

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack justifyContent="center">
      <Grid container spacing={3}>
      {dogs.map((dog) => dog?.breeds?.length > 0 && (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
            <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardActionArea 
                component="a" 
                href={`https://en.wikipedia.org/wiki/${dog?.breeds?.[0]?.name}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >                    
                <CardMedia
                component="img"
                src={`${dog.url}?w=248&fit=crop&auto=format`}
                style={{ width: '100%', height: '300px', objectFit: 'contain' }}
                alt={"Dog"}
                
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {dog?.breeds?.[0]?.name }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Temperament: {dog?.breeds?.[0]?.temperament ?? ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Life Span: {dog?.breeds?.[0]?.life_span ?? ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Weight (lb): {dog?.breeds?.[0]?.weight.imperial ?? ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Weight (kg): {dog?.breeds?.[0]?.weight.metric ?? ''}
                    </Typography>
                </CardContent> 
              </CardActionArea>
              <CardActions>
                <a
                  href={`https://en.wikipedia.org/wiki/${dog?.breeds?.[0]?.name}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Button>More on Wikipedia</Button>
                </a>    
                </CardActions>  
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack spacing={1} marginTop={{xs: "1rem", sm: "2rem", md: "3rem"}} justifyContent="center">
        <Pagination
          count={10}
          shape="rounded"
          color="primary"
          page={page}
          onChange={handlePageChange}
          sx={{
            '.MuiPagination-ul': {
              justifyContent: 'center',
            },
            '@media (max-width:600px)': {
              size: 'small', 
            },
            '@media (min-width:600px)': {
              size: 'large', 
            },
          }}
        />
      </Stack>
      <Box mt={3} sx={{width:"100%", paddingBottom: "1.5rem", paddingTop:{xs: "1rem", sm: "2rem", md: "3rem"}}}>
        <Typography align="center" color="#5b4a44" fontSize="calc(7px + 1vmin)">
          © {new Date().getFullYear()} Irina Babkina & Aleksandra Lysachok. All Rights Reserved.
        </Typography>
      </Box>
    </Stack>
  );
};

export default DogsList;