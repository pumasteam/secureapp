import { Text, Button, Card } from "@nextui-org/react";
import Link from "next/link";

const People = ({ data }) => {
  return (
    <>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexWrap: "wrap",
        }}
      >
        <Text h1>People directory</Text>
        <Link href="/app/people/add">
          <Button>Add someone</Button>
        </Link>
      </section>
      <section
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {data &&
          data.map((item) => (
            <Card key={item.id} css={{ width: "320px" }}>
              <Card.Body css={{ p: 0 }}>
                <Card.Image
                  objectFit="cover"
                  src={item.image}
                  width="100%"
                  height={140}
                  alt={item.name}
                />
              </Card.Body>
              <Card.Footer justify="center" css={{ flexDirection: "column" }}>
                <Text css={{ textAlign: "center" }} h4 b>
                  {item.name}
                </Text>
                <Text css={{ textAlign: "center" }}>{item.status}</Text>
                <Text css={{ textAlign: "center" }}>{item.description}</Text>
              </Card.Footer>
            </Card>
          ))}
      </section>
    </>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.URL}/api/person`);
  const data = await res.json();

  return {
    props: {
      data: data?.data,
    },
  };
};

People.auth = true;

export default People;
