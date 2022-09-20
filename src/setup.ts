import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

app.get("/stores", async (req, res) => {
  try {
    const stores = await prisma.store.findMany({ include: { items: true } });
    res.send(stores);
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});


app.delete("/items/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const deletedItem = await prisma.item.delete({ where: { id } });
    res.send(deletedItem);
  } catch (error) {
    //@ts-ignore
    res.status(400).send({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Click: http://localhost:${port}`);
});
