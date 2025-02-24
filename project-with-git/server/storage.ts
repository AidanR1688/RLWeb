import { User, InsertUser, Community, PropertyListing, InsertCommunity, insertPropertySchema } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;
  listUsers(): Promise<User[]>;
  
  createCommunity(community: InsertCommunity): Promise<Community>;
  getCommunity(id: number): Promise<Community | undefined>;
  listCommunities(): Promise<Community[]>;
  updateCommunity(id: number, community: Partial<Community>): Promise<Community>;
  
  createPropertyListing(property: PropertyListing): Promise<PropertyListing>;
  getPropertyListing(id: number): Promise<PropertyListing | undefined>;
  listPropertyListings(): Promise<PropertyListing[]>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private communities: Map<number, Community>;
  private properties: Map<number, PropertyListing>;
  private currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.communities = new Map();
    this.properties = new Map();
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    const updated = { ...user, ...updates };
    this.users.set(id, updated);
    return updated;
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createCommunity(community: InsertCommunity): Promise<Community> {
    const id = this.currentId++;
    const newCommunity: Community = { ...community, id };
    this.communities.set(id, newCommunity);
    return newCommunity;
  }

  async getCommunity(id: number): Promise<Community | undefined> {
    return this.communities.get(id);
  }

  async listCommunities(): Promise<Community[]> {
    return Array.from(this.communities.values());
  }

  async updateCommunity(id: number, updates: Partial<Community>): Promise<Community> {
    const community = this.communities.get(id);
    if (!community) throw new Error("Community not found");
    const updated = { ...community, ...updates };
    this.communities.set(id, updated);
    return updated;
  }

  async createPropertyListing(property: PropertyListing): Promise<PropertyListing> {
    const id = this.currentId++;
    this.properties.set(id, { ...property, id });
    return property;
  }

  async getPropertyListing(id: number): Promise<PropertyListing | undefined> {
    return this.properties.get(id);
  }

  async listPropertyListings(): Promise<PropertyListing[]> {
    return Array.from(this.properties.values());
  }
}

export const storage = new MemStorage();
