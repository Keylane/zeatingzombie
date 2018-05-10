(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"zombieTest_001_atlas_", frames: [[822,266,51,97],[875,266,51,97],[495,0,493,264],[256,942,254,336],[0,604,272,336],[0,942,254,336],[274,266,272,336],[0,0,493,264],[274,604,254,336],[548,266,272,336],[530,604,254,336],[0,266,272,336],[786,711,232,105],[786,604,233,105]]}
];


// symbols:



(lib.LeftPupil = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.RightPupil = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Group = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.Group_2 = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Group_3 = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.Group_4 = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.Group_1_1 = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.Path = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.Path_1 = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.Path_2 = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.Path_3 = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.LeftEyebrow = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.RightEyebrow = function() {
	this.spriteSheet = ss["zombieTest_001_atlas_"];
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



// stage content:
(lib.zombie = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Right Eyebrow
	this.instance = new lib.RightEyebrow();
	this.instance.parent = this;
	this.instance.setTransform(202,70,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},35).wait(9).to({_off:false},0).wait(41));

	// Left Eyebrow
	this.instance_1 = new lib.LeftEyebrow();
	this.instance_1.parent = this;
	this.instance_1.setTransform(294,70,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({_off:true},35).wait(9).to({_off:false},0).wait(41));

	// <Group>
	this.instance_2 = new lib.Group_4();
	this.instance_2.parent = this;
	this.instance_2.setTransform(280,94,0.25,0.25);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(35).to({_off:false},0).wait(8).to({_off:true},1).wait(41));

	// <Path>
	this.instance_3 = new lib.Path_3();
	this.instance_3.parent = this;
	this.instance_3.setTransform(280,94,0.25,0.25);
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(35).to({_off:false},0).wait(8).to({_off:true},1).wait(41));

	// +Left Pupil
	this.instance_4 = new lib.LeftPupil();
	this.instance_4.parent = this;
	this.instance_4.setTransform(298,122,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(85));

	// <Group>
	this.instance_5 = new lib.Group_3();
	this.instance_5.parent = this;
	this.instance_5.setTransform(282,94,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(85));

	// <Path>
	this.instance_6 = new lib.Path_2();
	this.instance_6.parent = this;
	this.instance_6.setTransform(282,94,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(85));

	// <Group>
	this.instance_7 = new lib.Group_2();
	this.instance_7.parent = this;
	this.instance_7.setTransform(206,94,0.25,0.25);
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(35).to({_off:false},0).wait(8).to({_off:true},1).wait(41));

	// <Path>
	this.instance_8 = new lib.Path_1();
	this.instance_8.parent = this;
	this.instance_8.setTransform(206,94,0.25,0.25);
	this.instance_8._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(35).to({_off:false},0).wait(8).to({_off:true},1).wait(41));

	// +Right Pupil
	this.instance_9 = new lib.RightPupil();
	this.instance_9.parent = this;
	this.instance_9.setTransform(242,122,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(85));

	// <Group>
	this.instance_10 = new lib.Group_1();
	this.instance_10.parent = this;
	this.instance_10.setTransform(208,94,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(85));

	// <Path>
	this.instance_11 = new lib.Path();
	this.instance_11.parent = this;
	this.instance_11.setTransform(208,94,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(85));

	// <Group>
	this.instance_12 = new lib.Group();
	this.instance_12.parent = this;
	this.instance_12.setTransform(218,218,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(85));

	// <Group>_1
	this.instance_13 = new lib.Group_1_1();
	this.instance_13.parent = this;
	this.instance_13.setTransform(218,218,0.25,0.25);

	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(85));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(477,270,150,214);
// library properties:
lib.properties = {
	id: 'C5501356FBA64B399681718FDB2F6195',
	width: 550,
	height: 400,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/zombieTest_001_atlas_.png", id:"zombieTest_001_atlas_"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C5501356FBA64B399681718FDB2F6195'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;