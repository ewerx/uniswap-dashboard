import { Card, Container, Loading, Row } from "@nextui-org/react";

const TableLoading = () => {
  return (
    <Container>
      <Card css={{ minWidth: "100%", height: "calc($space$14 * 10)" }}>
        <Card.Body>
          <Row justify="center" align="center" fluid>
            <Loading type="points-opacity" />
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TableLoading;
