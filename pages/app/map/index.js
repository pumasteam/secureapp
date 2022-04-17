import { useState, useEffect } from "react";
import Map from "google-map-react";
import { Text, Button, Tooltip, Image } from "@nextui-org/react";
import Link from "next/link";

const Marker = ({ color, children }) => {
  return (
    <Tooltip content={children}>
      <svg
        width="24"
        height="24"
        style={{
          cursor: "pointer",
          fill: color,
        }}
      >
        <circle cx="12" cy="12" r="10" />
      </svg>
    </Tooltip>
  );
};

const MapPage = ({ data }) => {
  const [coords, setCoords] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => {
      setCoords(p.coords);
    });
  });

  if (!coords.latitude || !coords.longitude)
    return (
      <Text h1 css={{ textAlign: "center" }}>
        Please enable geolocation
      </Text>
    );

  return (
    <section style={{ height: "75vh", width: "100%" }}>
      <Map
        onClick={(e) =>
          setSelected({
            lat: e.lat,
            lng: e.lng,
          })
        }
        bootstrapURLKeys={{ key: "AIzaSyCAwmKDv5ZL9C_VhJE48pX0jnhLqpaR3cs" }}
        defaultCenter={{
          lat: coords?.latitude,
          lng: coords?.longitude,
        }}
        defaultZoom={7}
      >
        {selected.lat && selected.lng && (
          <Marker color="green" lng={selected.lng} lat={selected.lat}>
            <Link
              href={`/app/map/add/${selected.lat}/${selected.lng}`}
              passHref
            >
              <Button as="a">Add new location</Button>
            </Link>
          </Marker>
        )}
        {data.map((item) => (
          <Marker
            key={item.id}
            color="red"
            lng={item.longitude}
            lat={item.latitude}
          >
            <Image src={item.image} width={150} />
            <Text h5 css={{ textAlign: "center" }}>
              {item.name}
            </Text>
            <Link href={`/app/map/${item.id}`}>
              <Button as="a">View more</Button>
            </Link>
          </Marker>
        ))}
      </Map>
    </section>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(`${process.env.URL}/api/map`);
  const data = await res.json();

  return {
    props: {
      data: data?.data,
    },
  };
};

MapPage.auth = true;

export default MapPage;
