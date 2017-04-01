function Particle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.speed = 0.5;
	this.vx = 2;
	this.scaleX = 1;
	this.scaleY = 1;
	this.targetX = W / 2;
	this.targetY = H / 2 + 18;
	this.oldY = y;
	this.length = 10;
	this.color = '#fff';
}

Particle.prototype.draw = function(ctx) {
	ctx.save();
	ctx.translate(this.x, this.y);
	ctx.scale(this.scaleX, this.scaleY);
	ctx.strokeStyle = this.color;
	ctx.lineWidth = 10;
	ctx.lineCap = 'round';
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(0, this.length);
	ctx.stroke();
	ctx.restore();
};

var canvas = document.querySelector('canvas'),
	ctx = canvas.getContext('2d'),
	W = canvas.width = window.innerWidth,
	H = canvas.height = window.innerHeight,
	particles = [],
	range = 200,
	slider = new Particle(W / 2 - range, H / 2 - 60, 10);

for (var x = W / 2 - range; x <= W / 2 + range; x += 30) {
	particles.push(new Particle(x, H / 2, 5));
}

slider.length = 2;

function drawParticles(p) {
	var dx, dy, dist,
		length = p.y + p.length;
	dx = (slider.x - p.x);
	dy = (slider.y - p.y);
	dist = Math.sqrt(dx * dx + dy * dy);
	if (dist <= 120) {
		p.color = '#31ac8f';
		p.targetY = H / 2 + 100 + (dist / 1.2) * -1;
		p.scaleY += dist / 100;
		if (p.scaleY > 2) p.scaleY = 2;
		p.y += (p.targetY - p.y) * dist / 100 * 0.2;
	} else {
		p.color = '#179175';
		p.targetY = H / 2;
		p.scaleY -= 0.1;
		if (p.scaleY < 1) p.scaleY = 1;
		p.y += (p.targetY - p.y) * dist / 100 * 0.2;
	}
	p.draw(ctx);
}

setInterval(function() {
	slider.targetX = W / 2 - range + Math.random() * range * 2;
}, 2000);

function drawSlider(slider) {
	var speed = 0.2,
		gravity = 0.4;
	if (slider.x > W / 2 + range) {
		slider.vx *= -1;
	}
	slider.vx += (slider.targetX - slider.x) * speed;
	slider.vx *= gravity;
	slider.x += slider.vx;
	slider.draw(ctx);
}

(function drawFrame(){
	requestAnimationFrame(drawFrame);
	ctx.fillStyle = '#1b1e69';
	ctx.fillRect(0, 0, W, H);
	drawSlider(slider);
	particles.forEach(drawParticles);
}());
