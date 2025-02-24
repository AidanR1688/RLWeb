import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertCommunitySchema, insertPropertySchema } from "@shared/schema";
import { findMatches } from "./matching";

export async function registerRoutes(app: Express): Promise<Server> {
  setupAuth(app);

  // Users
  app.get("/api/users", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const users = await storage.listUsers();
    res.json(users);
  });

  app.patch("/api/users/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    if (req.user.id !== parseInt(req.params.id)) return res.sendStatus(403);
    const user = await storage.updateUser(req.user.id, req.body);
    res.json(user);
  });

  // Communities
  app.post("/api/communities", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const parsed = insertCommunitySchema.parse(req.body);
    const community = await storage.createCommunity(parsed);
    res.status(201).json(community);
  });

  app.get("/api/communities", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const communities = await storage.listCommunities();
    res.json(communities);
  });

  app.get("/api/communities/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const community = await storage.getCommunity(parseInt(req.params.id));
    if (!community) return res.sendStatus(404);
    res.json(community);
  });

  app.patch("/api/communities/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const community = await storage.getCommunity(parseInt(req.params.id));
    if (!community) return res.sendStatus(404);
    const updated = await storage.updateCommunity(community.id, req.body);
    res.json(updated);
  });

  // Get AI-powered matches
  app.get("/api/matches", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);

    try {
      const users = await storage.listUsers();
      const matches = await findMatches(req.user, users);
      res.json(matches);
    } catch (error) {
      console.error("Error getting matches:", error);
      res.status(500).json({ message: "Failed to get matches" });
    }
  });

  // Development seed endpoint - no auth required during development
  app.post("/api/seed", async (req, res) => {
    try {
      // Create sample communities
      const communities = [
        {
          name: "EcoHaven Collective",
          description: "A sustainable living community focused on reducing environmental impact through shared resources and green practices.",
          values: ["sustainability", "community-driven", "eco-conscious"],
          maxMembers: 8,
          location: "Portland, OR",
          budget: 2000,
          memberIds: []
        },
        {
          name: "Creative Hub Co-Living",
          description: "A vibrant community for artists, musicians, and creative professionals to live, collaborate, and inspire each other.",
          values: ["creativity", "collaboration", "artistic-freedom"],
          maxMembers: 6,
          location: "Austin, TX",
          budget: 1800,
          memberIds: []
        }
      ];

      // Create sample users with proper preferences structure
      const users = [
        {
          username: "emma_green",
          password: "test123",
          fullName: "Emma Green",
          bio: "Environmental scientist passionate about sustainable living and community gardens.",
          preferences: {
            lifestyle: ["eco-conscious"],
            ageRange: "26-35",
            moveInTimeline: "1-3 months",
            cleaningHabits: "very neat",
            socialStyle: "moderately social",
            dietaryPreferences: ["vegetarian"],
            occupation: "professional",
            languages: ["english"],
            petPreferences: "loves pets",
            smokingPreference: "non-smoking",
            noiseLevel: "moderate",
            guestPolicy: "occasional guests"
          },
          monthlyBudget: 1800,
          downpaymentBudget: 20000,
          location: "Portland, OR",
          interests: ["gardening", "zero-waste living", "hiking"],
          communityThemes: ["sustainable", "wellness", "eco-conscious"]
        },
        {
          username: "alex_artist",
          password: "test123",
          fullName: "Alex Chen",
          bio: "Digital artist and musician looking for a creative community to call home.",
          preferences: {
            lifestyle: ["creative"],
            ageRange: "26-35",
            moveInTimeline: "1-3 months",
            cleaningHabits: "reasonably tidy",
            socialStyle: "very social",
            dietaryPreferences: ["omnivore"],
            occupation: "artist",
            languages: ["english", "mandarin"],
            petPreferences: "loves pets",
            smokingPreference: "outdoor only",
            noiseLevel: "active",
            guestPolicy: "frequent guests"
          },
          monthlyBudget: 1500,
          downpaymentBudget: 15000,
          location: "Austin, TX",
          interests: ["digital art", "music production", "community events"],
          communityThemes: ["creative", "art", "music"]
        },
        {
          username: "sarah_tech",
          password: "test123",
          fullName: "Sarah Johnson",
          bio: "Software engineer who enjoys both quiet coding time and community activities.",
          preferences: {
            lifestyle: ["tech-focused"],
            ageRange: "26-35",
            moveInTimeline: "immediate",
            cleaningHabits: "very neat",
            socialStyle: "moderately social",
            dietaryPreferences: ["omnivore"],
            occupation: "professional",
            languages: ["english"],
            petPreferences: "no pets",
            smokingPreference: "non-smoking",
            noiseLevel: "quiet",
            guestPolicy: "occasional guests"
          },
          monthlyBudget: 2200,
          downpaymentBudget: 25000,
          location: "Seattle, WA",
          interests: ["coding", "tech meetups", "board games"],
          communityThemes: ["tech", "professional", "startup"]
        }
      ];

      // Create communities first
      for (const communityData of communities) {
        await storage.createCommunity(communityData);
      }

      // Then create users with hashed passwords
      for (const userData of users) {
        await storage.createUser({
          ...userData,
          password: userData.password // Storage layer will hash the password
        });
      }

      res.json({ message: "Sample data created successfully" });
    } catch (error) {
      console.error("Error seeding data:", error);
      res.status(500).json({ message: "Failed to seed data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}