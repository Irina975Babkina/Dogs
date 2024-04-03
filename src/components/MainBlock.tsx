import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import React, { useEffect, useState } from 'react';

interface Dog {
    id: number;
    url: string;
  }

const DogsList: React.FC = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=50&breed_ids=beng&api_key=live_ygAzh3cysTZXmcRR53kBWJtYOS4DwjjD0mA4smj7VARmPc22kdtyJgwcGj4VCkaE");
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
  }, []); // This effect runs once on mount

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2> List</h2>
      <ImageList sx={{ width: 800, height: 750 }}>
      {dogs.map((dog) => (
        <ImageListItem key={dog.id}>
          <img
            srcSet={`${dog.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${dog.url}?w=248&fit=crop&auto=format`}
            alt={"dog"} // REPLACE
            loading="lazy"
          />
          <ImageListItemBar
            title={dog.id}
            // subtitle={<span>by: {item.author}</span>} // REPLACE
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
};

export default DogsList;