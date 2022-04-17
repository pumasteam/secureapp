import { getSession } from "next-auth/react";
import { prisma } from "../../utils/prisma";

const person = async (req, res) => {
  try {
    const session = getSession({ req });
    if (session) {
      if (req.method == "GET") {
        const locations = await prisma.person.findMany();

        res.status(200).json({
          status: "success",
          data: locations,
        });
      } else if (req.method == "POST") {
        let { name, image, description, status } = req.body;
        if (name && image && status && description) {
          const location = await prisma.person.create({
            data: {
              name,
              image,
              status,
              description,
            },
          });

          res.status(201).json({
            status: "success",
            data: location,
          });
        } else {
          res.status(400).json({
            error: "Missing fields",
          });
        }
      }
    } else {
      res.status(401).json({
        error: "Unauthorized",
      });
    }
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

export default person;
