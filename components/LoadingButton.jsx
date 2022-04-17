import { Button, Loading } from "@nextui-org/react";

const LoadingButton = (props) => {
  return (
    <Button disabled auto bordered css={{ px: "$13" }} {...props}>
      <Loading type="spinner" color="currentColor" size="sm" />
    </Button>
  );
};

export default LoadingButton;
