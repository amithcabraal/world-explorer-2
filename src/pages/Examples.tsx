import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WorldMap } from '../components/WorldMap';
import { ChevronDown, ChevronUp, Code } from 'lucide-react';

const examples = [
  {
    country: 'United States',
    description: 'Default style example',
    showUnselected: true,
    code: `<WorldMap
  initialCountry="United States"
  defaultShowUnselected={true}
  standalone={true}
/>`
  },
  {
    country: 'Russia',
    description: 'Largest country',
    showUnselected: false,
    code: `<WorldMap
  initialCountry="Russia"
  defaultShowUnselected={false}
  standalone={true}
/>`
  },
  {
    country: 'Japan',
    description: 'Island nation',
    showUnselected: true,
    code: `<WorldMap
  initialCountry="Japan"
  defaultShowUnselected={true}
  standalone={true}
/>`
  },
  {
    country: 'Brazil',
    description: 'South America',
    showUnselected: false,
    code: `<WorldMap
  initialCountry="Brazil"
  defaultShowUnselected={false}
  standalone={true}
/>`
  },
  {
    country: 'South Africa',
    description: 'Southern hemisphere',
    showUnselected: true,
    code: `<WorldMap
  initialCountry="South Africa"
  defaultShowUnselected={true}
  standalone={true}
/>`
  },
  {
    country: 'Sri Lanka',
    description: 'Pearl of the Indian Ocean',
    showUnselected: false,
    code: `<WorldMap
  initialCountry="Sri Lanka"
  defaultShowUnselected={false}
  standalone={true}
/>`
  },
];

export const Examples: React.FC = () => {
  const navigate = useNavigate();
  const [expandedCode, setExpandedCode] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Example Maps</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example) => (
            <div
              key={example.country}
              className="relative group overflow-hidden rounded-xl bg-black/20 backdrop-blur-lg p-4"
            >
              <div 
                className="h-48 mb-4 cursor-pointer"
                onClick={() => {
                  navigate(`/?country=${encodeURIComponent(example.country)}`);
                }}
              >
                <WorldMap 
                  initialCountry={example.country}
                  defaultShowUnselected={example.showUnselected}
                  standalone={true}
                />
              </div>
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{example.country}</h3>
                <p className="text-gray-200">{example.description}</p>
              </div>
              <div>
                <button
                  onClick={() => setExpandedCode(expandedCode === example.country ? null : example.country)}
                  className="flex items-center gap-2 px-4 py-2 w-full bg-black/20 hover:bg-black/30 transition-colors rounded-lg text-white"
                >
                  <Code className="w-4 h-4" />
                  <span>View Code</span>
                  {expandedCode === example.country ? (
                    <ChevronUp className="w-4 h-4 ml-auto" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  )}
                </button>
                {expandedCode === example.country && (
                  <div className="mt-4 bg-black/20 rounded-lg p-4">
                    <pre className="text-gray-200 font-mono text-sm whitespace-pre overflow-x-auto">
                      {example.code}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};