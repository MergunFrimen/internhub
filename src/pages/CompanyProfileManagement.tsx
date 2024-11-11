import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
    BriefcaseIcon,
    Building2,
    Globe,
    Plus,
    Trash2
} from "lucide-react";
import React, { useState } from "react";

export default function CompanyProfileManagement() {
  const [companyData, setCompanyData] = useState({
    basic: {
      name: "TechCorp",
      website: "https://techcorp.example.com",
      industry: "Software Development",
      size: "1000-5000",
      location: "Bratislava, Slovakia",
      description:
        "Leading technology company focused on innovation and cutting-edge solutions.",
      founded: "2010",
    },
    socialLinks: {
      linkedin: "linkedin.com/company/techcorp",
      twitter: "twitter.com/techcorp",
      facebook: "facebook.com/techcorp",
    },
    openings: [
      {
        id: 1,
        title: "Software Development Intern",
        department: "Engineering",
        type: "Full-time",
        duration: "3 months",
        location: "Remote",
        requirements:
          "- Strong programming fundamentals\n- Experience with modern web technologies\n- Currently pursuing CS degree",
        status: "Active",
      },
      {
        id: 2,
        title: "UI/UX Design Intern",
        department: "Design",
        type: "Part-time",
        duration: "6 months",
        location: "Hybrid",
        requirements:
          "- Design portfolio\n- Experience with Figma\n- Understanding of UX principles",
        status: "Active",
      },
    ],
  });

  const handleBasicInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      basic: {
        ...prev.basic,
        [name]: value,
      },
    }));
  };

  const handleSocialLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value,
      },
    }));
  };

  const addNewOpening = () => {
    const newOpening = {
      id: Date.now(),
      title: "",
      department: "",
      type: "Full-time",
      duration: "3 months",
      location: "On-site",
      requirements: "",
      status: "Draft",
    };
    setCompanyData((prev) => ({
      ...prev,
      openings: [...prev.openings, newOpening],
    }));
  };

  const deleteOpening = (id: number) => {
    setCompanyData((prev) => ({
      ...prev,
      openings: prev.openings.filter((opening) => opening.id !== id),
    }));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Company Profile Management</h1>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="openings">Internship Openings</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <div className="grid gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Company Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={companyData.basic.name}
                        onChange={handleBasicInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        name="website"
                        value={companyData.basic.website}
                        onChange={handleBasicInfoChange}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input
                        id="industry"
                        name="industry"
                        value={companyData.basic.industry}
                        onChange={handleBasicInfoChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="size">Company Size</Label>
                      <Select defaultValue={companyData.basic.size}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-50">1-50 employees</SelectItem>
                          <SelectItem value="51-200">
                            51-200 employees
                          </SelectItem>
                          <SelectItem value="201-1000">
                            201-1000 employees
                          </SelectItem>
                          <SelectItem value="1000-5000">
                            1000-5000 employees
                          </SelectItem>
                          <SelectItem value="5000+">5000+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={companyData.basic.location}
                      onChange={handleBasicInfoChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Company Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={companyData.basic.description}
                      onChange={handleBasicInfoChange}
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  Social Media Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      name="linkedin"
                      value={companyData.socialLinks.linkedin}
                      onChange={handleSocialLinksChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      value={companyData.socialLinks.twitter}
                      onChange={handleSocialLinksChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="facebook">Facebook</Label>
                    <Input
                      id="facebook"
                      name="facebook"
                      value={companyData.socialLinks.facebook}
                      onChange={handleSocialLinksChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="openings">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Current Openings</h2>
              <Button onClick={addNewOpening}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Opening
              </Button>
            </div>

            <div className="grid gap-6">
              {companyData.openings.map((opening) => (
                <Card key={opening.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="flex items-center gap-2">
                        <BriefcaseIcon className="w-5 h-5" />
                        {opening.title || "New Opening"}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteOpening(opening.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Position Title</Label>
                        <Input
                          defaultValue={opening.title}
                          placeholder="e.g. Software Development Intern"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Input
                          defaultValue={opening.department}
                          placeholder="e.g. Engineering"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select defaultValue={opening.type}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Full-time">Full-time</SelectItem>
                            <SelectItem value="Part-time">Part-time</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Select defaultValue={opening.duration}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3 months">3 months</SelectItem>
                            <SelectItem value="6 months">6 months</SelectItem>
                            <SelectItem value="12 months">12 months</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Select defaultValue={opening.location}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="On-site">On-site</SelectItem>
                            <SelectItem value="Remote">Remote</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Requirements</Label>
                      <Textarea
                        defaultValue={opening.requirements}
                        placeholder="List the key requirements and qualifications"
                        rows={4}
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">Save as Draft</Button>
                      <Button>Publish</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
