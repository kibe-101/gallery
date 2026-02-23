import {
  type InsertInquiry,
  type Inquiry,
  type InsertProject,
  type Project
} from "@shared/schema";

export interface IStorage {
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemoryStorage implements IStorage {
  private inquiries: Inquiry[] = [];
  private projects: Project[] = [];
  private nextId = 1;

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const inquiry: Inquiry = {
      id: this.nextId++,
      ...insertInquiry,
      createdAt: new Date()
    };
    this.inquiries.push(inquiry);
    return inquiry;
  }

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.find(p => p.id === id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const project: Project = {
      id: this.nextId++,
      ...insertProject,
      videoUrl: insertProject.videoUrl || null
    };
    this.projects.push(project);
    return project;
  }
}

export const storage = new MemoryStorage();
