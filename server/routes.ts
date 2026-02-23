import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Inquiries
  app.post(api.inquiries.create.path, async (req, res) => {
    try {
      const input = api.inquiries.create.input.parse(req.body);
      const inquiry = await storage.createInquiry(input);
      res.status(201).json(inquiry);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
        });
      }
      throw err;
    }
  });

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  // Seed data function
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    const seedProjects = [
      {
        title: "Azure Heights",
        category: "Drone Cinematography",
        description: "A cinematic aerial tour of a coastal luxury development, capturing the interplay of ocean light and modern architecture.",
        imageUrl: "/IMG_4794.jpg",
        videoUrl: null
      },
      {
        title: "The Glass Monolith",
        category: "Photography",
        description: "High-contrast architectural photography of a downtown skyscraper, focusing on reflections and geometric patterns.",
        imageUrl: "/IMG_7503.jpg",
        videoUrl: null
      },
      {
        title: "Crystal Waters",
        category: "Immersive 360",
        description: "An interactive virtual tour of a modern lakeside property with panoramic views.",
        imageUrl: "/IMG_0220.jpg",
        videoUrl: null
      },
      {
        title: "City Lights",
        category: "Drone Cinematography",
        description: "Evening aerials capturing the vibrant energy of the metropolitan downtown.",
        imageUrl: "/IMG_0237.jpg",
        videoUrl: null
      }
    ];

    for (const project of seedProjects) {
      await storage.createProject(project);
    }
    console.log("Database seeded with portfolio projects.");
  }
}
