import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ImageFx from "../../dist/index.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/image/generate", async (req, res) => {

  const { prompt, count, cookie } = req.body;
  
  
  try {
    const imageFx = new ImageFx({ cookie: cookie });
    
    const result = await imageFx.generateImage({
      prompt,
      count: count || 1
    });

    // console.log(result)

    if (result.Err) {
      console.error(result.Err);
      return res.status(500).json({ error: result.Err.message });
    }

    const images = result.Ok;
    
    console.log(images)
    res.json({ images });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(8080, () => {
  console.log("✅ API ouvindo em http://localhost:8080");
});
