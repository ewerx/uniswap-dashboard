import { Container, Grid, Text } from "@nextui-org/react";
import ClientOnly from "./ClientOnly";
import PoolsTable from "./PoolsTable";
import TokensTable from "./TokensTable";
import TransactionsTable from "./TransactionsTable";

const Dashboard = () => {
  return (
    <ClientOnly>
      <Grid.Container gap={2}>
        <Grid xs={12} md={6}>
          <Container>
            <Text h5>Tokens</Text>
            <TokensTable />
          </Container>
        </Grid>
        <Grid xs={12} md={6}>
          <Container>
            <Text h5>Pools</Text>
            <PoolsTable />
          </Container>
        </Grid>
        <Grid xs={12}>
          <Container>
            <Text h5>Transactions</Text>
            <TransactionsTable />
          </Container>
        </Grid>
      </Grid.Container>
    </ClientOnly>
  );
};

export default Dashboard;
