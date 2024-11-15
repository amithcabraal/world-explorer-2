import React, { memo, useState, useEffect } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps';
import { useMapStore } from '../store/mapStore';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface WorldMapProps {
  initialCountry?: string;
  defaultShowUnselected?: boolean;
  standalone?: boolean;
}

export const WorldMap: React.FC<WorldMapProps> = memo(({ 
  initialCountry,
  defaultShowUnselected = true,
  standalone = false
}) => {
  const [tooltip, setTooltip] = useState<{ content: string; position: { x: number; y: number } } | null>(null);
  
  const store = standalone ? null : useMapStore();
  const [localState, setLocalState] = useState({
    selectedCountry: initialCountry || null,
    center: [0, 0] as [number, number],
    zoom: 1,
    showUnselected: defaultShowUnselected
  });

  const {
    selectedCountry,
    center,
    zoom,
    showUnselected
  } = standalone ? localState : {
    selectedCountry: store?.selectedCountry || null,
    center: store?.center || [0, 0],
    zoom: store?.zoom || 1,
    showUnselected: store?.showUnselected || true
  };

  useEffect(() => {
    if (initialCountry) {
      import('../data/countries').then(({ countries }) => {
        const country = countries.find(c => c.value === initialCountry);
        if (country) {
          if (standalone) {
            setLocalState({
              selectedCountry: country.value,
              center: country.coordinates,
              zoom: country.zoom,
              showUnselected: defaultShowUnselected
            });
          } else if (store) {
            store.selectCountryByName(country.value);
          }
        }
      });
    }
  }, [initialCountry, store, standalone, defaultShowUnselected]);

  return (
    <div className="w-full h-full relative" style={{ aspectRatio: '16/9' }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 150
        }}
      >
        <ZoomableGroup
          zoom={zoom}
          center={center}
          minZoom={1}
          maxZoom={8}
          onMoveEnd={({ coordinates, zoom }) => {
            if (standalone) {
              setLocalState(prev => ({
                ...prev,
                center: coordinates as [number, number],
                zoom
              }));
            } else if (store) {
              store.setCenter(coordinates as [number, number]);
              store.setZoom(zoom);
            }
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isSelected = selectedCountry === geo.properties.name;
                const isVisible = isSelected || showUnselected;
                
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={(evt) => {
                      if (isVisible) {
                        const { pageX, pageY } = evt;
                        setTooltip({
                          content: geo.properties.name,
                          position: { x: pageX, y: pageY }
                        });
                      }
                    }}
                    onMouseLeave={() => {
                      setTooltip(null);
                    }}
                    style={{
                      default: {
                        fill: isSelected
                          ? '#3b82f6'
                          : showUnselected
                            ? '#2a4365'
                            : '#1a202c',
                        stroke: '#1a202c',
                        strokeWidth: 0.5,
                        outline: 'none',
                        cursor: isVisible ? 'pointer' : 'default',
                      },
                      hover: {
                        fill: isVisible ? '#60a5fa' : '#1a202c',
                        stroke: '#1a202c',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#3b82f6',
                        stroke: '#1a202c',
                        strokeWidth: 0.5,
                        outline: 'none',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      {tooltip && (
        <div
          className="tooltip"
          style={{
            left: tooltip.position.x,
            top: tooltip.position.y - 40
          }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
});