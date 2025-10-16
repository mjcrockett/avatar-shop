(function ($) {
    
    var avatarWidth = 205; //the avatar's width and height are estimated here since these figures are needed before loading and placement on the stage.
    var avatarHeight = 250;

    function TickClass(_stage) {
        /*
        * This class allows us to have multiple instances of avatars on the page while
        * simulatenously controlling the flow of updates to each respective canvas.
        **/
        //var uniqueId = !uniqueId ? 'id-' + Math.random().toString(36).substr(2, 16) : uniqueId;
        var stage = _stage;
        var canUpdate = true;

        // private
        var update = function () {
            if (canUpdate == true) {
                stage.update();
                //console.log(stage.name + uniqueId);
            }
        };

        /*
        * The 'tick' event fires at #fps. The canUpdate variable can limit the
        * number of stage updates in order to improve page performance.
        * */
        createjs.Ticker.addEventListener("tick", update);

        //// public
        return {
            enableUpdate: function(value) {
                if (value === false) {
                    setTimeout(function () {
                        canUpdate = value;
                    }, 300);
                }
                else {
                    canUpdate = value;
                }
            },
            destroy: function() {
                createjs.Ticker.removeEventListener("tick", update);
            }
        };
    }

    var _drawBody = function (options) {
        var _hair;
        var _face;
        var _head;
        var _rightArm;
        var _torso;
        var _legs;
        var _leftArm;
        var _feet;

        if (options.justTheHead == false) {

            _leftArm = new createjs.Bitmap(options.images["leftArm"]);
            options.avatarContainer.addChild(_leftArm);
            _leftArm.x = options.x + 121;
            _leftArm.y = options.y + 177;
            _leftArm.regX = 121;
            _leftArm.regY = 177;
            _leftArm.name = "leftArm";

            _legs = new createjs.Bitmap(options.images["legs"]);
            options.avatarContainer.addChild(_legs);
            _legs.x = options.x + 130;
            _legs.y = options.y + 225;
            _legs.regX = 130;
            _legs.regY = 225;
            _legs.name = "legs";

            _feet = new createjs.Bitmap(options.images["feet"]);
            options.avatarContainer.addChild(_feet);
            _feet.x = options.x + 130;
            _feet.y = options.y + 225;
            _feet.regX = 130;
            _feet.regY = 225;
            _feet.name = "feet";


            _torso = new createjs.Bitmap(options.images["torso"]);
            options.avatarContainer.addChild(_torso);
            _torso.x = options.x + 122;
            _torso.y = options.y + 200;
            _torso.regX = 122;
            _torso.regY = 200;
            _torso.name = "torso";
        }

        _hair = new createjs.Bitmap(options.images["hair"]);
        _face = new createjs.Bitmap(options.images["head"]);
        _head = new createjs.Container();
        _head.addChild(_face);
        _head.addChild(_drawEllipse(140, 125, 10, 18)).name = "leftEye"; // Left Eye
        _head.addChild(_drawEllipse(154, 125, 10, 18)).name = "rightEye"; // Right Eye
        _head.addChild(_hair);
        _head.name = "head";
        _face.name = "face";
        _hair.name = "hair";
        options.avatarContainer.addChild(_head);
        _head.addChild(_mouth("neutral", options, 134, 150));
        _head.x = options.x + 100;
        _head.y = options.y + 178;
        _head.regX = 100;
        _head.regY = 178;

        if (options.justTheHead == false) {
            _rightArm = new createjs.Bitmap(options.images["rightArm"]);
            options.avatarContainer.addChild(_rightArm);
            _rightArm.x = options.x + 103;
            _rightArm.y = options.y + 177;
            _rightArm.regX = 103;
            _rightArm.regY = 177;
            _rightArm.name = "rightArm";
        }
    };

    var _mouth = function (expression, options, leftX, leftY) {
        var g = new createjs.Graphics();
        var line = new createjs.Shape(g);

        //Note: the mouth is always index 3 within the head container.
        for (var ctA = 0; ctA < options.avatarContainer.children.length; ctA++) {
            if (options.avatarContainer.children[ctA].name === "head") {
                options.headIndex = ctA;

                if (options.avatarContainer.children[ctA].children[3].name === "mouth") {//if an expression is already here, delete it.
                    options.avatarContainer.children[ctA].children.splice(3, 1);
                }
                break;
            }
        }

        //quadratic curve is similar to ActionScript's Curveto 
        //awesome explanation: http://www.actionscript.org/resources/articles/729/1/Drawing-curves-with-AS2/Page1.html
        switch (expression) {
            case "neutral": // :|
                options.avatarContainer.children[options.headIndex].addChildAt(line, 3);
                line.graphics.setStrokeStyle(1).beginStroke("black");
                line.graphics.moveTo(leftX, leftY).lineTo(leftX + 20, leftY);
                break;
            case "smirk": // :/
                g.beginStroke("black").moveTo(0, 10).quadraticCurveTo(0, 17, 13, 17).quadraticCurveTo(26, 17, 26, 17); 
                options.avatarContainer.children[options.headIndex].addChildAt(line, 3);
                options.avatarContainer.children[options.headIndex].children[3].x = leftX - 4;
                options.avatarContainer.children[options.headIndex].children[3].y = leftY - 16;
                break;
            case "smile": // :)
                g.beginStroke("black").moveTo(0, 10).quadraticCurveTo(0, 20, 13, 20).quadraticCurveTo(26, 20, 26, 10);
                options.avatarContainer.children[options.headIndex].addChildAt(line, 3);
                options.avatarContainer.children[options.headIndex].children[3].x = leftX - 4;
                options.avatarContainer.children[options.headIndex].children[3].y = leftY - 16;
                break;
            case "full-smile": // :D
                g.beginStroke("black").moveTo(0, 10).quadraticCurveTo(0, 26, 13, 26).quadraticCurveTo(26, 26, 26, 10);
                var fill = new createjs.Graphics.Fill("black");
                g.append(fill);
                options.avatarContainer.children[options.headIndex].addChildAt(line, 3);
                options.avatarContainer.children[options.headIndex].children[3].x = leftX - 4;
                options.avatarContainer.children[options.headIndex].children[3].y = leftY - 16;
                break;
            case "frown": // :(
                //g.beginStroke("black").moveTo(20, 5).quadraticCurveTo(20, 0, 10, 0).quadraticCurveTo(0, 0, 0, 5);
                g.beginStroke("black").moveTo(0, 10).quadraticCurveTo(0, 0, 13, 0).quadraticCurveTo(26, 0, 26, 10);
                options.avatarContainer.children[options.headIndex].addChildAt(line, 3);
                options.avatarContainer.children[options.headIndex].children[3].x = leftX - 4;
                options.avatarContainer.children[options.headIndex].children[3].y = leftY - 7;
                break;
            case "full-frown": // D:
                g.beginStroke("black").moveTo(0, 16).quadraticCurveTo(0, 0, 13, 0).quadraticCurveTo(26, 0, 26, 16);
                var fill = new createjs.Graphics.Fill("black");
                g.append(fill);
                options.avatarContainer.children[options.headIndex].addChildAt(line, 3);
                options.avatarContainer.children[options.headIndex].children[3].x = leftX - 4;
                options.avatarContainer.children[options.headIndex].children[3].y = leftY - 7;
                break;
            case "surprised": // :O 
                line.graphics.beginFill("black").drawCircle(5, 0, 12);
                options.avatarContainer.children[options.headIndex].addChildAt(line, 3);
                options.avatarContainer.children[options.headIndex].children[3].x = leftX + 2;
                options.avatarContainer.children[options.headIndex].children[3].y = leftY + 4;
                break;
            case "ooo": // :o
                line.graphics.beginFill("black").drawCircle(0, 0, 8);
                options.avatarContainer.children[options.headIndex].addChildAt(line, 3);
                options.avatarContainer.children[options.headIndex].children[3].x = leftX + 2;
                options.avatarContainer.children[options.headIndex].children[3].y = leftY + 4;
                break;
        }
        options.avatarContainer.children[options.headIndex].children[3].name = "mouth";
        options.stage.update();
        $.event.trigger({
            type: 'avatarChangedMouthExpression',
            expression: expression
        });
    };

    var _eyes = function (expression, options, leftX, leftY) {
        var _head = _getAvatarContainerPart("head", options);

        var _eyesNoCurve = function (startX, startY, endX, endY) {
            var g = new createjs.Graphics();
            var lines = new createjs.Shape(g);
            lines.graphics.setStrokeStyle(1).beginStroke("black");
            lines.graphics.moveTo(startX, startY).lineTo(endX, endY).lineTo(startX, startY + 5);

            return lines;
        };

        switch (expression) {
            case "bored":
                _head.children[1] = _makeEyeShapes(leftX, leftY, 10, 18);
                _head.children[2] = _makeEyeShapes(leftX + 14, leftY, 10, 18);
                break;
            case "closed":
                _head.children[1] = _makeEyeShapes(leftX, leftY, 8, 2);
                _head.children[2] = _makeEyeShapes(leftX + 14, leftY, 8, 2);
                break;
            case "excited":
                _head.children[1] = _makeEyeShapes(leftX, leftY, 10, -18);
                _head.children[2] = _makeEyeShapes(leftX + 14, leftY, 10, -18);
                break;
            case "confused":
                _head.children[1] = _makeEyeShapes(leftX, leftY, 10, 18);
                _head.children[2] = _drawEllipse(leftX + 19, leftY + 4, 10, 18);
                break;
            case "normal":
                _head.children[1] = _drawEllipse(leftX, leftY, 10, 18);
                _head.children[2] = _drawEllipse(leftX + 14, leftY, 10, 18);
                break;
            case "hard-close":
                _head.children[1] = _eyesNoCurve(leftX, leftY, 140, 125);
                _head.children[2] = _eyesNoCurve(leftX + 23, leftY, 149, 125);
                break;
        }
        options.stage.update();
        $.event.trigger({
            type: 'avatarChangedEyesExpression',
            expression: expression
        });
    };

    var _getAvatarContainerPart = function (part, options) {
        for (var ctA = 0; ctA < options.avatarContainer.children.length; ctA++) {
            if (options.avatarContainer.children[ctA].name === "head" &&
                (part === "leftEye" || part === "rightEye" || part === "hair" || part === "mouth" || part === "face")) {
                for (var ctB = 0; ctB < options.avatarContainer.children[ctA].children.length; ctB++) {
                    if (options.avatarContainer.children[ctA].children[ctB].name === part) {
                        return options.avatarContainer.children[ctA].children[ctB];
                    }
                }
            }
            else {
                if (options.avatarContainer.children[ctA].name === part) {
                    return options.avatarContainer.children[ctA];
                }
            }
        }
    };

    var _drawEllipse = function (centerX, centerY, width, height) {

        var g = new createjs.Graphics();

        g.moveTo(centerX, centerY - height / 2);
        //best explanation of beziercurveto: http://www.w3schools.com/tags/canvas_beziercurveto.asp
        g.bezierCurveTo(
            centerX + width / 2, centerY - height / 2,
            centerX + width / 2, centerY + height / 2,
            centerX, centerY + height / 2);

        g.bezierCurveTo(
          centerX - width / 2, centerY + height / 2,
          centerX - width / 2, centerY - height / 2,
          centerX, centerY - height / 2);

        var fill = new createjs.Graphics.Fill("black");

        g.append(fill);

        var shape = new createjs.Shape(g);
        shape.width = 400;
        shape.height = 800;

        return shape;
    };

    var _makeEyeShapes = function (startX, startY, width, height) {
        var g = new createjs.Graphics();

        g.moveTo(startX, startY);
        g.bezierCurveTo(
            startX, startY + height,
            startX + width, startY + height,
            startX + width, startY);

        var fill = new createjs.Graphics.Fill("black");

        g.append(fill);

        var shape = new createjs.Shape(g);
        return shape;
    };

    var _blink = function (isFlinch, options) {
        if (options.avatarContainer.children.length == 0)
            return;

        var maxEyeHeight = 18;
        var curEyeHeight = maxEyeHeight;
        var eyeOpenTime = 0;
        var timeBtwBlinks = 4000;
        var blinkUpdateTime = 200;
        var _head = _getAvatarContainerPart("head", options);
        _eyes("normal", options, 135, 125);

        var blink = function () {
            curEyeHeight -= 1;
            if (curEyeHeight <= 0) {
                eyeOpenTime = 0;
                curEyeHeight = maxEyeHeight;
            } else {
                options.tweens["eyesTimeout"] = setTimeout(blink, 10, false);
            }

            _head.children[1] = _drawEllipse(140, 125, 10, curEyeHeight); //left eye
            _head.children[2] = _drawEllipse(154, 125, 10, curEyeHeight); //right eye

            if (curEyeHeight == maxEyeHeight && options.justTheHead == true) {
                //temporarily suspend updating the stage in order to optimize page performance
                options.ticker.enableUpdate(false);
            }
        };

        var updateBlink = function () {

            eyeOpenTime += blinkUpdateTime;

            if (eyeOpenTime >= timeBtwBlinks) {

                if (options.justTheHead == true) {
                    options.ticker.enableUpdate(true);
                }

                blink();
            }
        };
        
        if (isFlinch) {
            blink();
        }
        else {

            _clearTweenArray("eyesInterval", options);
            _clearTweenArray("eyesTimeout", options);
            blink(); //start with a blink;

            options.tweens["eyesInterval"] = setInterval(updateBlink, blinkUpdateTime, false);
        }
    };

    var _breathe = function (options) {
        if (options.avatarContainer.children.length == 0)
            return;

        var _head = _getAvatarContainerPart("head", options);
        var _leftArm = _getAvatarContainerPart("leftArm", options);
        var _rightArm = _getAvatarContainerPart("rightArm", options);
        var _tween;

        _clearTweenArray("head", options);
        _clearTweenArray("leftArm", options);
        _clearTweenArray("rightArm", options);

        _tween = createjs.Tween.get(_head, { loop: true })
            .to({ y: options.y + 181 }, 1000, createjs.Ease.getPowInOut(1))
            .to({ y: options.y + 178}, 1000, createjs.Ease.getPowInOut(2));
        options.tweens["head"] = _tween;

        _tween = createjs.Tween.get(_leftArm, { loop: true })
            .to({ y: options.y + 180 }, 1000, createjs.Ease.getPowInOut(1))
            .to({ y: options.y + 177}, 1000, createjs.Ease.getPowInOut(2));
        options.tweens["leftArm"] = _tween;

        _tween = createjs.Tween.get(_rightArm, { loop: true })
            .to({ y: options.y + 180 }, 1000, createjs.Ease.getPowInOut(1))
            .to({ y: options.y + 177}, 1000, createjs.Ease.getPowInOut(2));
        options.tweens["rightArm"] = _tween;

    };

    var _changeOrientation = function (options) {
        if (options.avatarContainer.scaleX == -1) {
            options.facingRight = true;
            options.avatarContainer.regX = 0;
            options.avatarContainer.scaleX = 1;
        }
        else {
            options.facingRight = false;
            options.avatarContainer.regX = options.stageWidth;
            options.avatarContainer.scaleX = -1;
        }

        options.stage.update();

        $.event.trigger({
            type: 'avatarChangedOrientation',
            facingRight: options.facingRight
        });
    };

    var _makeBackground = function (options) {
        var g = new createjs.Graphics();
        var _line = new createjs.Shape(g);
        var fillColor = options.backgroundColor ? options.backgroundColor : "rgba(0,0,0,0)";
        _line.graphics.beginFill(fillColor).drawCircle(options.x + 105, options.y + 145, 115);
        _line.name = "background";
        return _line;
    }

    var _stopCurrentActions = function (options) {
        //This stops the breathing and eye blinking.
        for (var key in options.tweens) {
            if (key === "head" || key === "leftArm" || key === "rightArm") {
                options.tweens[key]._paused = true;
            }
            else if (key.toLowerCase().indexOf("timeout") != -1) {
                clearTimeout(options.tweens[key]);
                delete options.tweens[key];
            }
            else if (key.toLowerCase().indexOf("interval") != -1) {
                clearInterval(options.tweens[key]);
                delete options.tweens[key];
            }
        }

        $.event.trigger({
            type: 'avatarDefaultActionsToggled',
            on: false
        });
    };

    var _startCurrentActions = function(options){
        //This starts the breathing and eye blinking.
        for (var key in options.tweens) {
            options.tweens[key]._paused = false;
            //I don't think instances of intervals and timeouts can be restarted once cleared.
            //Therefore, just call the functions again if necessary (like blinking).
        }
        $.event.trigger({
            type: 'avatarDefaultActionsToggled',
            on: true
        });
    };

    var _clearTweenArray = function(whichTween, options){
        if (whichTween.toLowerCase().indexOf("interval") != -1) {
            clearInterval(options.tweens[whichTween]);
            delete options.tweens[whichTween];
        }
        else if (whichTween.toLowerCase().indexOf("timeout") != -1) {
            clearTimeout(options.tweens[whichTween]);
            delete options.tweens[whichTween];
        }
        else {
            delete options.tweens[whichTween];
        }
    }

    var _getDegreesToRotate = function (avatarX, avatarY, x2, y2) {
        avatarX = Math.floor(avatarX);
        avatarY = Math.floor(avatarY);
        //avatarY = 205;
        x2 = Math.floor(x2);
        y2 = Math.floor(y2);

        var opposite = Math.abs(y2 - avatarY);
        var adjacent = Math.abs(x2 - avatarX);
        //find the Tangent (or angle) between the two points. tan = Opposite / Adjacent
        var tangent = opposite / adjacent;
        var radians = Math.atan(tangent);
        var degrees = Math.round(radians * (180 / Math.PI));

        if (y2 < avatarY && degrees != 0)
            degrees = degrees * -1;
        //console.log("aY: " + avatarY + ", cY: " + y2 + ", deg: " + degrees);
        return degrees;
    }

    function _objectLength(object, justTheHead) {
        var length = 0;
        var fullBody = function(){
            for (var key in object) {
                if (object[key] != "" && object.hasOwnProperty(key) &&
                    (key === "head" ||
                    key === "hair" ||
                    key === "leftArm" ||
                    key === "rightArm" ||
                    key === "torso" ||
                    key === "feet" ||
                    key === "legs")) {
                    ++length;
                }
            }
        };
        var headOnly = function(){
            for (var key in object) {
                //if (object[key] != "" && (key === "head" || key === "hair" || key === "leftArm" || key === "rightArm" || key === "torso")) {
                if (object[key] != "" && (key === "head" || key === "hair")) {
                    ++length;
                }
            }
        };
        if (justTheHead == true)
            headOnly();
        else
            fullBody();
        return length;
    }

    var methods = {

        init: function (initialOptions) {
            var id = this.prop('id');
            var stage = new createjs.Stage(id);
            stage.name = id;
            createjs.Ticker.setFPS(24);
            var avatarContainer = new createjs.Container();
            var avatarOptions = $.extend({
                stage: stage,
                stageWidth: 0,
                stageHeight: 0,
                avatarContainer: avatarContainer,
                justTheHead: false,
                facingRight: false,
                shouldBlink: true,
                scale: 1,
                xPos: 0,
                yPos: 0,
                x: 0,
                y: 0,
                headIndex: 0,
                images: {},
                tweens: [],
                finishedPlaying: true,
                backgroundColor: '',
                showShadow: true,
                ticker: null
            }, initialOptions);

            $(this).attr("avatar_attached", true);

            // this will be used in 'methods' so that each avatar instance has its own settings
            this.data('options', avatarOptions);
            var options = avatarOptions;    // this.data('options'); In PA options is null after this call

            var totalResources = options.justTheHead ? _objectLength(options.bodyParts, true) : _objectLength(options.bodyParts, false);
            var numResourcesLoaded = 0;

            var canvas = document.getElementById(this.prop('id'));
            if (canvas) {
                options.stageWidth = canvas.width;
                options.stageHeight = canvas.height;
                options.x = (options.stageWidth - avatarWidth) / 2;
                options.y = (options.stageHeight - avatarHeight) / 2;

                var resourceLoaded = function () {
                    numResourcesLoaded += 1;
                    if (numResourcesLoaded === totalResources) {
                        if (options.justTheHead == false && options.showShadow == true) {
                            options.stage.addChild(_drawEllipse(options.stageWidth / 2, options.y + avatarHeight - 20, 160, 8)).name = "shadow"; //draw the shadow
                        }

                        stage.addChild(options.avatarContainer);
                        _drawBody(options);

                        //a background will always be present (transparent if no color provided)
                        options.stage.addChildAt(_makeBackground(options), 0).name = "background";

                        if (options.facingRight == false) {
                            _changeOrientation(options);
                        }

                        if (options.justTheHead == false) {
                            _breathe(options);
                        }

                        options.stage.setTransform(options.xPos, options.yPos, options.scale, options.scale);

                        if (options.shouldBlink) {
                            _blink(false, options);
                        }

                        options.ticker = new TickClass(options.stage);

                        if (options.complete)
                            options.complete.call();
                    }
                };

                var loadImage = function (name, address) {
                    options.images[name] = new Image();
                    options.images[name].onload = function () {
                        resourceLoaded();
                    }
                    options.images[name].src = address;
                };

                //stop any residual tweens or actions
                _clearTweenArray("eyesInterval", options);
                _clearTweenArray("eyesTimeout", options);
                _clearTweenArray("head", options);
                _clearTweenArray("leftArm", options);
                _clearTweenArray("rightArm", options);

                loadImage("hair", options.bodyParts.hair);
                loadImage("head", options.bodyParts.head);

                if (options.justTheHead == false) {
                    loadImage("rightArm", options.bodyParts.rightArm);
                    loadImage("torso", options.bodyParts.torso);
                    loadImage("leftArm", options.bodyParts.leftArm);
                    loadImage("legs", options.bodyParts.legs);
                    loadImage("feet", options.bodyParts.feet);
                }
            }
        },

        scale: function (percent) {
            var options = this.data('options');
            options.scale = percent;
            options.stage.setTransform(options.xPos * percent, options.yPos * percent, options.scale, options.scale);
        },

        breathe: function () {
            _breathe(this.data('options'));
        },

        blink: function (isFlinch) {
            _blink(isFlinch, this.data('options'));
        },

        wave: function (handleComplete) {
            if (!this.data('options').finishedPlaying)
                return;
            else if (this.data('options').justTheHead == true) {
                if (handleComplete)
                    handleComplete.call();
                return;
            }
            this.data('options').finishedPlaying = false;
            var options = this.data('options');

            var _leftArm = _getAvatarContainerPart("leftArm", options);
            var _head = _getAvatarContainerPart("head", options);
            var onComplete = function () {
                _startCurrentActions(options);
                _blink(false, options);
                _mouth("neutral", options, 135, 150);
                _head.rotation = 0;
                //_head.x = options.x + 100;
                options.finishedPlaying = true;
                if (handleComplete)
                    handleComplete.call();
            };

            _stopCurrentActions(options);

            _eyes("normal", options, 135, 125);
            //move the eyes to look at the user
            _eyes("normal", options, 130, 125);
            _head.rotation = -20;
            _mouth("full-smile", options, 135, 150);

            createjs.Tween.get(_leftArm, { loop: false })
                .to({ rotation: -80 }, 500, createjs.Ease.getPowInOut(1))
                .to({ rotation: -5 }, 1000, createjs.Ease.getPowInOut(2))
                .to({ rotation: -80 }, 500, createjs.Ease.getPowInOut(1))
                .to({ rotation: 0 }, 1000, createjs.Ease.getPowInOut(2)).call(onComplete);

        },

        jump: function(handleComplete){
            if (this.data('options').finishedPlaying == false)
                return;
            else if (this.data('options').justTheHead == true) {
                if (handleComplete)
                    handleComplete.call();
                return;
            }
            this.data('options').finishedPlaying = false;

            var options = this.data('options');
            var _head = _getAvatarContainerPart("head", options);
            var _rightArm = _getAvatarContainerPart("rightArm", options);
            var _leftArm = _getAvatarContainerPart("leftArm", options);
            var _torso = _getAvatarContainerPart("torso", options);
            var _legs = _getAvatarContainerPart("legs", options);
            var onComplete = function () {
                _startCurrentActions(options);
                _blink(false, options);
                _mouth("neutral", options, 134, 150);
                _head.rotation = 0;
                options.finishedPlaying = true;
                if (handleComplete)
                    handleComplete.call();
            };

            _stopCurrentActions(options);

            createjs.Tween.get(_head, { loop: false })
                .to({ y: options.y + 183, rotation: 5 }, 500, createjs.Ease.getPowInOut(1));

            createjs.Tween.get(_leftArm, { loop: false })
                .to({ y: options.y + 182, rotation: 85 }, 500, createjs.Ease.getPowInOut(1));

            createjs.Tween.get(_torso, { loop: false })
                .to({ y: options.y + 205 }, 500, createjs.Ease.getPowInOut(1));

            createjs.Tween.get(_rightArm, { loop: false })
                .to({ y: options.y + 182, rotation: 10 }, 500, createjs.Ease.getPowInOut(1)).call(
                function () {

                    setTimeout(function () {
                        _head.rotation = -5;
                        _head.y -= 3;
                        _leftArm.y -= 3;
                        _rightArm.y -= 3;
                        _legs.rotation = 10;
                        _torso.rotation = -5;
                        _torso.x += 7;
                        _torso.y -= 3;

                        createjs.Tween.get(_leftArm, { loop: false })
                            .to({ rotation: -90 }, 100, createjs.Ease.getPowInOut(1));

                        createjs.Tween.get(_rightArm, { loop: false })
                            .to({ rotation: -220 }, 100, createjs.Ease.getPowInOut(1));

                        if (options.justTheHead == false && options.showShadow == true) {
                            //make the shadow shrink and grow with the jump
                            var maxShadowWidth = 160;
                            var curShadowWidth = maxShadowWidth;
                            var times = 10;
                            var blink = function (sign, whenDone) {
                                curShadowWidth += (sign * 4);
                                if (times <= 1) {
                                    //curShadowWidth = maxShadowWidth;
                                    times = 10;
                                    if (whenDone)
                                        whenDone.call();
                                }
                                else {
                                    times = times - 1;
                                    setTimeout(function () {
                                        blink(sign, function () {
                                            if (whenDone)
                                                whenDone.call();
                                        });
                                    }, 40);
                                }

                                options.stage.children[1] = _drawEllipse(options.stageWidth / 2, options.y + avatarHeight - 20, curShadowWidth, 8);
                                options.stage.children[1].name = "shadow";
                                //console.log(curShadowWidth);
                        
                            };
                            blink(-1, function () {
                                blink(1);
                            });
                        }

                        //raise the avatar in the air
                        createjs.Tween.get(options.avatarContainer, { loop: false })
                            .to({ y: options.avatarContainer.y - 190 }, 400, createjs.Ease.getPowInOut(2))
                            .to({ y: options.avatarContainer.y }, 400, createjs.Ease.getPowInOut(1)).call(function () {

                                _legs.rotation = 0;
                                _head.rotation = 0;
                                _torso.rotation = 0;
                                _torso.x -= 7;
                                createjs.Tween.get(_leftArm, { loop: false })
                                    .to({ y: options.y + 182, rotation: 45 }, 100, createjs.Ease.getPowInOut(1))
                                    .to({ y: options.y + 177, rotation: 0 }, 100, createjs.Ease.getPowInOut(2));

                                createjs.Tween.get(_rightArm, { loop: false })
                                    .to({ y: options.y + 182, rotation: 15 }, 100, createjs.Ease.getPowInOut(1))
                                    .to({ y: options.y + 177, rotation: 0 }, 100, createjs.Ease.getPowInOut(2));

                                createjs.Tween.get(_head, { loop: false })
                                    .to({ y: options.y + 183 }, 100, createjs.Ease.getPowInOut(2))
                                    .to({ y: options.y + 178 }, 100, createjs.Ease.getPowInOut(1));

                                createjs.Tween.get(_torso, { loop: false })
                                    .to({ y: options.y + 205 }, 100, createjs.Ease.getPowInOut(2))
                                    .to({ y: options.y + 200 }, 100, createjs.Ease.getPowInOut(1)).call(onComplete);
                            });

                    }, 300);

                }
                );
        },

        confused: function(handleComplete){
            if (!this.data('options').finishedPlaying)
                return;
            else if (this.data('options').justTheHead == true) {
                if (handleComplete)
                    handleComplete.call();
                return;
            }
            this.data('options').finishedPlaying = false;
            var options = this.data('options');

            var _head = _getAvatarContainerPart("head", options);
            var _rightArm = _getAvatarContainerPart("rightArm", options);
            var onComplete = function () {
                _startCurrentActions(options);
                _blink(false, options);
                _head.rotation = 0;
                options.finishedPlaying = true;
                if (handleComplete)
                    handleComplete.call();
            };

            _stopCurrentActions(options);

            _eyes("confused", options, 135, 122);
            _head.rotation = -15;
            _mouth("neutral", options, 134, 150);

            setTimeout(function () {

                _eyes("confused", options, 125, 122);

                setTimeout(function () {

                    _eyes("confused", options, 135, 122);

                    setTimeout(function () {
                        //make the avatar blink twice quickly here
                        var maxEyeHeight = 18;
                        var curEyeHeight = maxEyeHeight;
                        var maxEyeYPosition = 121;
                        var curEyeY = maxEyeYPosition;

                        var blink = function(whenDone){
                            curEyeHeight -= 1;
                            curEyeY += .5;
                            if (curEyeHeight <= 0) {
                                curEyeHeight = maxEyeHeight;
                                curEyeY = maxEyeYPosition;
                                if(whenDone)
                                    whenDone.call();
                            }
                            else {
                                setTimeout(blink, 20);
                            }

                            _head.children[1] = _makeEyeShapes(135, curEyeY, 10, curEyeHeight);
                            _head.children[2] = _drawEllipse(154, 125, 10, curEyeHeight); //right eye
                        }

                        blink(setTimeout(blink(setTimeout(function () {

                            createjs.Tween.get(_rightArm, { loop: false })
                                .to({ rotation: -220 }, 500, createjs.Ease.getPowInOut(1))
                                .call(function () {
                                    setTimeout(function () {

                                        createjs.Tween.get(_rightArm, { loop: false })
                                        .to({ rotation: 0 }, 250, createjs.Ease.getPowInOut(1));

                                        createjs.Tween.get(_head, { loop: false })
                                        .to({ rotation: 0 }, 250, createjs.Ease.getPowInOut(1))
                                        .call(function () {
                                            setTimeout(onComplete, 500)
                                        });

                                    }, 1000)
                                });
                            }, 500)), 20));

                    }, 500);

                }, 1000);
            }, 1000);
        },

        bored: function (isActive, handleComplete) {
            if (this.data('options').justTheHead == true) {
                if (handleComplete)
                    handleComplete.call();
                return;
            }
            var options = this.data('options');
            options.finishedPlaying = false;
            var _head = _getAvatarContainerPart("head", options);
            var _rightArm = _getAvatarContainerPart("rightArm", options);
            var _leftArm = _getAvatarContainerPart("leftArm", options);
            //the y position of these parts must be reset to their default otherwise
            //any associated tweens may appear to 'skip'.
            _head.y = options.y + 178;
            _rightArm.y = options.y + 177;
            _leftArm.y = options.y + 177;

            if (!isActive) {
                options.finishedPlaying = true;
                _head.rotation = 0;
                _leftArm.rotation = 0;
                _rightArm.rotation = 0;
                _mouth("neutral", options, 134, 150);
                //this basically stops tweens for the head and arms
                _stopCurrentActions(options);
                _clearTweenArray("boredTimeout", options);
                _clearTweenArray("head", options);
                _clearTweenArray("leftArm", options);
                _clearTweenArray("rightArm", options);
                if (options.justTheHead == false)
                    _breathe(options);
                _blink(false, options);

                $.event.trigger({
                    type: 'avatarDefaultActionsToggled',
                    on: true
                });

                if (handleComplete)
                    handleComplete.call();

                return;
            }

            if (isActive) {
                _stopCurrentActions(options);

                _eyes("bored", options, 135, 122);

                _mouth("neutral", options, 134, 150);

                options.tweens["boredTimeout"] = setTimeout(function () {
                    //eyes closed
                    _eyes("closed", options, 135, 125);
                    _head.rotation = -10;
                    _mouth("surprised", options, 134, 150);

                    //yawning
                    _tween = createjs.Tween.get(_rightArm, { loop: false })
                    .to({ rotation: -172 }, 500, createjs.Ease.getPowInOut(1))
                    .to({ rotation: -167 }, 1000, createjs.Ease.getPowInOut(2))
                    .to({ rotation: -172 }, 500, createjs.Ease.getPowInOut(1))
                    .to({ rotation: 0 }, 1000, createjs.Ease.getPowInOut(2)).call(function () {

                        //half-open eyes
                        _eyes("bored", options, 135, 122);
                        _head.rotation = 0;
                        _mouth("neutral", options, 134, 150);

                        options.tweens["boredTimeout"] = setTimeout(function () {
                            //this is a weird complete call since the sleeping animation loops.
                            //But maybe someone would like to know when it gets this far...?
                            if (handleComplete)
                                handleComplete.call();

                            //eyes closed (sleeping)
                            _eyes("closed", options, 135, 125);
                            _head.rotation = 15;
                            _leftArm.rotation = 15;

                            //heavy breathing
                            if (options.justTheHead == false) {
                                _tween = createjs.Tween.get(_head, { loop: true })
                                .to({ y: options.y + 183 }, 1200, createjs.Ease.getPowInOut(1))
                                .to({ y: options.y + 178 }, 1200, createjs.Ease.getPowInOut(2));
                                options.tweens["head"] = _tween;

                                _tween = createjs.Tween.get(_leftArm, { loop: true })
                                    .to({ y: options.y + 182 }, 1200, createjs.Ease.getPowInOut(1))
                                    .to({ y: options.y + 177 }, 1200, createjs.Ease.getPowInOut(2));
                                options.tweens["leftArm"] = _tween;

                                _tween = createjs.Tween.get(_rightArm, { loop: true })
                                    .to({ y: options.y + 182 }, 1200, createjs.Ease.getPowInOut(1))
                                    .to({ y: options.y + 177 }, 1200, createjs.Ease.getPowInOut(2));
                                options.tweens["rightArm"] = _tween;
                            }
                        }, 1000);
                    });
                    options.tweens["rightArm"] = _tween;

                }, 1000);
            }
        },

        laughing: function (handleComplete) {
            if (!this.data('options').finishedPlaying)
                return;
            else if (this.data('options').justTheHead == true) {
                if (handleComplete)
                    handleComplete.call();
                return;
            }
            this.data('options').finishedPlaying = false;
            var options = this.data('options');

            var _head = _getAvatarContainerPart("head", options);
            var _rightArm = _getAvatarContainerPart("rightArm", options);
            var _leftArm = _getAvatarContainerPart("leftArm", options);
            _rightArm.y = options.y + 177;
            _leftArm.y = options.y + 177;

            var onComplete = function () {
                _startCurrentActions(options);
                _blink(false, options);
                _head.rotation = 0;
                _rightArm.rotation = 0;
                _leftArm.rotation = 0;
                options.finishedPlaying = true;
                setTimeout(function () {
                    _mouth("neutral", options, 134, 150);
                    if (handleComplete)
                        handleComplete.call();
                }, 1000);
            };

            _stopCurrentActions(options);

            _head.x = options.x + 115;
            _head.y = options.y + 185;
            _mouth("surprised", options, 134, 150);
            setTimeout(function () {
                _head.y = options.y + 178;
                _head.x = options.x + 100;
                _head.rotation = -15;
                _mouth("full-smile", options, 134, 150);
                _eyes("hard-close", options, 133, 121);

                createjs.Tween.get(_head, { loop: false })
                .to({ y: options.y + 185 }, 500, createjs.Ease.getPowInOut(1))
                .to({ y: options.y + 173 }, 200, createjs.Ease.getPowInOut(2))
                .to({ y: options.y + 185, rotation: -5 }, 500, createjs.Ease.getPowInOut(1))
                .to({ y: options.y + 173, rotation: -10 }, 200, createjs.Ease.getPowInOut(2))
                .to({ y: options.y + 185, rotation: 0 }, 500, createjs.Ease.getPowInOut(1))
                .to({ y: options.y + 178 }, 200, createjs.Ease.getPowInOut(2));

                createjs.Tween.get(_leftArm, { loop: false })
                .to({ y: options.y + 184, rotation: -45 }, 500, createjs.Ease.getPowInOut(1))
                .to({ y: options.y + 172 }, 200, createjs.Ease.getPowInOut(2))
                .to({ y: options.y + 184 }, 500, createjs.Ease.getPowInOut(1))
                .to({ y: options.y + 172 }, 200, createjs.Ease.getPowInOut(2))
                .to({ y: options.y + 184 }, 500, createjs.Ease.getPowInOut(1))
                .to({ y: options.y + 177, rotation: 0 }, 200, createjs.Ease.getPowInOut(2));

                createjs.Tween.get(_rightArm, { loop: false })
                .to({ y: options.y + 184 }, 500, createjs.Ease.getPowInOut(1))
                .to({ y: options.y + 172, rotation: -90 }, 200, createjs.Ease.getPowInOut(2))
                .to({ y: options.y + 184, rotation: -120 }, 500, createjs.Ease.getPowInOut(1))
                .to({ y: options.y + 172 }, 200, createjs.Ease.getPowInOut(2))
                .to({ y: options.y + 184, rotation: -15 }, 500, createjs.Ease.getPowInOut(1))
                .to({ y: options.y + 177, rotation: 0 }, 200, createjs.Ease.getPowInOut(2))
                .call(function () {
                    onComplete();
                });
            }, 1000);
        },

        celebrate: function (handleComplete) {
            if (!this.data('options').finishedPlaying)
                return;
            else if (this.data('options').justTheHead == true) {
                if (handleComplete)
                    handleComplete.call();
                return;
            }
            this.data('options').finishedPlaying = false;

            var options = this.data('options');
            var _head = _getAvatarContainerPart("head", options);
            var _rightArm = _getAvatarContainerPart("rightArm", options);
            var _leftArm = _getAvatarContainerPart("leftArm", options);
            var _torso = _getAvatarContainerPart("torso", options);

            var onComplete = function () {
                //_startCurrentActions(options);
                _blink(false, options);
                _mouth("neutral", options, 134, 150);
                _head.rotation = 0;
                _rightArm.rotation = 0;
                _leftArm.rotation = 0;

                _clearTweenArray("head", options);
                _clearTweenArray("leftArm", options);
                _clearTweenArray("rightArm", options);
                //restart the default tweens instead of using _startCurrentActions since that would just resume
                //and this method has already assigned its own y values to the head and arms (resuming causes a skip).
                if (options.justTheHead == false)
                    _breathe(options);
                _blink(false, options);

                $.event.trigger({
                    type: 'avatarDefaultActionsToggled',
                    on: true
                });

                options.finishedPlaying = true;
                if (handleComplete)
                    handleComplete.call();
            };

            var makeExcitedEyes = function (startX, startY, width, height) {
                var g = new createjs.Graphics();

                g.moveTo(startX, startY);
                g.bezierCurveTo(
                    startX, startY - height,
                    startX + width, startY - height,
                    startX + width, startY);

                var fill = new createjs.Graphics.Fill("black");

                g.append(fill);

                var shape = new createjs.Shape(g);
                return shape;
            };

            var closeEyes = function (startX, startY, endX, endY) {
                var g = new createjs.Graphics();
                var lines = new createjs.Shape(g);
                lines.graphics.setStrokeStyle(1).beginStroke("black");
                lines.graphics.moveTo(startX, startY).lineTo(endX, endY).lineTo(startX, startY + 5);

                return lines;
            };

            _stopCurrentActions(options);
            //178 is default
            _head.y = options.y + 183;
            _rightArm.y = options.y + 177;
            _leftArm.y = options.y + 177;

            _eyes("excited", options, 137, 127);
            _mouth("full-smile", options, 134, 150);

            setTimeout(function () {
                _head.x = options.x + 100;
                _mouth("smile", options, 134, 150);
                _eyes("hard-close", options, 133, 121);

                createjs.Tween.get(_torso, { loop: false })
                .to({ rotation: -10}, 700, createjs.Ease.getPowInOut(4));

                createjs.Tween.get(_head, { loop: false })
                .to({ rotation: -15, x: options.x + 95 }, 500, createjs.Ease.getPowInOut(1));

                createjs.Tween.get(_leftArm, { loop: false })
                .to({ rotation: -120,  y: options.y + 182, x: options.x + 116 }, 500, createjs.Ease.getPowInOut(1));

                createjs.Tween.get(_rightArm, { loop: false })
                .to({ rotation: -220,  y: options.y + 187, x: options.x + 100 }, 500, createjs.Ease.getPowInOut(1)).call(function () {

                    setTimeout(function () {
                        createjs.Tween.get(_head, { loop: false })
                        .to({ rotation: -5 }, 200, createjs.Ease.getPowInOut(1))
                        .to({ rotation: -15 }, 500, createjs.Ease.getPowInOut(2))
                        .to({ rotation: -5 }, 200, createjs.Ease.getPowInOut(1))
                        .to({ rotation: -15 }, 500, createjs.Ease.getPowInOut(2))
                        .call(function () {

                            setTimeout(function () {
                                _mouth("full-smile", options, 134, 150);
                                _eyes("excited", options, 137, 127);

                                createjs.Tween.get(_torso, { loop: false })
                                .to({ rotation: 0}, 500, createjs.Ease.getPowInOut(1));

                                createjs.Tween.get(_head, { loop: false })
                                .to({ rotation: 0, y: options.y + 178, x: options.x + 100 }, 500, createjs.Ease.getPowInOut(2))

                                createjs.Tween.get(_leftArm, { loop: false })
                                .to({ rotation: 0, y: options.y + 177, x: options.x + 121 }, 500, createjs.Ease.getPowInOut(2));

                                createjs.Tween.get(_rightArm, { loop: false })
                                .to({ rotation: 0, y: options.y + 177, x: options.x + 103 }, 500, createjs.Ease.getPowInOut(2))
                                .call(function () {
                                    setTimeout(onComplete, 500)
                                });
                            }, 500);
                        });
                    }, 700);
                });
            }, 1000);
        },

        mouth: function (expression) {
            _mouth(expression, this.data('options'), 134, 150);
        },

        eyes: function (eyes) {
            switch(eyes){
                case "excited":
                    _eyes(eyes, this.data('options'), 137, 127);
                    break;
                case "confused":
                    _eyes(eyes, this.data('options'), 135, 122);
                    break;
                case "hard-close":
                    _eyes(eyes, this.data('options'), 133, 121);
                    break;
                default:
                    _eyes(eyes, this.data('options'), 140, 125);
                    break;
            }
            
        },

        disableActions: function () {
            var options = this.data('options');
            //temporarily suspend updating the stage in order to optimize page performance
            options.ticker.enableUpdate(false);
            _stopCurrentActions(options);
        },

        enableActions: function () {
            var options = this.data('options');
            options.ticker.enableUpdate(true);
            //if (options.justTheHead == false)
            _startCurrentActions(options);
            _blink(false, options);
        },

        changeOrientation: function () {
            _changeOrientation(this.data('options'));
        },

        insertNewParts: function (newBodyParts, handleComplete) {
            var ct = 0;
            var total = Object.keys(newBodyParts).length;
            var options = this.data('options');
            var partExchanger = function (partName, address) {
                partName = partName === "head" ? "face" : partName;
                var thePart = _getAvatarContainerPart(partName, options);
                partName = partName === "face" ? "head" : partName;
                if (thePart) {
                    thePart.image = options.images[partName];
                }
            };

            var loadImage = function (name, address) {
                options.images[name] = new Image();
                options.images[name].onload = function () {
                    partExchanger(name, address);
                    ct++;
                    if (ct == total && handleComplete){
                        handleComplete.call();
                    }
                }

                if (address != "") {
                    options.images[name].src = address;
                }
            };

            for (var key in newBodyParts) {

                switch (key) {
                    case "hair":
                        //an avatar can be bald, this is a special case
                        if (newBodyParts.hair == "") {
                            total--;
                            options.images["hair"].src = "";
                            partExchanger("hair", "");
                        }
                        else {
                            loadImage("hair", newBodyParts.hair);
                        }
                        break;
                    case "head":
                        loadImage("head", newBodyParts.head);
                        break;
                    case "rightArm":
                        loadImage("rightArm", newBodyParts.rightArm);
                        break;
                    case "torso":
                        loadImage("torso", newBodyParts.torso);
                        break;
                    case "legs":
                        loadImage("legs", newBodyParts.legs);
                        break;
                    case "leftArm":
                        loadImage("leftArm", newBodyParts.leftArm);
                        break;
                    case "feet":
                        loadImage("feet", newBodyParts.feet);
                        break;
                }
            }

        },
        rotateHeadToDegrees: function (degrees) {
            var options = this.data('options');
            //get the avatar head's current x and y position in relation to the rest of the page (not just the canvas).
            var _head = _getAvatarContainerPart("head", options);
            //avoid bending the avatar's neck too much
            if (Math.abs(degrees) < 45)
                _head.rotation = degrees;
        },
        headLookAtPoint: function (isActive, xPos, yPos, handleComplete) {
            var options = this.data('options');
            //get the avatar head's current x and y position in relation to the rest of the page (not just the canvas).
            var _head = _getAvatarContainerPart("head", options);
            var canvasX = $('#' + this.prop('id')).offset().left;
            var canvasY = $('#' + this.prop('id')).offset().top;
            //var aX = 95;
            //var aY = 514;
            var aX = ((options.x + options.xPos) * options.scale) + canvasX;
            var aY = ((options.y + 122 + options.yPos) * options.scale) + canvasY; //122 is about the length from the top of the head container to the middle of the eyes
            //console.log(aY);
            //get the avatar's current orientation
            var facingRight = options.facingRight;
            var checkOrientation = function (x1, x2) {
                //change the avatar's orientation if necessary
                if (!facingRight && x2 > x1 || facingRight && x2 < x1) {
                    _changeOrientation(options);
                    facingRight = options.facingRight;
                }
            };
            //complete call back
            var onComplete = function () {
                options.finishedPlaying = true;
                if (handleComplete)
                    handleComplete.call();
            };

            if (isActive == true) {
                
                var degrees = _getDegreesToRotate(aX, aY, xPos, yPos);
                checkOrientation(aX, xPos);

                //avoid bending the avatar's neck too much
                if (Math.abs(degrees) < 45)
                    _head.rotation = degrees;
            }
            else {
                //make the avatar's head return to it's default position
                options.finishedPlaying = false;
                $(document).off("mousemove");
                createjs.Tween.get(_head, { loop: false })
                .to({ rotation: 0 }, 500, createjs.Ease.getPowInOut(1)).call(onComplete);

                //_tickEvent();
            }
        },

        headFollowCursor: function (isActive, handleComplete) {
            var options = this.data('options');
            //get the avatar head's current x and y position in relation to the rest of the page (not just the canvas).
            var _head = _getAvatarContainerPart("head", options);
            var canvasX = $('#' + this.prop('id')).offset().left;
            var canvasY = $('#' + this.prop('id')).offset().top;
            var aX = (_head.x * options.scale) + options.xPos + canvasX;
            var aY = ((options.y + 122) * options.scale) + options.yPos + canvasY; //122 is about the length from the top of the head container to the middle of the eyes
            //console.log(aY);
            //get the avatar's current orientation
            var facingRight = options.facingRight;
            var checkOrientation = function (x1, x2) {
                //change the avatar's orientation if necessary
                if (!facingRight && x2 > x1 || facingRight && x2 < x1) {
                    _changeOrientation(options);
                    facingRight = options.facingRight;
                }
            };
            //complete call back
            var onComplete = function () {
                options.finishedPlaying = true;
                if (handleComplete)
                    handleComplete.call();
            };

            if (isActive == true) {
                
                //make the avatar's head follow the cursor
                $(document).mousemove(function (e) {
                    var degrees = _getDegreesToRotate(aX, aY, e.clientX, e.clientY);
                    checkOrientation(aX, e.clientX);

                    //avoid bending the avatar's neck too much
                    if(Math.abs(degrees) < 45)
                        _head.rotation = degrees;
                });
            }
            else {
                //make the avatar's head return to it's default position
                options.finishedPlaying = false;
                $(document).off("mousemove");
                createjs.Tween.get(_head, { loop: false })
                .to({ rotation: 0 }, 500, createjs.Ease.getPowInOut(1)).call(onComplete);

                //_tickEvent();
            }
        },

        headFollowElement: function (isActive, handleComplete) {
            var options = this.data('options');
            //get the avatar head's current x and y position in relation to the rest of the page (not just the canvas).
            var _head = _getAvatarContainerPart("head", options);
            var canvasX = $('#' + this.prop('id')).offset().left;
            var canvasY = $('#' + this.prop('id')).offset().top;
            var aX = (_head.x * options.scale) + canvasX;
            var aY = ((options.y + 122) * options.scale) + canvasY;
            //get the avatar's current orientation
            var facingRight = options.facingRight;
            var checkOrientation = function (x1, x2) {
                //change the avatar's orientation if necessary
                if (!facingRight && x2 > x1 || facingRight && x2 < x1) {
                    _changeOrientation(options);
                    facingRight = options.facingRight;
                }
            };
            //complete call back
            var onComplete = function () {
                if (handleComplete)
                    handleComplete.call();
            };
            //use a tween to rotate the avatar's head
            var rotateTween = function (deg, doneRotating) {
                if (deg < -45)
                    deg = -45;
                else if (deg > 45)
                    deg = 45;

                var _tween = createjs.Tween.get(_head, { loop: false })
                .to({ rotation: deg }, 500, createjs.Ease.getPowInOut(1)).call(function () {
                    if (doneRotating) {
                        doneRotating.call();
                        options.finishedPlaying = true;
                    }
                });
                options.tweens["rotate"] = _tween;
            };


            if (isActive == true) {

                $(document).mousedown(function (event) {
                    //highlighting and dragging text or images causes errors - prevent default here.
                    event.preventDefault();

                    $(document).mousemove(function (e) {
                        var degrees = _getDegreesToRotate(aX, aY, e.clientX, e.clientY);

                        //avoid bending the avatar's neck too much
                        if (degrees < -45)
                            degrees = -45;
                        else if (degrees > 45)
                            degrees = 45;

                        checkOrientation(aX, e.clientX);

                        //setTimeout helps to avoid rapid-fire clicking bug and it makes the avatar look more natural anyways.
                        setTimeout(function () {
                            _head.rotation = degrees;
                        }, 300);
                    });
                });

                $(document).off("mouseRelease");

                $(document).mouseup(function (e) {
                    $.event.trigger({
                        type: 'mouseRelease',
                        x: e.clientX,
                        y: e.clientY
                    });
                });

                //had to use 'mouseRelease' here because turning off $(document).mouseup disabled Jquery UI's Draggable 
                $(document).on('mouseRelease', function (event) {
                    $(document).off("mousemove");

                    if (options.finishedPlaying == false) {
                        //stop the current tween
                        options.tweens["rotate"]._paused = true;
                        //clear the current tween
                        _clearTweenArray("rotate", options);
                    }
                    options.finishedPlaying = false;

                    var degrees = _getDegreesToRotate(aX, aY, event.x, event.y);

                    //change the avatar's orientation if necessary
                    checkOrientation(aX, event.x);

                    rotateTween(degrees, function () { });
                });

            }
            else {
                if (options.finishedPlaying == false) {
                    //stop the current tween
                    options.tweens["rotate"]._paused = true;
                    //clear the current tween
                    _clearTweenArray("rotate", options);
                }
                options.finishedPlaying = false;
                $(document).off("mousedown");
                $(document).off("mouseRelease");
                $(document).off("mousemove");
                
                //make the avatar's head return to it's default position
                rotateTween(0, function () {
                    onComplete.call();
                });
            }
        },
        destroy: function () {
            var options = this.data('options');
            _stopCurrentActions(options);
            options.ticker.destroy();

            var ct = options.avatarContainer.children.length;
            while (ct--) {
                options.stage.removeChild(options.avatarContainer.children[ct]);
            }

            $(this).attr("avatar_attached", false);
        }
    };

    $.fn.avatar = function (methodOrOptions) {
        if (methods[methodOrOptions]) {
            return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            // Default to "init"
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist on jQuery.avatar');
        }
    };



}(jQuery));






