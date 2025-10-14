import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Award, Users } from "lucide-react";

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedParty, setSelectedParty] = useState("all");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/candidates")
      .then(res => res.json())
      .then(data => {
        setCandidates(data.items || []);
        setLoading(false);
      })
      .catch(e => {
        setError("Failed to load candidates");
        setLoading(false);
      });
  }, []);

  // Dynamically get all parties from data
  const parties = [
    { value: "all", label: "All Parties" },
    ...Array.from(new Set(candidates.map(c => c.party))).map(p => ({ value: p, label: p }))
  ];

  const filteredCandidates = candidates.filter(candidate => {
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      candidate.name?.toLowerCase().includes(q) ||
      candidate.party?.toLowerCase().includes(q) ||
      candidate.position?.toLowerCase().includes(q) ||
      candidate.summary?.toLowerCase().includes(q) ||
      candidate.manifesto?.toLowerCase().includes(q);
    const matchesParty = selectedParty === "all" || candidate.party === selectedParty;
    return matchesSearch && matchesParty;
  });

  const getPartyColor = (party) => {
    // You can expand this mapping as needed
    const colors = {
      "All Progressives Congress (APC)": "bg-green-700",
      "People's Democratic Party (PDP)": "bg-blue-700",
      "Labour Party (LP)": "bg-red-600",
    };
    return colors[party] || "bg-gray-500";
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Candidates</h1>
        <p className="text-muted-foreground">
          Explore candidate profiles, policies, and track election progress
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, party, or position..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-lg text-base"
              />
            </div>
            <div>
              <select
                value={selectedParty}
                onChange={e => setSelectedParty(e.target.value)}
                className="h-12 rounded-lg border px-4 text-base"
              >
                {parties.map(party => (
                  <option key={party.value} value={party.value}>{party.label}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidate List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.length === 0 && !loading && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            No candidates found.
          </div>
        )}
        {loading && (
          <div className="col-span-full text-center py-12">Loading...</div>
        )}
        {error && (
          <div className="col-span-full text-center text-red-500 py-12">{error}</div>
        )}
        {filteredCandidates.map(candidate => (
          <Card key={candidate.id} className="hover:shadow-lg transition">
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Avatar className="w-14 h-14">
                <AvatarFallback>{candidate.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg font-semibold">{candidate.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${getPartyColor(candidate.party)}`}></span>
                  {candidate.party}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-sm text-muted-foreground">{candidate.position} {candidate.year ? `(${candidate.year})` : ""}</div>
              {candidate.summary && <div className="mb-2 text-base">{candidate.summary}</div>}
              {candidate.manifesto && <div className="mb-2 text-xs italic">Manifesto: {candidate.manifesto}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Candidates;
