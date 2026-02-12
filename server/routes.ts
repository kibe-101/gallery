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
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80",
        videoUrl: null
      },
      {
        title: "The Glass Monolith",
        category: "Photography",
        description: "High-contrast architectural photography of a downtown skyscraper, focusing on reflections and geometric patterns.",
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80",
        videoUrl: null
      },
      {
        title: "Serenity Villa",
        category: "Immersive 360",
        description: "An interactive virtual tour of a brutalist concrete villa nestled in the forest.",
        imageUrl: "https://images.unsplash.com/photo-1600596542815-2a4d9f0152ba?auto=format&fit=crop&q=80",
        videoUrl: null
      },
      {
        title: "Urban Pulse",
        category: "Drone Cinematography",
        description: "Nighttime aerials of the city skyline, showcasing the energy and flow of urban life.",
        imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80",
        videoUrl: null
      }
    ];

    for (const project of seedProjects) {
      await storage.createProject(project);
    }
    console.log("Database seeded with portfolio projects.");
  }
}
