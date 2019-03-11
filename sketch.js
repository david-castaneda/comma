// Window
let vw = window.innerWidth;
let vh = 720;
let angle = 0;
let zoom = 1;

// Data
let trip;
let trips = [];

// Camera Sliders
let camX = 0;
let camY = 0;
let camZoom;

// Points Sliders
let px = 0;
let py = 0;

function preload() {
  filenames = loadJSON("./files.json");
}

function loadTrips() {
  trip = loadJSON("./trips/" + filenames.files[0]);

  filenames.files.map((file, i) => {
    s_trip = loadJSON("./trips/" + file);
    s_trip.key = i + 1;

    trips.push(s_trip);
  });
}

function mapAllTrips() {
  trips.map(trip => {
    if (trip.coords) {
      let { coords, key } = trip;

      // trip instance
      let tripInstance = new Trip(coords, key);

      tripInstance.plot();
    }
  });
}

function mapSingleTrip() {
  if (trip.coords) {
    const { coords } = trip;
    const key = 0;

    // trip instance
    let tripInstance = new Trip(coords, key);

    tripInstance.plot();
  }
}

function setup() {
  createCanvas(vw, vh, WEBGL);

  camZoom = createSlider(1, 8, 1);

  dropdown = createSelect();
  // dropdown.option("All trips");
  filenames.files.map(file => dropdown.option(file));

  // Load all trips
  loadTrips();

  dropdown.changed(selectTrip);
}

function selectTrip() {
  if (this.selected() == "All trips") {
    mapAllTrips();
  } else {
    trip = loadJSON("./trips/" + this.selected());
  }
}

function setupCamera() {
  if (mouseIsPressed) {
    if (mouseX < vw && mouseY < vh) {
      camX = map(mouseX, 0, vw, -200, 200);
      camY = map(mouseY, 0, vh, -200, 200);
    }
  }

  camera(camX, camY, vh / camZoom.value() / tan(PI / 6), camX, 0, 0, 0, 1, 0);
}

function setupPlane() {
  push();
  fill(255, 255, 255);
  noStroke();
  translate(0, 200);
  rotateX(HALF_PI);
  plane(vw * 1.5, vh);
  pop();
}

function draw() {
  background(0);

  rectMode(CENTER);
  // Initializes the camera
  setupCamera();

  // Initializes view plane
  setupPlane();

  // mapAllTrips();
  mapSingleTrip();
}

class Trip {
  constructor(coords, key) {
    this.coords = coords;
    this.history = [];
    this.key = key;
  }

  plot() {
    translate(-vw / 1.5, 0, this.key);

    this.coords.map(({ index, lng, lat, speed }) => {
      if (this.coords[parseInt(index) - 1]) {
        let point = new Point(
          index,
          lng,
          lat,
          speed,
          this.coords[parseInt(index) - 1].index,
          this.coords[parseInt(index) - 1].lng,
          this.coords[parseInt(index) - 1].lat,
          this.coords[parseInt(index) - 1].speed,
          this.key
        );

        point.show();
      }
    });
  }
}

class Point {
  constructor(
    current_index,
    current_lng,
    current_lat,
    current_speed,
    prev_index,
    prev_lng,
    prev_lat,
    prev_speed,
    key
  ) {
    this.x = this.getX(current_lng);
    this.y = this.getY(current_lat);

    this.prev_x = this.getX(prev_lng);
    this.prev_y = this.getY(prev_lat);

    this.index = current_index;
    this.prev_index = prev_index;

    this.speed = current_speed;
    this.prev_speed = prev_speed;

    this.color = this.getColor();
    this.key = key;
  }

  // Get Y
  getY(lat) {
    lat = radians(lat);
    var a = (256 / PI) * pow(2, zoom);
    var b = tan(PI / 4 + lat / 2);
    var c = PI - log(b);
    return a * c;
  }

  // Get X
  getX(lng) {
    lng = radians(lng);
    var a = (256 / PI) * pow(2, zoom);
    var b = lng + PI;

    return a * b;
  }

  // Get Color based on speed
  getColor() {
    var i = (this.speed * 255) / 255;
    var r = Math.round(Math.sin(0.024 * i + 0) * 127 + 128);
    var g = Math.round(Math.sin(0.024 * i + 2) * 127 + 128);
    var b = Math.round(Math.sin(0.024 * i + 4) * 127 + 128);
    var rgb = "rgb(" + r + "," + g + "," + b + ")";

    return rgb;
  }

  show() {
    fill(this.color);
    stroke(this.color);

    // if (parseInt(this.index) > parseInt(vw) / 4.5) {
    // if (parseInt(this.index) > parseInt(vw) / 2) {
    // translate(5, 0, 0);
    // circle(vw - this.index, this.speed + 100, 2);
    // rect(-vw - 200, 50, 1, this.speed);
    // } else {
    // translate(5, 0, 0);
    // circle(vw - this.index, this.speed + 100, 2);
    // rect(-vw - 200, 50, 1, this.speed);
    // }
    // } else {
    // translate(5, 0, 0);
    // rect(this.index, 0, 1, this.speed);

    // translate(5, 0, 0);
    circle(this.index, this.speed * (this.key + 1), 2);
    // }
  }
}
