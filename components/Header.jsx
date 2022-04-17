import { Text, Button, Avatar, Tooltip } from "@nextui-org/react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import LoadingButton from "./LoadingButton";

const Header = () => {
  const { status, data } = useSession();

  return (
    <header
      style={{
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Link href="/" passHref>
        <Text as="a" h1 weight="bold" size="40px">
          SecureApp
        </Text>
      </Link>
      {status == "loading" ? (
        <LoadingButton />
      ) : status == "authenticated" ? (
        <>
          <Tooltip
            content={
              <section
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text weight="bold">{data?.user?.name}</Text>
                <Text css={{ marginBottom: "10px" }}>{data?.user?.email}</Text>
                <Button color="error" onClick={signOut}>
                  Log Out
                </Button>
              </section>
            }
            placement="bottom"
          >
            <Avatar src={data?.user?.image} />
          </Tooltip>
        </>
      ) : (
        <Button size="lg" onClick={() => signIn("google")}>
          Log In
        </Button>
      )}
    </header>
  );
};

export default Header;
