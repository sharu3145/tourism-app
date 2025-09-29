"use client";

import { useState } from "react";

export default function Home() {
  const [state, setState] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [places, setPlaces] = useState<string[]>([]);
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);

  // States & Districts
  const states = ["Karnataka", "Kerala", "Tamil Nadu"];
  const districts: { [key: string]: string[] } = {
    Karnataka: ["Bangalore", "Mysore"],
    Kerala: ["Kochi", "Munnar"],
    "Tamil Nadu": ["Chennai", "Madurai"],
  };

  // Tourism Places (dynamic index to fix TS error)
  const tourismPlaces: { [key: string]: string[] } = {
    Bangalore: ["Lalbagh", "Cubbon Park", "Bangalore Palace"],
    Mysore: ["Mysore Palace", "Brindavan Gardens"],
    Kochi: ["Fort Kochi", "Marine Drive"],
    Munnar: ["Tea Gardens", "Top Station"],
    Chennai: ["Marina Beach", "Kapaleeshwarar Temple"],
    Madurai: ["Meenakshi Temple", "Thirumalai Nayakar Mahal"],
  };

  // Hotels (dynamic index)
  const hotels: { [key: string]: string[] } = {
    Lalbagh: ["Hotel Green Park", "Garden Residency"],
    "Cubbon Park": ["Park View Inn", "Central Lodge"],
    "Mysore Palace": ["Palace Stay", "Royal Heritage Hotel"],
    "Fort Kochi": ["Sea View Hotel", "Marine Residency"],
    "Tea Gardens": ["Hilltop Resort", "Munnar Stay"],
    "Marina Beach": ["Beachside Inn", "Chennai Residency"],
    "Meenakshi Temple": ["Temple View Hotel", "Madurai Inn"],
  };

  // Show places for selected district
  const handleShowPlaces = () => {
  if (district && tourismPlaces[district]) {
    setPlaces(tourismPlaces[district]);
  } else {
    setPlaces([]);
  }
  setSelectedPlaces([]);
};


  // Select / deselect places
  const togglePlace = (place: string) => {
    setSelectedPlaces((prev) =>
      prev.includes(place) ? prev.filter((p) => p !== place) : [...prev, place]
    );
  };

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-6">
        Explore India – Plan Your Trip
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Select your state and district, explore tourist places, choose hotels, and generate a route.
      </p>

      {/* State & District selection */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setDistrict("");
            setPlaces([]);
            setSelectedPlaces([]);
          }}
          className="p-2 rounded border"
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          className="p-2 rounded border"
          disabled={!state}
        >
          <option value="">Select District</option>
          {districts[state]?.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <button
          onClick={handleShowPlaces}
          disabled={!district}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-300"
        >
          Show Places
        </button>
      </div>

      {/* Tourist Places */}
      <div className="grid md:grid-cols-2 gap-4">
        {places.map((place) => (
          <div
            key={place}
            onClick={() => togglePlace(place)}
            className={`border p-4 rounded cursor-pointer transition ${
              selectedPlaces.includes(place)
                ? "border-blue-600 shadow-lg"
                : "hover:shadow"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">{place}</h2>
            <p className="text-sm text-gray-600 mb-2">Nearby Hotels:</p>
            <ul className="list-disc list-inside text-sm">
              {(district && hotels[place] ? hotels[place] : ["Hotel A", "Hotel B"]).map((h) => (
                <li key={h}>
                  <a
                    href={`https://www.google.com/search?q=${h}+${district}`}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {h}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Route Map Button */}
      {selectedPlaces.length > 0 && (
        <div className="mt-8 text-center">
          <button onClick={() => {
        const queryPlaces = selectedPlaces
          .map((place) => `${place}, ${district}`)
          .join("/");
        const url = `https://www.google.com/maps/dir/${queryPlaces}`;
        window.open(url, "_blank"); // opens in new tab
      }}
      className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 flex items-center justify-center mx-auto gap-2"
    >
      Generate Route Map
          </button>
        </div>
      )}
    </div>
  );
}
