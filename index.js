import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const apiKey = "919124c66d9a6475d5be47fa848ca32d";
app.get("/", async (req, res) => {
  const currentCity = "Nairobi";
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`
    );

    res.render("index.ejs", {
      data: response.data,
      error: null,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.render("index.ejs", {
      data: null,
      error: "❌ Could not find weather for that city.",
    });
  }
});

app.post("/weather", async (req, res) => {
  const city = req.body.city;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await axios.get(url);

    console.log(response.data);

    res.render("index.ejs", {
      data: response.data,
      error: null,
    });
  } catch (error) {
    res.render("index.ejs", {
      data: null,
      error: "❌ Could not find weather for that city.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
