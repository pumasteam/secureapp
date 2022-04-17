import { getSession } from "next-auth/react";
import { prisma } from "../../utils/prisma";

const map = async (req, res) => {
  try {
    const session = getSession({ req });
    if (session) {
      if (req.method == "GET") {
        const locations = await prisma.map.findMany();

        res.status(200).json({
          status: "success",
          data: locations,
        });
      } else if (req.method == "POST") {
        let { name, image, latitude, longitude, description, pay, goal } =
          req.body;
        if (name && image && latitude && longitude && description) {
          if (!pay || !goal) {
            pay = false;
            goal = 0;
          }

          const location = await prisma.map.create({
            data: {
              name,
              image,
              latitude,
              longitude,
              description,
              pay,
              goal,
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

export default map;
