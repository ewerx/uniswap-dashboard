import { Grid } from "@nextui-org/react";
import ClientOnly from "./ClientOnly";
import PoolsTable from "./PoolsTable";
import TokensTable from "./TokensTable";
import TransactionsTable from "./TransactionsTable";

const Dashboard = () => {
  return (
    <ClientOnly>
      <Grid.Container gap={2}>
        <Grid xs={12} md={6}>
          <TokensTable />
        </Grid>
        <Grid xs={12} md={6}>
          <PoolsTable />
        </Grid>
        <Grid xs={12}>
          <TransactionsTable />
        </Grid>
      </Grid.Container>
    </ClientOnly>
  );
};

export default Dashboard;
