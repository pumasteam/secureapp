import { Text, Card } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const { data } = useSession();

  return (
    <>
      <Text h1>{`Hi ${data?.user?.name}`}</Text>
      <Link href="/app/map" passHref>
        <Card as="a" hoverable clickable css={{ margin: "10px" }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              objectFit="cover"
              src="https://wemedia.com/wp-content/uploads/2010/01/Haiti-incident-map.jpg"
              width="100%"
              height={240}
              alt="incidents map"
            />
          </Card.Body>
          <Card.Footer justify="flex-start">
            <Text h3 b>
              Incidents map
            </Text>
          </Card.Footer>
        </Card>
      </Link>
      <Link href="/app/people" passHref>
        <Card as="a" hoverable clickable css={{ margin: "10px" }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              objectFit="cover"
              src="https://my.axerosolutions.com/attachment?file=v0OMKJ5vCIlCqxUKpStRbg%3D%3D"
              width="100%"
              height={240}
              alt="People directory"
            />
          </Card.Body>
          <Card.Footer justify="flex-start">
            <Text h3 b>
              People directory
            </Text>
          </Card.Footer>
        </Card>
      </Link>
      <Link href="/app/camera" passHref>
        <Card as="a" hoverable clickable css={{ margin: "10px" }}>
          <Card.Body css={{ p: 0 }}>
            <Card.Image
              objectFit="cover"
              src="https://blog.bricogeek.com/img_cms/3438-detector-de-perros-con-yolov3-y-raspberry-pi.jpg"
              width="100%"
              height={240}
              alt="Real time camera reports"
            />
          </Card.Body>
          <Card.Footer justify="flex-start">
            <Text h3 b>
              Real time camera reports
            </Text>
          </Card.Footer>
        </Card>
      </Link>
    </>
  );
};

Home.auth = true;

export default Home;
