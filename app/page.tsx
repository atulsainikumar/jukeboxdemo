"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Search,
  Music,
  Check,
  Sparkles,
  Crown,
  Loader2,
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

  const handleSearch = async () => {
    if (!search.trim() || isLoading) return;

    setIsLoading(true);
    setShowResults(false);

    // Simulate API delay
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <div className="max-w-md mx-auto px-5 py-8">

        {/* Cafe Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/cafe_logo.png"
            alt="Cafe Deja Vu"
            width={160}
            height={60}
            className="object-contain"
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

        {/* SEARCH BAR */}
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search for a song..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#111827] border border-zinc-700 rounded-xl py-3 pl-11 pr-16 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
          <Search
            size={18}
            className="absolute left-3 top-3.5 text-zinc-500"
          />

          {/* Search Button with Spinner */}
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="absolute right-2 top-1.5 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-300 text-black text-xs font-semibold px-3 py-1.5 rounded-lg transition flex items-center justify-center min-w-[70px]"
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Search"
            )}
          </button>
        </div>

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
                        <p className="text-sm font-medium">
                          {song.title}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {song.artist}
                        </p>
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

        {/* NORMAL CARD */}
        <div className="group cursor-pointer transition-all duration-300 mb-6">
          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] rounded-2xl p-6 border border-transparent group-hover:border-zinc-500/50 group-hover:bg-opacity-90 transition-all duration-300 shadow-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-zinc-700 flex items-center justify-center">
                <Music size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Normal</h2>
                <p className="text-zinc-400 text-base font-medium">
                  Free
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-zinc-300">
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

        {/* PREMIUM CARD */}
        <div className="group cursor-pointer transition-all duration-300 mb-6">
          <div className="bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl p-6 border border-transparent group-hover:border-yellow-500/50 group-hover:bg-opacity-90 transition-all duration-300 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-yellow-500 flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Premium</h2>
                <p className="text-yellow-400 text-xl font-bold">
                  ₹5
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-zinc-300">
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

        {/* SUPER PREMIUM CARD */}
        <div className="group cursor-pointer transition-all duration-300 mb-10">
          <div className="bg-gradient-to-br from-[#1F2937] to-[#0F172A] rounded-2xl p-6 border border-transparent group-hover:border-pink-500/50 group-hover:bg-opacity-90 transition-all duration-300 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 rounded-xl bg-pink-600 flex items-center justify-center">
                <Crown size={20} />
              </div>
              <div>
                <h2 className="text-lg font-semibold">
                  Super Premium
                </h2>
                <p className="text-pink-400 text-xl font-bold">
                  ₹15
                </p>
              </div>
            </div>

            <ul className="space-y-3 text-sm text-zinc-300">
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
        <div className="bg-[#111827] border border-zinc-700 rounded-2xl p-6 text-center shadow-lg">
          <div className="mb-4 text-3xl text-zinc-500">🔒</div>
          <h3 className="text-lg font-semibold mb-2">
            Queue Locked
          </h3>
          <p className="text-sm text-zinc-400 mb-6">
            Upgrade to Premium or Super Premium to see live queue &
            wait time
          </p>
          <div className="flex justify-center gap-3">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black text-sm font-medium px-4 py-2 rounded-full transition">
              Premium ₹5
            </button>
            <button className="bg-pink-600 hover:bg-pink-500 text-white text-sm font-medium px-4 py-2 rounded-full transition">
              Super ₹15
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}