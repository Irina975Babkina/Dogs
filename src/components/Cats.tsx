import { Button, CardActionArea, CardActions, CardContent, Stack, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import React, { useEffect, useState } from 'react';
import Copyright from './Copyright';
import ErrorPage from './ErrorPage';
import Header from './Header';
import Loading from './Loading';


interface Cat {
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

const CatsList: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=100&api_key=live_OMTMoJ6hlIaS7p75QfY0M7r6NeTvdaWVS2FSsGhYfKI0qEtXEFl4qWusC7c0aXa7`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Cat[] = await response.json();
        setCats(data);
      } catch (error) {
        setError('An error occurred while fetching the data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page]); 

  if (isLoading) return <Loading/>
  if (error) return <ErrorPage />;


  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Stack m={{xs: "1rem", sm: "1.5rem", md: "2rem"}} justifyContent="center" alignItems="center">
        <Header />
        <Grid container spacing={3} marginTop={{xs: "0rem", md:"2rem"}}>
          {cats.map((cat) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={cat.id}>
                <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <CardActionArea style={{ cursor: 'default' }}>                    
                    <CardMedia
                    component="img"
                    src={`${cat.url}?w=248&fit=crop&auto=format`}

                    style={{ width: '90%', height: '300px', objectFit: 'contain', margin: "10px auto 0" }}
                    alt={"Cat"}             
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {cat?.breeds?.[0]?.name }
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Temperament: {cat?.breeds?.[0]?.temperament ?? ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Life Span: {cat?.breeds?.[0]?.life_span ?? ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Weight (lb): {cat?.breeds?.[0]?.weight.imperial ?? ''}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Weight (kg): {cat?.breeds?.[0]?.weight.metric ?? ''}
                        </Typography>
                    </CardContent> 
                </CardActionArea>
                <CardActions>
                    <a
                    href={`https://en.wikipedia.org/wiki/${cat?.breeds?.[0]?.name}`}
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
        <Copyright />
    </Stack>
  );
};

export default CatsList;