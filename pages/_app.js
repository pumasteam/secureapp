import { Loading, Container, NextUIProvider } from "@nextui-org/react";
import { SessionProvider, useSession, signIn } from "next-auth/react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Auth = ({ children, isRequired }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Loading
        type="spinner"
        size="xl"
        color="currentColor"
        css={{
          margin: "auto",
        }}
      />
    );
  }

  if (isRequired && !session) {
    signIn("google");
  }

  return children;
};

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Head>
          <title>SecureApp</title>
        </Head>
        <Container
          sm
          css={{
            maxWidth: "960px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: "100vh",
          }}
        >
          <Header />
          <Auth isRequired={Component.auth}>
            <Component {...pageProps} />
          </Auth>
          <Footer />
        </Container>
      </NextUIProvider>
    </SessionProvider>
  );
};

export default App;
