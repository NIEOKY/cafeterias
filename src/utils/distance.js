const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371; // Earth's mean radius in kilometers

  // Convert coordinates from degrees to radians
  const radiansLat1 = (Math.PI * lat1) / 180;
  const radiansLat2 = (Math.PI * lat2) / 180;
  const deltaLat = (Math.PI * (lat2 - lat1)) / 180;
  const deltaLon = (Math.PI * (lon2 - lon1)) / 180;

  // Apply the Haversine formula
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(radiansLat1) *
      Math.cos(radiansLat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
};

export default calculateDistance;
