import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Video, FileText, HelpCircle, ArrowRight } from "lucide-react";

const VoterEducation = () => {
  const resources = [
    {
      title: "Voting Process Guide",
      description: "Step-by-step guide on how to cast your vote",
      icon: BookOpen,
      type: "Article",
      url: "https://www.inecnigeria.org/wp-content/uploads/2019/02/ContinuousVoterRegistrationGuide.pdf",
    },
    {
      title: "Know Your Rights",
      description: "Understanding your rights as a voter",
      icon: FileText,
      type: "Document",
      url: "https://aceproject.org/ero-en/regions/africa/NG/voter-education-handbook.pdf/view",
    },
    {
      title: "Video Tutorials",
      description: "Visual guides on the voting process",
      icon: Video,
      type: "Video",
      url: "https://www.youtube.com/watch?v=ZwY-0eGJQ1o",
    },
    {
      title: "FAQs",
      description: "Frequently asked questions about elections",
      icon: HelpCircle,
      type: "FAQ",
      url: "https://www.inecnigeria.org/faq/",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Voter Education</h1>
        <p className="text-muted-foreground">
          Learn everything you need to know about the electoral process
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => {
          const Icon = resource.icon;
          return (
            <Card key={resource.title} className="hover:shadow-xl hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-tr from-primary/20 to-primary/50">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-semibold">{resource.title}</CardTitle>
                    <CardDescription className="mt-1 text-sm">{resource.type}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">{resource.description}</p>
                <Button
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => window.open(resource.url, "_blank")}
                >
                  Access Resource <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Featured Content */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl">Featured: First-Time Voter Guide</CardTitle>
          <CardDescription>Everything you need for your first voting experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            A comprehensive guide covering registration, identification requirements, polling station
            locations, and what to expect on election day.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => window.open("https://www.inecnigeria.org/first-time-voter-guide", "_blank")}>
              Read Guide
            </Button>
            <Button variant="outline" onClick={() => window.open("https://www.youtube.com/watch?v=ZwY-0eGJQ1o", "_blank")}>
              Watch Video
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VoterEducation;
