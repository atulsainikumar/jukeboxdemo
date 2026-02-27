"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import {
  Search,
  Music,
  Check,
  Sparkles,
  Crown,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Song {
  id: number;
  title: string;
  artist: string;
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Song[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (!search.trim() || isLoading) return;

    setIsLoading(true);
    setShowResults(false);
    setSelectedSong(null);

    setTimeout(() => {
      const mockResults: Song[] = [
        { id: 1, title: `${search} Remix`, artist: "DJ Night" },
        { id: 2, title: `${search} Acoustic`, artist: "Live Band" },
        { id: 3, title: `${search} Original`, artist: "Studio Artist" },
        { id: 4, title: `${search} Extended Mix`, artist: "Club Version" },
      ];

      setResults(mockResults);
      setShowResults(true);
      setIsLoading(false);
    }, 1200);
  };

  const handleModeClick = (mode: string) => {
  if (!selectedSong) {
    setError("Please select a song first to continue.");

    searchRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    setTimeout(() => {
      searchRef.current?.focus();
    }, 400);

    setTimeout(() => setError(""), 3000);
    return;
  }

  // 🔥 Instead of alert → open popup
  setSelectedPlan(mode);
};

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <div className="max-w-md mx-auto px-5 py-8">

        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/cafe_logo.png"
            alt="Cafe Deja Vu"
            width={100}
            height={60}
          />
        </div>

        {/* NOW PLAYING */}
        <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl p-5 mb-6 border border-zinc-800 shadow-md">
          <p className="text-xs uppercase text-zinc-400 mb-3 tracking-wider">
            Now Playing
          </p>
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 bg-zinc-800 rounded-xl flex items-center justify-center">
              <Music size={22} className="text-zinc-400" />
            </div>
            <div>
              <p className="text-base font-medium">Song Title</p>
              <p className="text-sm text-zinc-400">Artist Name</p>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="relative mb-4">
          <input
            ref={searchRef}
            type="text"
            placeholder="Search for a song..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full bg-[#111827] border border-zinc-700 rounded-xl py-3 pl-11 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <Search className="absolute left-3 top-3.5 text-zinc-500" size={18} />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-300 text-black text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center justify-center min-w-[70px]"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Search"
            )}
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/40 text-red-400 rounded-xl p-3 text-sm flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* SEARCH RESULTS */}
        {showResults && (
          <div className="mb-8">
            <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl p-5 border border-zinc-700 shadow-lg">
              <p className="text-sm text-zinc-400 mb-4">
                Search Results
              </p>
              <div className="space-y-3">
                {results.map((song) => (
                  <div
                    key={song.id}
                    onClick={() => setSelectedSong(song)}
                    className={`group cursor-pointer bg-[#0F172A] hover:bg-[#111827] border ${
                      selectedSong?.id === song.id
                        ? "border-yellow-500"
                        : "border-transparent"
                    } hover:border-yellow-500/40 rounded-xl p-3 transition-all duration-300 flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-zinc-800 rounded-lg flex items-center justify-center">
                        <Music size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{song.title}</p>
                        <p className="text-xs text-zinc-400">{song.artist}</p>
                      </div>
                    </div>
                    <span className="text-xs text-yellow-400 opacity-0 group-hover:opacity-100 transition">
                      Select
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NORMAL */}
        <div onClick={() => handleModeClick("Normal")} className="group cursor-pointer mb-6">
          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] rounded-2xl p-6 border border-transparent group-hover:border-zinc-500/50 transition shadow-md">
            <h2 className="text-lg font-semibold mb-2">Normal</h2>
            <p className="text-zinc-400 mb-3">Free</p>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                Standard queue
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                Can be skipped anytime
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                No queue visibility
              </li>
            </ul>
          </div>
        </div>

        {/* PREMIUM */}
        <div onClick={() => handleModeClick("Premium")} className="group cursor-pointer mb-6">
          <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl p-6 border border-transparent group-hover:border-yellow-500/50 transition shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-yellow-500 rounded-xl flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Premium</h2>
                <p className="text-yellow-400 font-bold">₹5</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                Priority queue
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                Skip protection (15s)
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                See your position
              </li>
            </ul>
          </div>
        </div>

        {/* SUPER PREMIUM */}
        <div onClick={() => handleModeClick("Super Premium")} className="group cursor-pointer mb-10">
          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] rounded-2xl p-6 border border-transparent group-hover:border-pink-500/50 transition shadow-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 bg-pink-600 rounded-xl flex items-center justify-center">
                <Crown size={18} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Super Premium</h2>
                <p className="text-pink-400 font-bold">₹15</p>
              </div>
            </div>
            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                Top priority
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                Cannot be skipped
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-green-400" />
                Instant queue visibility
              </li>
            </ul>
          </div>
        </div>

        {/* QUEUE LOCKED */}
        <div className="bg-gradient-to-br from-[#111827] to-[#0F172A] border border-zinc-700 rounded-2xl p-6 text-center shadow-lg">
          <div className="mb-4 text-3xl">🔒</div>
          <h3 className="text-lg font-semibold mb-2">Queue Locked</h3>
          <p className="text-sm text-zinc-400 mb-6">
            Upgrade to Premium or Super Premium to see live queue & wait time
          </p>
          <div className="flex justify-center gap-3">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
              Premium ₹5
            </button>
            <button className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              Super ₹15
            </button>
          </div>
        </div>

      </div>
      {selectedPlan && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] w-[90%] max-w-md rounded-2xl p-6 border border-zinc-700 shadow-2xl">

      <h2 className="text-xl font-semibold mb-4">
        {selectedPlan} Plan Details
      </h2>

      <div className="mb-4 text-sm text-zinc-300 space-y-2">
        {selectedPlan === "Normal" && (
          <>
            <p>💰 Charge: Free</p>
            <p>• Standard queue</p>
            <p>• Can be skipped anytime</p>
            <p>• No queue visibility</p>
          </>
        )}

        {selectedPlan === "Premium" && (
          <>
            <p>💰 Charge: ₹5</p>
            <p>• Priority queue</p>
            <p>• Skip protection (15s)</p>
            <p>• See your queue position</p>
          </>
        )}

        {selectedPlan === "Super Premium" && (
          <>
            <p>💰 Charge: ₹15</p>
            <p>• Top priority</p>
            <p>• Cannot be skipped</p>
            <p>• Instant queue visibility</p>
          </>
        )}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={() => setSelectedPlan(null)}
          className="px-4 py-2 rounded-lg border border-zinc-600 text-sm hover:bg-zinc-800 transition"
        >
          Cancel
        </button>

        <button
          onClick={() => alert("Proceed to payment")}
          className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-semibold transition"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}