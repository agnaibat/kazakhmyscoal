
document.addEventListener("DOMContentLoaded", function () {

  const map = L.map('map', {
    zoomControl: true,
    scrollWheelZoom: false
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  const mainPoint = [49.8, 73.1];

  const cities = {
    karaganda: { name: "Караганда", coords: [49.8, 73.1], type: "main" },
    balkhash: { name: "Балхаш", coords: [46.84, 74.98] },
    topar: { name: "Топар", coords: [49.9, 72.9] },
    shakhtinsk: { name: "Шахтинск", coords: [49.7, 72.6] },
    zhezkazgan: { name: "Жезказган", coords: [47.8, 67.7] },
    satpayev: { name: "Сатпаев", coords: [47.9, 67.5] },
    shu: { name: "Шу", coords: [43.6, 73.8] },
    chelyabinsk: { name: "Челябинск (РФ)", coords: [55.16, 61.4], type: "export" }
  };

  const markers = {};

  Object.keys(cities).forEach(key => {

    const city = cities[key];

    const color =
      city.type === "main" ? "#22d3ee" :
      city.type === "export" ? "#ef4444" :
      "#3b82f6";

    const radius =
      city.type === "main" ? 8 : 6;

    // Маркер
    markers[key] = L.circleMarker(city.coords, {
      radius: radius,
      color: color,
      fillColor: color,
      fillOpacity: 1,
      weight: 2
    }).addTo(map)
      .bindPopup(`<strong>${city.name}</strong>`);

    // Линии маршрутов (кроме центра)
    if (key !== "karaganda") {
      L.polyline([mainPoint, city.coords], {
        color: color,
        weight: 2,
        dashArray: city.type === "export" ? "6,6" : null,
        opacity: 0.7
      }).addTo(map);
    }

    // ===== ПОСТОЯННАЯ ПОДПИСЬ =====
    L.marker(city.coords, {
      icon: L.divIcon({
        className: 'map-label',
        html: city.name,
        iconSize: [120, 20],
        iconAnchor: [-15, 15]
      }),
      interactive: false
    }).addTo(map);

  });

  const bounds = L.latLngBounds(
    Object.values(cities).map(c => c.coords)
  );

  map.fitBounds(bounds.pad(0.3));

  /* ===========================
     СВЯЗКА С ТЕГАМИ
  ============================ */

  document.querySelectorAll(".tag").forEach(tag => {

    const cityKey = tag.dataset.city;

    tag.addEventListener("mouseenter", function () {
      if (!markers[cityKey]) return;

      markers[cityKey].setStyle({
        radius: 12,
        weight: 3
      });
    });

    tag.addEventListener("mouseleave", function () {
      if (!markers[cityKey]) return;

      const baseRadius = cityKey === "karaganda" ? 8 : 6;

      markers[cityKey].setStyle({
        radius: baseRadius,
        weight: 2
      });
    });

    tag.addEventListener("click", function () {
      if (!markers[cityKey]) return;

      map.setView(cities[cityKey].coords, 7, {
        animate: true,
        duration: 0.6
      });

      markers[cityKey].openPopup();
    });

  });

});