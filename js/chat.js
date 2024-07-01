let maxScrollHeight;
let blackPixels = [];

function setup() {


    createCanvas(document.body.scrollWidth, document.body.scrollHeight);
    clear(); // Make the canvas transparent
    noLoop();

    // Calculate the maximum scroll height
    //maxScrollHeight = document.body.scrollHeight - window.innerHeight;

    maxScrollHeight = 0;

    // Listen for scroll events
    window.addEventListener('scroll', updateCanvas);

    // Listen for resize events to adjust the canvas size
    window.addEventListener('resize', () => {

        resizeCanvas(document.body.scrollWidth, document.body.scrollHeight);
        // maxScrollHeight = document.body.scrollHeight - window.innerHeight;
        redraw();

    });
}

function draw() {
    // Clear the canvas
    clear();

  // Draw all black pixels
    stroke(0);
    strokeWeight(3);
    for (let pixel of blackPixels) {
        point(pixel.x, pixel.y);
    }
}

function updateCanvas() {

    // Get the scroll position
    let scrollY = window.scrollY;

    if (scrollY > maxScrollHeight){
        maxScrollHeight = scrollY;
    }



    // Calculate the number of pixels to modify based on scroll position
    let maxPixels = 10000;
    let numPixels = map(scrollY, 0, maxScrollHeight, 0, maxPixels);

    // Determine the probability factor based on scroll position
    let probFactor = map(scrollY, 0, maxScrollHeight, 2, 0);

    // Add new black pixels based on scroll position
    for (let i = 0; i < numPixels; i++) {
    // Generate a random x coordinate
    let x = random(width);

    // Generate a y coordinate with higher probability for lower values, scaled by probFactor
    let y = map(pow(random(), 2 * probFactor), 0, 1, document.body.scrollHeight, 0);

    // Add the pixel coordinates to the array
    blackPixels.push({ x, y });
    }
  // Redraw the canvas on scroll
    redraw();
}
