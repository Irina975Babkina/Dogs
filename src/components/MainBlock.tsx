import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.thedogapi.com/v1/images/search?limit=100&api_key=live_OMTMoJ6hlIaS7p75QfY0M7r6NeTvdaWVS2FSsGhYfKI0qEtXEFl4qWusC7c0aXa7");
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2> List</h2>
      <Grid container spacing={3}>
      {dogs.map((dog) => dog?.breeds?.length > 0 && (
          <Grid item xs={12} sm={6} md={4} lg={3} key={dog.id}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                    component="img"
                    src={`${dog.url}?w=248&fit=crop&auto=format`}
                    style={{ width: '100%', height: '200px', objectFit: 'contain' }}
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default DogsList;