import OpenAI from "openai";
import { User } from "@shared/schema";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function generateUserProfile(user: User): string {
  return `
    Name: ${user.fullName}
    Bio: ${user.bio || 'Not specified'}
    Location: ${user.location || 'Not specified'}
    Monthly Budget: ${user.monthlyBudget || 'Not specified'}
    Downpayment Budget: ${user.downpaymentBudget || 'Not specified'}
    Community Themes: ${user.communityThemes?.join(', ') || 'Not specified'}
    Lifestyle: ${user.preferences.lifestyle?.join(', ') || 'Not specified'}
    Age Range: ${user.preferences.ageRange || 'Not specified'}
    Cleaning Habits: ${user.preferences.cleaningHabits || 'Not specified'}
    Social Style: ${user.preferences.socialStyle || 'Not specified'}
    Occupation: ${user.preferences.occupation || 'Not specified'}
    Pet Preferences: ${user.preferences.petPreferences || 'Not specified'}
    Smoking Preference: ${user.preferences.smokingPreference || 'Not specified'}
  `.trim();
}

async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });
  return response.data[0].embedding;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function findMatches(currentUser: User, otherUsers: User[]): Promise<Array<{ user: User; score: number }>> {
  const currentUserProfile = generateUserProfile(currentUser);
  const currentUserEmbedding = await getEmbedding(currentUserProfile);
  
  const matches = await Promise.all(
    otherUsers
      .filter(user => user.id !== currentUser.id)
      .map(async (user) => {
        const userProfile = generateUserProfile(user);
        const userEmbedding = await getEmbedding(userProfile);
        const similarity = cosineSimilarity(currentUserEmbedding, userEmbedding);
        return { user, score: similarity };
      })
  );

  return matches.sort((a, b) => b.score - a.score);
}
