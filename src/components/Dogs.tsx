
import { Button, CardActionArea, CardActions, Stack, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Copyright from './Copyright';
import ErrorPage from './ErrorPage';
import Header from './Header';
import Loading from './Loading';
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

const Dogs: React.FC = () => {
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchValue, setSearchValue] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const itemsPerPage = 12; 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_OMTMoJ6hlIaS7p75QfY0M7r6NeTvdaWVS2FSsGhYfKI0qEtXEFl4qWusC7c0aXa7`);
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
    }, []);

    if (isLoading) return <Loading />
    if (error) return <ErrorPage />;

    const searchedDogs = dogs.filter(dog => {
      return dog?.breeds?.[0]?.name.toLowerCase().startsWith(searchValue.toLowerCase());
    });

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

   // Filter dogs with at least one breed and sort them alphabetically by breed name
   const filteredDogs = searchedDogs
   .filter(dog => dog?.breeds?.length > 0)
   .sort((a, b) => {
       if (a.breeds[0].name < b.breeds[0].name) return -1;
       if (a.breeds[0].name > b.breeds[0].name) return 1;
       return 0;
   });

  // Calculate the number of pages
  const pageCount = Math.ceil(filteredDogs.length / itemsPerPage);

  // Get the dogs for the current page
  const displayedDogs = filteredDogs.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
      <Stack m={{ xs: "1rem", sm: "1.5rem", md: "2rem" }} justifyContent="center" alignItems="center">
          <Header />
          <TextField 
            sx={{ width: { xs: '70%', sm: '60%', md: '40%' }, margin: '10px 0 20px' }}
            label="search" 
            type="search"  
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <Grid container spacing={3}>
          {displayedDogs.map((dog) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
                      <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                          <CardActionArea style={{ cursor: 'default' }}>
                              <CardMedia
                                  component="img"
                                  src={`${dog.url}?w=248&fit=crop&auto=format`}
                                  style={{ width: '90%', height: '300px', objectFit: 'contain', margin: "10px auto 0"}}
                                  alt={"Dog"}
                              />
                              <CardContent>
                                  <Typography gutterBottom variant="h5" component="div">
                                      {dog?.breeds?.[0]?.name}
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
          <Stack spacing={1} marginTop={{ xs: "1rem", sm: "2rem", md: "3rem" }} justifyContent="center">
              <Pagination
                  count={pageCount}
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
          <Copyright />
      </Stack>
  );
};

export default Dogs;
