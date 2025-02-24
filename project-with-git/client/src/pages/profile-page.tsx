import { useAuth } from "@/hooks/use-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema, type User } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const THEMES = [
  { value: "sustainable", label: "Sustainable Living" },
  { value: "creative", label: "Creative Community" },
  { value: "senior", label: "Senior Living" },
  { value: "single-parent", label: "Single Parent Community" },
  { value: "student", label: "Student Housing" },
  { value: "professional", label: "Professional Network" },
  { value: "spiritual", label: "Spiritual Practice" },
  { value: "wellness", label: "Health & Wellness" },
  { value: "tech", label: "Tech-focused" },
  { value: "multicultural", label: "Multicultural Exchange" },
  { value: "lgbtq", label: "LGBTQ+ Friendly" },
  { value: "family-friendly", label: "Family-Friendly" },
  { value: "music", label: "Music & Performance" },
  { value: "art", label: "Arts & Culture" },
  { value: "startup", label: "Startup House" },
  { value: "eco-conscious", label: "Eco-Conscious Living" },
];

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      ...user,
      communityThemes: user?.communityThemes || [],
      monthlyBudget: user?.monthlyBudget || 0,
      downpaymentBudget: user?.downpaymentBudget || 0,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (data: Partial<User>) => {
      const res = await apiRequest("PATCH", `/api/users/${user?.id}`, data);
      return res.json();
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["/api/user"], updatedUser);
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Create Your Profile</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => updateProfileMutation.mutate(data))} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormDescription>
                        Tell potential housemates about yourself, your lifestyle, and what you're looking for in a community.
                      </FormDescription>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="monthlyBudget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Monthly Rent Budget ($)</FormLabel>
                      <FormDescription>
                        How much can you spend on monthly rent?
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="downpaymentBudget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Downpayment Budget ($)</FormLabel>
                      <FormDescription>
                        How much can you contribute to the initial property investment?
                      </FormDescription>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Community Themes</CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="communityThemes"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>What types of communities interest you?</FormLabel>
                        <FormDescription>
                          Select all the themes that align with your interests and values.
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {THEMES.map((theme) => (
                          <FormField
                            key={theme.value}
                            control={form.control}
                            name="communityThemes"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={theme.value}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(theme.value)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...(field.value || []), theme.value])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== theme.value)
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {theme.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Living Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="preferences.ageRange"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Age Range</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="18-25">18-25</SelectItem>
                          <SelectItem value="26-35">26-35</SelectItem>
                          <SelectItem value="36-50">36-50</SelectItem>
                          <SelectItem value="50+">50+</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferences.occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select occupation" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                          <SelectItem value="artist">Artist/Creative</SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferences.cleaningHabits"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cleaning Habits</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select cleaning habits" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="very neat">Very Neat</SelectItem>
                          <SelectItem value="reasonably tidy">Reasonably Tidy</SelectItem>
                          <SelectItem value="somewhat messy">Somewhat Messy</SelectItem>
                          <SelectItem value="very relaxed">Very Relaxed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferences.socialStyle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Social Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select social style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="very social">Very Social</SelectItem>
                          <SelectItem value="moderately social">Moderately Social</SelectItem>
                          <SelectItem value="occasionally social">Occasionally Social</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferences.petPreferences"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet Preferences</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select pet preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="has pets">Have Pets</SelectItem>
                          <SelectItem value="loves pets">Love Pets</SelectItem>
                          <SelectItem value="no pets">No Pets</SelectItem>
                          <SelectItem value="allergic">Allergic to Pets</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferences.smokingPreference"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Smoking Preference</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select smoking preference" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="non-smoking">Non-Smoking</SelectItem>
                          <SelectItem value="outdoor only">Outdoor Only</SelectItem>
                          <SelectItem value="smoking friendly">Smoking Friendly</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={updateProfileMutation.isPending}>
              {updateProfileMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Profile
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}