import { Text } from "@nextui-org/react";

const Camera = () => {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text css={{ textAlign: "center" }} h1>
        Real-time camera analysis
      </Text>
      <Text css={{ textAlign: "center" }} h3>
        ⚠️ Guns detected ⚠️
      </Text>
      <video src="/video.mp4" autoPlay style={{ width: "80vw" }} />
    </section>
  );
};

Camera.auth = true;

export default Camera;
