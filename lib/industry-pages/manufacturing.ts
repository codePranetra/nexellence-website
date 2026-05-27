import type { IndustryPageContent } from "./types";

export const MANUFACTURING_PAGE: IndustryPageContent = {
  title: "Manufacturing Recruitment Solutions",
  intro:
    "At Nexellence, we specialize in sourcing, attracting, and placing highly skilled professionals within the manufacturing sector. Whether you need experts in Industrial Automation, Semiconductors, Electrical, Mechanical, Automotive, Engineering industries etc., we have the expertise to connect you with the right talent.",
  highlight: {
    label: "Manufacturing excellence",
    icon: "Factory",
    description:
      "From industrial automation and semiconductors to automotive and precision engineering—we deliver talent that powers production, quality, and innovation on the factory floor.",
  },
  coverage: {
    title: "Industry Expertise Across All Sectors",
    description:
      "Our team has deep knowledge of the Manufacturing Industry, allowing us to identify the most qualified candidates for a variety of specialized fields, including:",
    sectors: [
      {
        id: "automation",
        title: "Industrial Automation",
        description: "Robotics, smart manufacturing, and process automation.",
        icon: "Bot",
      },
      {
        id: "semiconductor",
        title: "Semiconductor",
        description: "Chip fabrication, testing, and quality assurance.",
        icon: "Cpu",
      },
      {
        id: "electrical",
        title: "Electrical & Mechanical",
        description: "Power systems, equipment design, and advanced manufacturing processes.",
        icon: "Zap",
      },
      {
        id: "automotive",
        title: "Automotive",
        description: "Vehicle manufacturing, EV technology, and precision engineering.",
        icon: "Car",
      },
      {
        id: "engineering",
        title: "Engineering",
        description:
          "Civil, structural, MEP, and production engineering for manufacturing environments.",
        icon: "Wrench",
      },
    ],
  },
  whyChoose: {
    title: "Why Choose Nexellence?",
    items: [
      {
        title: "Industry-Specific Knowledge",
        description:
          "Our team understands the technical expertise required in manufacturing.",
      },
      {
        title: "Access to Top Talent",
        description: "We have a vast network of pre-screened, highly qualified candidates.",
      },
      {
        title: "Customized Hiring Solutions",
        description:
          "We tailor our recruitment approach based on your company's unique needs.",
      },
      {
        title: "Fast & Efficient Hiring Process",
        description:
          "We streamline sourcing, screening, and placement to fill roles quickly.",
      },
    ],
  },
  roles: {
    title: "Roles We Specialize In",
    description: "We recruit for a wide range of positions in manufacturing, including:",
    items: [
      "Manufacturing Engineers",
      "Process Engineers",
      "Automation Specialists",
      "Quality Control & Assurance Experts",
      "Production Managers & Supervisors",
      "CNC Machinists & Technicians",
      "Mechanical & Electrical Engineers",
      "Industrial & Lean Manufacturing Experts",
    ],
  },
  partner: {
    title: "Let's Build Your Workforce Together",
    description:
      "Whether you need a single expert or a full production team, Nexellence is your trusted partner in Manufacturing Recruitment.",
    sideLabel: "Production-ready talent",
  },
  partnerIcon: "Factory",
  whyIcons: ["Factory", "Network", "Settings2", "Zap"],
  cta: "Contact Us Today! Let's discuss how we can connect you with the best talent in the industry.",
};
