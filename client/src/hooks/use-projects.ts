import { useQuery } from "@tanstack/react-query";
import { assetUrl } from "@/lib/assetUrl";

// Static project data (no server needed for GitHub Pages)
const staticProjects = [
  {
    id: 1,
    title: "Azure Heights",
    category: "Drone Cinematography",
    description: "A cinematic aerial tour of a coastal luxury development, capturing the interplay of ocean light and modern architecture.",
    imageUrl: assetUrl("/IMG_4794.jpg"),
    videoUrl: null
  },
  {
    id: 2,
    title: "The Glass Monolith",
    category: "Photography",
    description: "High-contrast architectural photography of a downtown skyscraper, focusing on reflections and geometric patterns.",
    imageUrl: assetUrl("/IMG_7503.jpg"),
    videoUrl: null
  },
  {
    id: 3,
    title: "Crystal Waters",
    category: "Immersive 360",
    description: "An interactive virtual tour of a modern lakeside property with panoramic views.",
    imageUrl: assetUrl("/IMG_0220.jpg"),
    videoUrl: null
  },
  {
    id: 4,
    title: "City Lights",
    category: "Drone Cinematography",
    description: "Evening aerials capturing the vibrant energy of the metropolitan downtown.",
    imageUrl: assetUrl("/IMG_0237.jpg"),
    videoUrl: null
  }
];

export function useProjects() {
  return useQuery({
    queryKey: ["static-projects"],
    queryFn: async () => staticProjects,
    staleTime: Infinity,
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ["static-project", id],
    queryFn: async () => {
      const project = staticProjects.find(p => p.id === id);
      if (!project) throw new Error("Project not found");
      return project;
    },
    enabled: !!id,
    staleTime: Infinity,
  });
}
