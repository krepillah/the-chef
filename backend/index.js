import express from "express"
import router from './router.js'
import cors from "cors"

const PORT = 5000;

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
  };
  
  // Используем middleware cors
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
