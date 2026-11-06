import {
  Activity,
  AudioLines,
  BrainCircuit,
  Crosshair,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  tab: string;
  eyebrow: string;
  image: string;
}

export const features: Feature[] = [
  {
    title: "Match catch-up",
    description: "Missed the last 10 overs? Get the entire match story in 30 seconds.",
    icon: AudioLines,
    accent: "blue",
    tab: "Intelligence",
    eyebrow: "THE SHORT VERSION",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=720&q=75",
  },
  {
    title: "Moment intelligence",
    description: "Understand why a wicket, boundary, or decision changed the game.",
    icon: Crosshair,
    accent: "violet",
    tab: "Intelligence",
    eyebrow: "EVERY TURNING POINT",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=720&q=75",
  },
  {
    title: "What if simulator",
    description: "Explore alternative match scenarios with interactive calculations.",
    icon: Activity,
    accent: "cyan",
    tab: "Simulator",
    eyebrow: "RUN THE POSSIBILITIES",
    image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=720&q=75",
  },
  {
    title: "AI rule decoder",
    description: "Understand DRS, powerplays, no-balls, and complex cricket rules.",
    icon: BrainCircuit,
    accent: "violet",
    tab: "Assistant",
    eyebrow: "CRICKET, MADE CLEAR",
    image: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=720&q=75",
  },
  {
    title: "Personal fan mode",
    description: "Match insights adapted to your favorite team, players, and knowledge level.",
    icon: Target,
    accent: "blue",
    tab: "Fan Insights",
    eyebrow: "YOUR MATCH, YOUR WAY",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=720&q=75",
  },
  {
    title: "Crowd emotion radar",
    description: "Explore the changing emotional energy of the match.",
    icon: Sparkles,
    accent: "cyan",
    tab: "Fan Insights",
    eyebrow: "FEEL THE MOMENTUM",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=720&q=75",
  },
];
