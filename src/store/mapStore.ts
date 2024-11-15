import { create } from 'zustand';
import { countries } from '../data/countries';

interface MapState {
  selectedCountry: string | null;
  center: [number, number];
  zoom: number;
  showUnselected: boolean;
  setSelectedCountry: (country: string | null) => void;
  setZoom: (zoom: number) => void;
  setCenter: (center: [number, number]) => void;
  toggleUnselected: () => void;
  selectCountryByName: (countryName: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedCountry: null,
  center: [0, 0],
  zoom: 1,
  showUnselected: true,
  setSelectedCountry: (country) => set({ selectedCountry: country }),
  setZoom: (zoom) => set({ zoom }),
  setCenter: (center) => set({ center }),
  toggleUnselected: () => set((state) => ({ showUnselected: !state.showUnselected })),
  selectCountryByName: (countryName) => {
    if (!countryName) {
      set({ selectedCountry: null, center: [0, 0], zoom: 1 });
      return;
    }
    
    const country = countries.find(c => c.value === countryName);
    if (country) {
      set({
        selectedCountry: country.value,
        center: country.coordinates,
        zoom: country.zoom
      });
    }
  }
}));