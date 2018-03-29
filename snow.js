window.onload = function(){
    // Get the canvas and context and store in vars
    var canvas = document.getElementById('sky');
    var ctx = canvas.getContext('2d');

    // Set canvas dimensions to window
    var W = window.innerWidth;
    var H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Generate the snow and apply attributes
    var mf = 100; // max flakes
    var flakes = [];

    // Loop through the empty flakes and apply attributes
    for(var i = 0; i < mf; i++){
        flakes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 5 + 2, // Min of 2px and max 7px
            d: Math.random() + 1 // Density of the flake
        });
    }

    // Draw flakes onto canvas
    function drawFlakes(){
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "white";
        ctx.beginPath();
        for(var i = 0; i < mf; i++){
            var f = flakes[i];
            ctx.moveTo(f.x, f.y);
            ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
        }
        ctx.fill();
        moveFlakes();
    }

    // Animate the flakes
    var angle = 0;

    function moveFlakes(){
        angle += 0.01;
        for(var i = 0; i < mf; i++){
            // Store current flake
            var f = flakes[i];
            
            // Update X and Y coords of each flake
            f.y += Math.pow(f.d, 2) + 1;
            f.x += Math.sin(angle) * 2;

            // If the flake reaches the bottom send a new one to top
            if(f.y > H){
                flakes[i] = {
                    x: Math.random() * W,
                    y: 0,
                    r: f.r,
                    d: f.d
                };
            }
        }
    }

    this.setInterval(drawFlakes, 25);
}