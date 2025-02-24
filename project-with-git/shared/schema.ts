import { pgTable, text, serial, integer, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  bio: text("bio"),
  preferences: jsonb("preferences").notNull(),
  monthlyBudget: integer("monthly_budget"),
  downpaymentBudget: integer("downpayment_budget"),
  location: text("location"),
  interests: text("interests").array(),
  communityThemes: text("community_themes").array(),
  lookingForGroup: boolean("looking_for_group").default(true),
});

export const communities = pgTable("communities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  values: text("values").array(),
  memberIds: integer("member_ids").array(),
  maxMembers: integer("max_members").notNull(),
  location: text("location"),
  budget: integer("budget").notNull(),
});

export const propertyListings = pgTable("property_listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  type: text("type").notNull(),
  amenities: text("amenities").array(),
});

export const insertUserSchema = createInsertSchema(users).extend({
  password: z.string().min(8, "Password must be at least 8 characters"),
  fullName: z.string().min(2, "Full name is required"),
  preferences: z.object({
    lifestyle: z.array(z.string()),
    ageRange: z.string(),
    moveInTimeline: z.string(),
    cleaningHabits: z.string(),
    socialStyle: z.string(),
    dietaryPreferences: z.array(z.string()),
    occupation: z.string(),
    languages: z.array(z.string()),
    petPreferences: z.string(),
    smokingPreference: z.string(),
    noiseLevel: z.string(),
    guestPolicy: z.string(),
  }),
  monthlyBudget: z.number().min(0).optional(),
  downpaymentBudget: z.number().min(0).optional(),
  interests: z.array(z.string()),
  communityThemes: z.array(z.enum([
    "sustainable",
    "creative",
    "senior",
    "single-parent",
    "student",
    "professional",
    "spiritual",
    "wellness",
    "tech",
    "multicultural",
    "lgbtq",
    "family-friendly",
    "music",
    "art",
    "startup",
    "eco-conscious"
  ])),
});

export const insertCommunitySchema = createInsertSchema(communities);
export const insertPropertySchema = createInsertSchema(propertyListings);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Community = typeof communities.$inferSelect;
export type PropertyListing = typeof propertyListings.$inferSelect;