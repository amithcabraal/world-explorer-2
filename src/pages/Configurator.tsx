import React, { useState } from 'react';
import { WorldMap } from '../components/WorldMap';
import Select from 'react-select';
import { countries } from '../data/countries';

export const Configurator: React.FC = () => {
  const [config, setConfig] = useState({
    selectedCountry: null as string | null,
    showUnselected: true,
    zoom: 1,
    standalone: true
  });

  const selectedCountryOption = countries.find(c => c.value === config.selectedCountry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex">
      <div className="w-1/3 p-8 bg-black/20 backdrop-blur-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Map Configuration</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-white mb-2">Initial Country</label>
            <Select
              options={countries}
              value={selectedCountryOption}
              onChange={(option) => setConfig(prev => ({
                ...prev,
                selectedCountry: option?.value || null
              }))}
              placeholder="Select a country..."
              className="text-gray-900"
              classNamePrefix="select"
              isClearable
            />
          </div>

          <div>
            <label className="block text-white mb-2">Zoom Level</label>
            <input
              type="range"
              min="1"
              max="8"
              step="0.1"
              value={config.zoom}
              onChange={(e) => setConfig(prev => ({
                ...prev,
                zoom: Number(e.target.value)
              }))}
              className="w-full accent-blue-500"
            />
            <span className="text-white">{config.zoom.toFixed(1)}x</span>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.showUnselected}
                onChange={() => setConfig(prev => ({
                  ...prev,
                  showUnselected: !prev.showUnselected
                }))}
                className="form-checkbox"
              />
              <span className="text-white">Show Unselected Countries</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={config.standalone}
                onChange={() => setConfig(prev => ({
                  ...prev,
                  standalone: !prev.standalone
                }))}
                className="form-checkbox"
              />
              <span className="text-white">Standalone Mode</span>
            </label>
          </div>

          <div className="mt-8 p-4 bg-black/20 rounded-lg">
            <h3 className="text-lg font-semibold text-white mb-2">Component Code</h3>
            <pre className="text-sm text-gray-200 font-mono whitespace-pre-wrap break-all">
{`<WorldMap
  initialCountry="${config.selectedCountry || ''}"
  defaultShowUnselected={${config.showUnselected}}
  standalone={${config.standalone}}
/>`}
            </pre>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-8">
        <div className="w-full h-full bg-black/20 backdrop-blur-lg rounded-lg overflow-hidden">
          <WorldMap
            initialCountry={config.selectedCountry || undefined}
            defaultShowUnselected={config.showUnselected}
            standalone={config.standalone}
          />
        </div>
      </div>
    </div>
  );
};