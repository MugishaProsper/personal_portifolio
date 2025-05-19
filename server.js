import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.config.js";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import experienceRoutes from "./routes/experience.routes.js";
import projectRoutes from "./routes/project.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import socialRoutes from "./routes/social.routes.js";
import authRoutes from "./routes/auth.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(`/api/${process.env.API_VERSION}/auth`, authRoutes);
app.use(`/api/${process.env.API_VERSION}/user`, userRoutes);
app.use(`/api/${process.env.API_VERSION}/skill`, skillRoutes);
app.use(`/api/${process.env.API_VERSION}/experience`, experienceRoutes);
app.use(`/api/${process.env.API_VERSION}/project`, projectRoutes);
app.use(`/api/${process.env.API_VERSION}/review`, reviewRoutes);
app.use(`/api/${process.env.API_VERSION}/social`, socialRoutes);
app.use(`/api/${process.env.API_VERSION}/blog`, blogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
}).on("error", (error) => {
  console.error("Server error:", error);
});

