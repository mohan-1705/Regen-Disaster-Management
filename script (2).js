// Sample data with coordinates (replace with API calls in production)
let updates = [
    { id: 1, message: "Flood reported in Area A - 10 volunteers needed", time: "2025-02-22 10:00", lat: 51.505, lng: -0.09 }
];
let resources = [
    { name: "Water Bottles", quantity: 100, lat: 51.51, lng: -0.08 },
    { name: "Blankets", quantity: 50, lat: 51.50, lng: -0.07 }
];
let alerts = [];
let volunteers = [
    { name: "John Doe", email: "john@example.com", skills: "Medical", lat: 51.52, lng: -0.10 }
];

// Map variable
let map;

function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    if (sectionId === 'updates') loadUpdates();
    if (sectionId === 'resources') loadResources();
    if (sectionId === 'alerts') loadAlerts();
    if (sectionId === 'volunteers') loadVolunteers();
    if (sectionId === 'map') initMap();
}

// Load Live Updates
function loadUpdates() {
    const feed = document.getElementById('updates-feed');
    feed.innerHTML = '';
    updates.forEach(update => {
        const div = document.createElement('div');
        div.className = 'update-item';
        div.innerHTML = `<strong>${update.time}</strong>: ${update.message} (Lat: ${update.lat}, Lng: ${update.lng})`;
        feed.appendChild(div);
    });
}

// Load Resources
function loadResources() {
    const list = document.getElementById('resources-list');
    list.innerHTML = '';
    resources.forEach(resource => {
        const div = document.createElement('div');
        div.className = 'resource-item';
        div.innerHTML = `${resource.name}: ${resource.quantity} available (Lat: ${resource.lat}, Lng: ${resource.lng})`;
        list.appendChild(div);
    });
}

// Add Resource
document.getElementById('resource-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('resource-name').value;
    const quantity = document.getElementById('resource-quantity').value;
    resources.push({ name, quantity: parseInt(quantity), lat: 51.50 + Math.random() * 0.02, lng: -0.09 + Math.random() * 0.02 });
    loadResources();
    this.reset();
});

// Load Alerts
function loadAlerts() {
    const list = document.getElementById('alerts-list');
    list.innerHTML = '';
    alerts.forEach(alert => {
        const div = document.createElement('div');
        div.className = 'alert-item';
        div.innerHTML = `<strong>${alert.time}</strong>: ${alert.message} (Lat: ${alert.lat}, Lng: ${alert.lng})`;
        list.appendChild(div);
    });
}

// Simulate Emergency Alert
function triggerAlert() {
    const newAlert = {
        message: "Emergency: Evacuation needed in Area B!",
        time: new Date().toLocaleString(),
        lat: 51.53,
        lng: -0.11
    };
    alerts.push(newAlert);
    loadAlerts();
    alert(newAlert.message);
}

// Load Volunteers
function loadVolunteers() {
    const list = document.getElementById('volunteers-list');
    list.innerHTML = '';
    volunteers.forEach(volunteer => {
        const div = document.createElement('div');
        div.className = 'volunteer-item';
        div.innerHTML = `<strong>${volunteer.name}</strong> (${volunteer.email}) - Skills: ${volunteer.skills} (Lat: ${volunteer.lat}, Lng: ${volunteer.lng})`;
        list.appendChild(div);
    });
}

// Add Volunteer
document.getElementById('volunteer-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('volunteer-name').value;
    const email = document.getElementById('volunteer-email').value;
    const skills = document.getElementById('volunteer-skills').value;
    volunteers.push({ 
        name, 
        email, 
        skills, 
        lat: 51.50 + Math.random() * 0.03, 
        lng: -0.09 + Math.random() * 0.03 
    });
    loadVolunteers();
    this.reset();
    alert(`Thank you, ${name}, for signing up as a volunteer!`);
});

// Initialize Map
function initMap() {
    if (!map) {
        map = L.map('map-container').setView([51.505, -0.09], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
    }
    updateMapMarkers();
}

// Update Map Markers
function updateMapMarkers() {
    // Clear existing markers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) map.removeLayer(layer);
    });

    // Add Updates
    updates.forEach(update => {
        L.marker([update.lat, update.lng])
            .addTo(map)
            .bindPopup(`<b>Update:</b> ${update.message}<br><i>${update.time}</i>`);
    });

    // Add Resources
    resources.forEach(resource => {
        L.marker([resource.lat, resource.lng], { icon: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', iconSize: [25, 25] }) })
            .addTo(map)
            .bindPopup(`<b>Resource:</b> ${resource.name}<br>Quantity: ${resource.quantity}`);
    });

    // Add Alerts
    alerts.forEach(alert => {
        L.marker([alert.lat, alert.lng], { icon: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/3524/3524659.png', iconSize: [25, 25] }) })
            .addTo(map)
            .bindPopup(`<b>Alert:</b> ${alert.message}<br><i>${alert.time}</i>`);
    });

    // Add Volunteers
    volunteers.forEach(volunteer => {
        L.marker([volunteer.lat, volunteer.lng], { icon: L.icon({ iconUrl: 'https://cdn-icons-png.flaticon.com/512/1077/1077063.png', iconSize: [25, 25] }) })
            .addTo(map)
            .bindPopup(`<b>Volunteer:</b> ${volunteer.name}<br>Skills: ${volunteer.skills}<br>Email: ${volunteer.email}`);
    });
}

// Initialize with Updates section
showSection('updates');

// Simulate real-time updates
setInterval(() => {
    const newUpdate = {
        id: updates.length + 1,
        message: `New volunteer request #${updates.length + 1}`,
        time: new Date().toLocaleString(),
        lat: 51.50 + Math.random() * 0.03,
        lng: -0.09 + Math.random() * 0.03
    };
    updates.push(newUpdate);
    if (document.getElementById('updates').classList.contains('active')) loadUpdates();
    if (document.getElementById('map').classList.contains('active')) updateMapMarkers();
}, 10000);