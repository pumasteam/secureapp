import { Text, Image } from "@nextui-org/react";
import { PayPalButton } from "react-paypal-button-v2";
import toast, { Toaster } from "react-hot-toast";
import confetti from "canvas-confetti";

const Details = ({ data }) => {
  console.log(data);
  return (
    <>
      <Image width={300} src={data.image} />
      <Text css={{ textAlign: "center" }} h1>
        {data.name}
      </Text>
      <Text p css={{ textAlign: "center" }}>
        {data.description}
      </Text>
      {data.pay && (
        <>
          <Text h3 css={{ textAlign: "center", margin: "10px" }}>
            {`Make a donation! amount: $${data.goal}`}
          </Text>
          <section
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PayPalButton
              amount={data.goal}
              onSuccess={(details) => {
                confetti({
                  particleCount: 500,
                  spread: 150,
                  origin: { y: 0 },
                });
                toast.success(
                  "Transaction completed by " +
                    details.payer.name.given_name +
                    " for $" +
                    details.purchase_units[0].amount.value,
                  {
                    duration: 10000,
                  }
                );
              }}
            />
          </section>
        </>
      )}
      <Toaster />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const res = await fetch(`${process.env.URL}/api/map`);
  let data = await res.json();

  data = data.data.filter((item) => item.id === id);

  return {
    props: {
      data: data[0],
    },
  };
};

Details.auth = true;

export default Details;
