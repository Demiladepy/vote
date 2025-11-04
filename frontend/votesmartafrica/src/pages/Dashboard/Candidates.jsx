import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";

const Candidates = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError("");
    setCandidates([]);

    try {
      const res = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Search failed");

      // Extract candidate metadata from backend response
      setCandidates(data.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch candidates");
    } finally {
      setLoading(false);
    }
  };

  const getPartyColor = (party) => {
    const colors = {
      "All Progressives Congress (APC)": "bg-green-700",
      "People's Democratic Party (PDP)": "bg-blue-700",
      "Labour Party (LP)": "bg-red-600"
    };
    return colors[party] || "bg-gray-500"
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Candidate Search</h1>
        <p className="text-muted-foreground">
          Query the AI-powered database for candidate profiles and manifestos
        </p>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Ask about a candidate, e.g. 'What is Peter Obi’s manifesto?'"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="pl-10 h-12 rounded-lg text-base"
              />
            </div>
            <div>
              <Button
                onClick={handleSearch}
                className="h-12 px-6 text-base rounded-lg"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidate List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && candidates.length === 0 && !error && (
          <div className="col-span-full text-center text-muted-foreground py-12">
            Try searching for a candidate to get started.
          </div>
        )}

        {loading && (
          <div className="col-span-full text-center py-12">Fetching results...</div>
        )}

        {error && (
          <div className="col-span-full text-center text-red-500 py-12">{error}</div>
        )}

        {candidates.map((result) => {
          const candidate = result.metadata;
          return (
            <Card key={result.id} className="hover:shadow-lg transition">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar className="w-14 h-14">
                  <AvatarFallback>{candidate.name?.[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {candidate.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${getPartyColor(
                        candidate.party
                      )}`}
                    ></span>
                    {candidate.party}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2 text-sm text-muted-foreground">
                  {candidate.position} {candidate.year ? `(${candidate.year})` : ""}
                </div>
                {candidate.summary && (
                  <div className="mb-2 text-base">{candidate.summary}</div>
                )}
                {candidate.manifesto && (
                  <div className="mb-2 text-xs italic">
                    Manifesto: {candidate.manifesto}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Candidates;
