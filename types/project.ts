export interface Project {
  title: string
  description: string
  role: string
  technologies: string[]
  link?: string
  route?: string
  imageUrl?: string
  year: string | number
  company?: string
  duration?: string
  team?: string
  additionalImages?: string[]
}

export interface ProjectSectionProps {
  project: Project
  className?: string
} 