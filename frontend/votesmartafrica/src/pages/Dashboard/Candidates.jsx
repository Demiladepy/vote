import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { generateSummary } from "@/services/chatbot.js";

export default function CandidateSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🧠 Fetch context from backend
  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setResults([]);
    setSummary("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/pinecone/context`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });
      const data = await res.json();
      console.log(data);

      if (!data?.data?.length) {
        setError("No related candidates found.");
        setLoading(false);
        return;
      }

      const filteredResults = data.data
		  .filter(item => item.score > 0.5)
		  .map(item => item.metadata);

		if (!filteredResults.length) {
		  setError("No strong matches found for your query.");
		  setLoading(false);
		  return;
		}

		setResults(filteredResults);

      // 🧠 Optionally generate a Gemini summary
      const combinedText = data.data
        .map(
          (d) =>
            `${d.metadata.name} (${d.metadata.party}): ${d.metadata.manifesto || d.metadata.summary}`
        )
        .join("\n");

      const aiSummary = await generateSummary(query, combinedText);
      setSummary(aiSummary);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPartyColor = (party) => {
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
        <h1 className="text-4xl font-bold text-foreground mb-2">Candidate Search</h1>
        <p className="text-muted-foreground">
          Ask about a candidate’s manifesto or compare policies across parties.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Ask about a candidate or policy..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-12 rounded-lg text-base"
          />
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {/* Error or Loading */}
      {error && <div className="text-red-500">{error}</div>}
      {loading && <div className="text-center py-6 text-muted-foreground">Loading results...</div>}

      {/* 🧠 AI Summary (with Markdown rendering) */}
      {summary && (
        <Card className="border-green-300">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">AI Summary</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm dark:prose-invert max-w-none">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </CardContent>
        </Card>
      )}

      {/* Candidate Cards */}
	  {results.length > 0 && (
	  <div className="space-y-4">
	  <h2 className="text-2xl font-semibold text-foreground">Top Picks</h2>
		  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{results.map((candidate) => (
			  <Card key={candidate.id} className="hover:shadow-lg transition">
				<CardHeader className="flex flex-row items-center gap-4 pb-2">
				  <div>
					<CardTitle className="text-lg font-semibold">{candidate.name}</CardTitle>
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
				  {candidate.summary && <div className="mb-2 text-base">{candidate.summary}</div>}
				  {candidate.manifesto && (
					<div className="mb-2 text-xs italic">
					  Manifesto: {candidate.manifesto}
					</div>
				  )}
				</CardContent>
			  </Card>
			))}
		  </div>
		</div>
			  )}
    </div>

  );
}
