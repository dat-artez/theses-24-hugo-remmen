let scrollMax = 0;
let lightness = 0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const pageWidth  = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;

canvas.style.width = pageWidth;
canvas.style.height = pageHeight;

function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

window.addEventListener("scroll", (event) => {

    let scroll = this.scrollY;

    if (scroll > scrollMax) {
        scrollMax = scroll;
        console.log(scrollMax);
    }

    lightness = map_range(scrollMax, 0, 12000, 0, 100);

    //document.body.style.backgroundColor = "hsl(0,0%," + lightness + "%)";

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;

    function paintGreen(data) {
        // data represents the Uint8ClampedArray containing the data
        // in the RGBA order [r0, g0, b0, a0, r1, g1, b1, a1, ..., rn, gn, bn, an]
        var numPixels = data.length / 4;

        for (let i = 0; i < numPixels; i += 1) {

            data[i * 4 + 1] = 255; // Green channel
            data[i * 4 + 3] = 255; // Alpha channel
        }
    }

    // Paint pixel data into the context
    ctx.putImageData(imageData, 0, 0);
    
    paintGreen(data);

});

