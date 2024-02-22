import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Button, Typography, Card } from '@mui/material';
import Footer from 'src/components/Footer';

import { useState, useEffect } from 'react';
import { BlockData } from 'src/models/crypto_order';
import { getBitcoinBlockData } from 'src/service/BitcoinTranscationService';
import RecentOrdersTable from './RecentOrdersTable';

function ApplicationsTransactions() {
  const [transactions, setTransactions] = useState<BlockData[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const bitcoinTransactions = await getBitcoinBlockData();
      setTransactions(bitcoinTransactions);
    } catch (error) {
      // Handle error
    }
    setLoading(false);
  };
  return (
    <>
      <Helmet>
        <title>Transactions - Applications</title>
      </Helmet>
      <PageTitleWrapper>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h3" gutterBottom>
              Block
            </Typography>
            <Typography variant="subtitle2">
              These are Bitcoin Block Transcation
            </Typography>
          </Grid>
          <Grid item>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              onClick={() => fetchData()}
              variant="contained"
            >
              Refresh Data
            </Button>
          </Grid>
        </Grid>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <RecentOrdersTable cryptoOrders={transactions} />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ApplicationsTransactions;
