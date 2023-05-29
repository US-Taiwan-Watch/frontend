import React, { useState } from "react";
import { geoCentroid } from "d3-geo";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Annotation,
} from "react-simple-maps";

import allStates from "./data/allstates.json";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const offsets: { [key: string]: [number, number] } = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

const HOVERED_OPACITY = "70%";
const PRESSED_OPACITY = "50%";

// TODO: input param
const heatColor = "#044564";

type USStatesMapProps = {
  heatData: string[] | { [state: string]: number };
  maxHeat?: number;
  onStateClick?: (state: string) => void;
};

export const USStatesMap: React.FC<USStatesMapProps> = ({
  heatData,
  maxHeat,
  onStateClick,
}) => {
  let heatMap: { [state: string]: number };
  let realMaxHeat: number;
  if (Array.isArray(heatData)) {
    heatMap = Object.fromEntries(heatData.map((state) => [state, 1]));
    realMaxHeat = 1;
  } else {
    heatMap = heatData;
    realMaxHeat = maxHeat || Math.max(...Object.values(heatData));
  }
  const [hovered, setHovered] = useState("");

  const handleClick = (code: string) => {
    onStateClick && onStateClick(code);
  };
  const cursor = onStateClick ? "pointer" : "default";

  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => {
          geographies = geographies.map((geo) => ({
            ...geo,
            code: allStates.find((s) => s.val === geo.id)?.id,
          }));
          return (
            <>
              {geographies.map((geo) => {
                // charts
                return (
                  geo.code && (
                    <Geography
                      style={{
                        default: { outline: "none", cursor },
                        hover: {
                          outline: "none",
                          cursor,
                          opacity: HOVERED_OPACITY,
                        },
                        pressed: {
                          outline: "none",
                          cursor,
                          opacity: onStateClick
                            ? PRESSED_OPACITY
                            : HOVERED_OPACITY,
                        },
                      }}
                      fillOpacity={
                        (heatMap[geo.code]
                          ? (heatMap[geo.code] * 100.0) / realMaxHeat
                          : "100") + "%"
                      }
                      key={geo.rsmKey}
                      stroke="#FFF"
                      geography={geo}
                      fill={heatMap[geo.code] ? heatColor : "#DDD"}
                      onMouseEnter={() => setHovered(geo.code)}
                      onMouseLeave={() => setHovered("")}
                      onClick={() => handleClick(geo.code)}
                    />
                  )
                );
              })}
              {geographies.map((geo) => {
                // texts
                const centroid = geoCentroid(geo);
                return (
                  (geo.code === hovered || heatMap[geo.code]) && (
                    <g
                      key={geo.rsmKey + "-name"}
                      style={{
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {centroid[0] > -160 &&
                        centroid[0] < -67 &&
                        (Object.keys(offsets).indexOf(geo.code) === -1 ? (
                          <Marker coordinates={centroid}>
                            <text y="2" fontSize={14} textAnchor="middle">
                              {geo.code}
                            </text>
                          </Marker>
                        ) : (
                          <Annotation
                            subject={centroid}
                            connectorProps={{}}
                            dx={offsets[geo.code][0]}
                            dy={offsets[geo.code][1]}
                          >
                            <text
                              x={4}
                              fontSize={14}
                              alignmentBaseline="middle"
                            >
                              {geo.code}
                            </text>
                          </Annotation>
                        ))}
                    </g>
                  )
                );
              })}
            </>
          );
        }}
      </Geographies>
    </ComposableMap>
  );
};
