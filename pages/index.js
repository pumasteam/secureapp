import { Text, Image, Button } from "@nextui-org/react";
import { useSession, signIn } from "next-auth/react";
import LoadingButton from "../components/LoadingButton";
import Link from "next/link";

const Home = () => {
  const { status } = useSession();

  return (
    <>
      <Image
        width={600}
        height={300}
        src="https://images.pexels.com/photos/4791815/pexels-photo-4791815.jpeg"
        alt="Protest image"
        objectFit="cover"
      />
      <Text
        h1
        size="3.75rem"
        css={{
          textAlign: "center",
        }}
      >
        We give you a suite of{" "}
        <Text span color="success">
          security tools
        </Text>{" "}
        for your community
      </Text>
      <section
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: "2rem",
        }}
      >
        {status == "loading" ? (
          <LoadingButton />
        ) : status == "unauthenticated" ? (
          <Button size="xl" color="success" onClick={() => signIn("google")}>
            Log In
          </Button>
        ) : (
          <Link href="/app" passHref>
            <Button size="xl" color="success" as="a">
              Start now
            </Button>
          </Link>
        )}
        <Button
          as="a"
          href="https://devpost.com/software/secureapp"
          target="_BLANK"
          rel="noopener noreferrer"
          size="xl"
          color="secondary"
        >
          Learn more
        </Button>
      </section>
    </>
  );
};

export default Home;
