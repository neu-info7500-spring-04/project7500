// GraphqlService.ts
const GRAPHQL_ENDPOINT = 'https://graphql.bitquery.io/';
const API_KEY = 'BQYxo87FIjcPj10sgbv3byFRqoOYwm4V'; 
const jsonFilePath = '/difficultydata.json';

interface GraphqlResponse<T> {
  data: T;
}

export const getBitcoinBlockData = async (pageNumber?: number) => {
  const query = `
  query MyQuery {
    bitcoin {
      blocks(options: {limit: 10, desc: "timestamp.iso8601"}) {
        blockHash
        blockSize
        blockSizeBigInt
        blockStrippedSize
        blockVersion
        blockWeight
        chainwork
        difficulty
        height
        timestamp {
          iso8601
        }
      }
    }
  }
  `;

  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: GraphqlResponse<any> = await response.json();
    return data.data.bitcoin.blocks;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};



interface HashrateDifficultyResponse {
  
  x:string,y:number
}

export async function getHashrateDifficultyData(): Promise<HashrateDifficultyResponse[]> {
  try {
    
    const response = await fetch(jsonFilePath);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
    const data: HashrateDifficultyResponse[] = await response.json();
      // @ts-ignore
      console.log('data', data.difficulty)
      // @ts-ignore
    return data.difficulty;
  } catch (error) {
    // Handle errors (you can customize this based on your needs)
    console.error('Error fetching data:', error);
    throw error;
  }
}

