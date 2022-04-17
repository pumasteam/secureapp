import { Widget } from "@uploadcare/react-widget";
import { useForm } from "react-hook-form";
import { Button, Image, Input, Text, Textarea } from "@nextui-org/react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Add = () => {
  const { register, handleSubmit } = useForm();

  const [image, setImage] = useState(null);

  const onSubmit = async ({ name, description, status }) => {
    const obj = {
      name,
      description,
      image,
      status,
    };

    const addContent = (obj) => {
      return new Promise((resolve, reject) => {
        fetch("/api/person", {
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
      <Text h1>Add a new person</Text>

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
          label="Name"
          type="text"
          size="xl"
          width="300px"
          {...register("name", { required: true })}
          placeholder="Robbed motorcycle"
        />
        <Input
          label="Status"
          type="text"
          size="xl"
          width="300px"
          {...register("status", { required: true })}
          placeholder="Missing"
        />
        <Textarea
          size="xl"
          width="300px"
          label="Description"
          placeholder="Caucasian, 29, missing from the street"
          {...register("description", { required: true })}
        />

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
