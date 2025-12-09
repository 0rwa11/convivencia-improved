import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Data file path
const dataFilePath = path.resolve(__dirname, "..", "data", "evaluation.json");

// Helper function to read data
function readData() {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.warn("Could not read data file, returning default structure");
    return { evaluations: [], groups: [], sessions: [] };
  }
}

// Helper function to write data
function writeData(data: any) {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error writing data file:", error);
    return false;
  }
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());

  // API Routes for data persistence
  app.get("/api/data", (_req, res) => {
    const data = readData();
    res.json(data);
  });

  app.post("/api/data/evaluations", (req, res) => {
    const data = readData();
    const newEvaluation = { ...req.body, id: Date.now().toString() };
    data.evaluations.push(newEvaluation);
    if (writeData(data)) {
      res.json({ success: true, data: newEvaluation });
    } else {
      res.status(500).json({ success: false, error: "Failed to save evaluation" });
    }
  });

  app.get("/api/data/evaluations", (_req, res) => {
    const data = readData();
    res.json(data.evaluations);
  });

  app.put("/api/data/evaluations/:id", (req, res) => {
    const data = readData();
    const index = data.evaluations.findIndex((e: any) => e.id === req.params.id);
    if (index !== -1) {
      data.evaluations[index] = { ...data.evaluations[index], ...req.body };
      if (writeData(data)) {
        res.json({ success: true, data: data.evaluations[index] });
      } else {
        res.status(500).json({ success: false, error: "Failed to update evaluation" });
      }
    } else {
      res.status(404).json({ success: false, error: "Evaluation not found" });
    }
  });

  app.delete("/api/data/evaluations/:id", (req, res) => {
    const data = readData();
    data.evaluations = data.evaluations.filter((e: any) => e.id !== req.params.id);
    if (writeData(data)) {
      res.json({ success: true });
    } else {
      res.status(500).json({ success: false, error: "Failed to delete evaluation" });
    }
  });

  app.post("/api/data/groups", (req, res) => {
    const data = readData();
    const newGroup = { ...req.body, id: Date.now().toString() };
    data.groups.push(newGroup);
    if (writeData(data)) {
      res.json({ success: true, data: newGroup });
    } else {
      res.status(500).json({ success: false, error: "Failed to save group" });
    }
  });

  app.get("/api/data/groups", (_req, res) => {
    const data = readData();
    res.json(data.groups);
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`API endpoints available at http://localhost:${port}/api/data`);
  });
}

startServer().catch(console.error);
