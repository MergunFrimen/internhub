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
  Upload,
  File,
  X,
  Download,
  FileText,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CV {
  id: string;
  name: string;
  size: number;
  uploadDate: string;
  isDefault: boolean;
}

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

  const [cvs, setCvs] = useState<CV[]>([
    {
      id: "1",
      name: "John_Doe_CV_2024.pdf",
      size: 1240000, // in bytes
      uploadDate: "2024-03-15T10:00:00Z",
      isDefault: true,
    },
    {
      id: "2",
      name: "John_Doe_Technical_CV.pdf",
      size: 890000,
      uploadDate: "2024-03-10T14:30:00Z",
      isDefault: false,
    },
  ]);

  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handlePersonalUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleEducationUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    setUploadError(null);
    const file = files[0];

    // Validate file
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setUploadError("Only PDF files are allowed");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      setUploadError("File size must be less than 5MB");
      return;
    }

    // Add new CV to the list
    const newCV: CV = {
      id: Date.now().toString(),
      name: file.name,
      size: file.size,
      uploadDate: new Date().toISOString(),
      isDefault: false,
    };
    setCvs((prev) => [...prev, newCV]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const setDefaultCV = (cvId: string) => {
    setCvs((prev) =>
      prev.map((cv) => ({
        ...cv,
        isDefault: cv.id === cvId,
      }))
    );
  };

  const deleteCV = (cvId: string) => {
    setCvs((prev) => prev.filter((cv) => cv.id !== cvId));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="cv">CV Management</TabsTrigger>
        </TabsList>

        {/* Existing tabs content remains the same */}

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

        <TabsContent value="cv">
          <div className="space-y-6">
            {/* Upload Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Upload CV
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive
                      ? "border-primary bg-primary/5"
                      : "border-gray-200"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center gap-4">
                    <Upload className="w-8 h-8 text-gray-400" />
                    <div>
                      <p className="text-lg font-medium">
                        Drag and drop your CV here, or{" "}
                        <label className="text-primary cursor-pointer hover:underline">
                          browse
                          <input
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={handleFileInput}
                          />
                        </label>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Supports: PDF up to 5MB
                      </p>
                    </div>
                  </div>
                </div>

                {uploadError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Upload Error</AlertTitle>
                    <AlertDescription>{uploadError}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* CV List */}
            <Card>
              <CardHeader>
                <CardTitle>My CVs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cvs.map((cv) => (
                    <div
                      key={cv.id}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <File className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{cv.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {formatFileSize(cv.size)} • Uploaded{" "}
                            {formatDate(cv.uploadDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Button
                          variant={cv.isDefault ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDefaultCV(cv.id)}
                        >
                          {cv.isDefault ? "Default CV" : "Set as Default"}
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => window.open("#")} // Replace with actual download link
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCV(cv.id)}
                          disabled={cv.isDefault}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {cvs.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      No CVs uploaded yet. Upload your first CV above.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
