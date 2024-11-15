import React from 'react';
import Select from 'react-select';
import { useMapStore } from '../store/mapStore';
import { countries } from '../data/countries';

export const CountrySearch: React.FC = () => {
  const { selectedCountry, selectCountryByName } = useMapStore();

  return (
    <div className="fixed top-24 left-8 w-64 z-10">
      <Select
        options={countries}
        value={countries.find(c => c.value === selectedCountry) || null}
        onChange={(option) => selectCountryByName(option?.value || null)}
        placeholder="Search countries..."
        className="text-gray-900"
        classNamePrefix="select"
        isClearable
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: '#3b82f6',
            primary25: '#60a5fa',
            neutral0: '#1a202c',
            neutral80: '#ffffff',
          },
        })}
      />
    </div>
  );
};