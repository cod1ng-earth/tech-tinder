var canvasWidth =1300;
var canvasHeight = canvasWidth;
var centerW = canvasWidth/2;
var centerH = canvasHeight/2;

var backgroundLayer;
var foregroundLayer;
var maxPolarRadius = canvasHeight*0.5 * 0.95;
function setup() {
  var canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.position(0,0);
  backgroundLayer = createGraphics(canvasWidth,canvasHeight);
  backgroundLayer.clear();
  foregroundLayer = createGraphics(canvasWidth,canvasHeight);
  foregroundLayer.translate(centerW,centerH);
  foregroundLayer.ellipseMode(CENTER);
  foregroundLayer.clear();
  createBackground();
  image(backgroundLayer,0,0);
  fetch('https://tech-tinder.now.sh/technology/stats').then(response => {
		  return response.json();
		}).then(data => {
		  	data.result.forEach(renderData);
		}).catch(err => {
		  // Do something for an error here
		  console.log("technology result fetch error")
		  console.log(err);
		});
  frameRate(1);
}

function draw() {
//put anything here to be callled repeatedly at frameRate() times per sencond
}

function renderData(technology){
	var techName=technology.name;
	var techId= technology._id;
	var techCategory = technology.category;
	
	var maxObject;
	var maxVal =0;
	var results = technology.votes.results;

	Object.keys(results).forEach(key => {
			if(results[key] > maxVal){
				maxVal = results[key];
				maxObject = {'key':key ,'result': results[key]};
			}
	});

	var radius,theta;
	if(techCategory == 'techniques'){
		//theta 0-90
		theta = 90 * random();
	}else if(techCategory == 'platforms'){
		//theta 90-180
		theta = 90 + 90 * random();
	}else if(techCategory == 'languages & frameworks'){
		//theta 180-270
		theta = 180 + 90 * random();
	}else{ // 'tools'
		//theta 270-360
		theta = 270 + 90 * random();
	}
	
	var canvasDiv = document.getElementById("container-p5");
	var newDiv = document.createElement("DIV");      
	if(	maxObject.key == 'using'){
		newDiv.style.backgroundColor='#00FF00';
		radius =  (maxPolarRadius/4)* random();
	}else if(maxObject.key == 'evaluating'){
		newDiv.style.backgroundColor='#00FFFF';
		radius =  (maxPolarRadius/4) + ((maxPolarRadius/4)* random());

	}else if(maxObject.key == 'interested'){
		newDiv.style.backgroundColor='#0000FF';
		radius = (2 * (maxPolarRadius/4))+ ((maxPolarRadius/4)* random());
	}else{ // 'discouraged'
		newDiv.style.backgroundColor='#FF0000';
		radius = (3 * (maxPolarRadius/4)) + ((maxPolarRadius/4)* random());
	}
	//degree to radian correction also done
	var x = radius * cos(theta*0.0174533);
	var y = radius * sin(theta*0.0174533);

	x= x + centerW - 10;
	y= y + centerH - 10;
	newDiv.setAttribute("id",techId);
	newDiv.setAttribute("class","technologyPoint")
	newDiv.style.width=20;
	newDiv.style.height=20;
	newDiv.style.borderRadius='20px';
	newDiv.style.position = "absolute";
	newDiv.style.left = x +'px';
	newDiv.style.top = y +'px';
	canvasDiv.appendChild(newDiv);
}



function createBackground(){
	backgroundLayer.fill(0, 0, 0, 5);
  	backgroundLayer.stroke(0, 0, 0);
	backgroundLayer.ellipse(centerW,centerH, 2*maxPolarRadius*0.25);
	backgroundLayer.fill(0, 0, 0, 10);
	backgroundLayer.ellipse(centerW,centerH, 2*maxPolarRadius*0.50);
	backgroundLayer.fill(0, 0, 0, 15);
	backgroundLayer.ellipse(centerW,centerH, 2*maxPolarRadius*0.75);
	backgroundLayer.fill(0, 0, 0, 20);
	backgroundLayer.ellipse(centerW,centerH, 2*maxPolarRadius);
	backgroundLayer.strokeWeight(2);
	backgroundLayer.line(centerW,0,centerW,canvasHeight);
	backgroundLayer.line(0,centerH,canvasWidth,centerH);
	backgroundLayer.strokeWeight(1);
	backgroundLayer.textSize(72);
	backgroundLayer.fill(0, 0, 0,150);
	backgroundLayer.text('Tools', canvasWidth*0.85,centerH*0.1);
	backgroundLayer.text('Techniques', canvasWidth* 0.67, canvasHeight*0.99 );
	backgroundLayer.text('Platforms', canvasWidth*0.01 ,canvasHeight*0.99);
	backgroundLayer.text('Languages ', 0,centerH *0.1);
	backgroundLayer.text('& Frameworks ', 0,centerH *0.22);
}
