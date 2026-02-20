# Washington State Wildfires Map

## Web Map URL
You can view the interactive map here:  
https://jonnyjs2.github.io/jonnyjs2/map.html  

## Map Overview
This interactive web map shows **wildfire incidents across Washington State from 2008 to 2025**. Users can explore wildfire locations, see details about each incident, and filter fires by year.  

The map includes:  
- **Wildfire points** representing individual fire incidents.  
- **Color-coded points** by acres burned: light colors for small fires, dark colors for large fires.  
- **Sidebar with filter controls**: a year slider updates both the map and the table.  
- **Table of incidents**: displays incident name, county, acres burned, and year.  
- **Legend**: explains the color scale for acres burned.  

## Examined Geographic Area
The map focuses on **Washington State, USA**, covering all counties and wildfire-prone regions. It provides both spatial and tabular insights into wildfire trends across the state.  

## Map Features
- **Year Filter Slider**: Dynamically updates map points and table to show only fires from the selected year.  
- **Interactive Table**: Clicking table rows highlights corresponding fire points on the map.  
- **Legend**: Visual guide to fire sizes based on acres burned.  
- **Responsive Design**: Sidebar adjusts for smaller screens for usability.  

## Data Source
Wildfire incident data is loaded from a local GeoJSON file: `/assets/firedata.geojson`. Each feature contains:  
- `IncidentName` – Name of the wildfire.  
- `County` – County where the fire occurred.  
- `AcresBurned` – Total acres burned.  
- `Year` – Year of the incident.  
