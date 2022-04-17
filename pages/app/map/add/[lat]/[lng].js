import { Widget } from "@uploadcare/react-widget";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  Image,
  Input,
  Text,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const Add = () => {
  const router = useRouter();
  const { lat, lng } = router.query;
  const { register, handleSubmit } = useForm();

  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);

  const onSubmit = async ({ name, description, goal }) => {
    const obj = {
      name,
      description,
      goal: parseInt(goal),
      latitude: lat,
      longitude: lng,
      image,
      pay: selected,
    };

    const addContent = (obj) => {
      return new Promise((resolve, reject) => {
        fetch("/api/map", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }).then((res) => {
          if (res.status === 201) {
            resolve();
          } else {
            reject();
          }
        });
      });
    };

    toast.promise(addContent(obj), {
      loading: "Loading...",
      success: "Success!",
      error: "Error!",
    });
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text h1>Add a new incident</Text>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        {!image && (
          <Widget
            publicKey="624de14caf2cf3c7f75c"
            onChange={(e) => setImage(e.cdnUrl)}
          />
        )}
        {image && (
          <Image
            src={image}
            width={300}
            alt="Submission image"
            objectFit="cover"
          />
        )}

        <Input
          label="latitude"
          type="number"
          size="xl"
          width="300px"
          value={lat}
          disabled
        />
        <Input
          label="Longitude"
          type="number"
          size="xl"
          width="300px"
          value={lng}
          disabled
        />
        <Input
          label="Name"
          type="text"
          size="xl"
          width="300px"
          {...register("name", { required: true })}
          placeholder="Robbed motorcycle"
        />
        <Textarea
          size="xl"
          width="300px"
          label="Description"
          placeholder="Honda xtreme 16..."
          {...register("description", { required: true })}
        />
        <Checkbox
          css={{ margin: "10px" }}
          checked={selected}
          onChange={setSelected}
        >
          Do you want to collect money?
        </Checkbox>

        {selected && (
          <Input
            label="Goal"
            type="number"
            size="xl"
            width="300px"
            {...register("goal")}
            placeholder="100"
          />
        )}

        <Button
          type="submit"
          size="lg"
          css={{
            marginTop: "10px",
          }}
        >
          Submit
        </Button>
      </form>
      <Toaster />
    </section>
  );
};

export default Add;
