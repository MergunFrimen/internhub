import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";

export default function UserProfile() {
  const [userData] = useState({
    personal: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "+421 900 123 456",
      location: "Bratislava, Slovakia",
    },
    education: {
      university: "Slovak University of Technology",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduationYear: "2025",
    },
    preferences: {
      jobTypes: ["Full-time", "Part-time"],
      locations: ["Remote", "Bratislava"],
      industries: ["Software Development", "Data Science"],
    },
  });

  const handlePersonalUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Updated personal info");
  };

  const handleEducationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Updated education info");
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePersonalUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="flex gap-2">
                    <User className="w-5 h-5 text-gray-500" />
                    <Input
                      id="fullName"
                      defaultValue={userData.personal.fullName}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue={userData.personal.email}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex gap-2">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue={userData.personal.phone}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <Input
                      id="location"
                      defaultValue={userData.personal.location}
                    />
                  </div>
                </div>

                <Button type="submit">Update Personal Info</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEducationUpdate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="university">University</Label>
                  <div className="flex gap-2">
                    <GraduationCap className="w-5 h-5 text-gray-500" />
                    <Input
                      id="university"
                      defaultValue={userData.education.university}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <div className="flex gap-2">
                    <GraduationCap className="w-5 h-5 text-gray-500" />
                    <Input
                      id="degree"
                      defaultValue={userData.education.degree}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <div className="flex gap-2">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    <Input id="field" defaultValue={userData.education.field} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduationYear">
                    Expected Graduation Year
                  </Label>
                  <div className="flex gap-2">
                    <GraduationCap className="w-5 h-5 text-gray-500" />
                    <Input
                      id="graduationYear"
                      defaultValue={userData.education.graduationYear}
                    />
                  </div>
                </div>

                <Button type="submit">Update Education Info</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Job Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Preferred Job Types</h3>
                  <div className="flex gap-2 flex-wrap">
                    {userData.preferences.jobTypes.map((type) => (
                      <div
                        key={type}
                        className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Preferred Locations</h3>
                  <div className="flex gap-2 flex-wrap">
                    {userData.preferences.locations.map((location) => (
                      <div
                        key={location}
                        className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Preferred Industries</h3>
                  <div className="flex gap-2 flex-wrap">
                    {userData.preferences.industries.map((industry) => (
                      <div
                        key={industry}
                        className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {industry}
                      </div>
                    ))}
                  </div>
                </div>

                <Button>Edit Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
