/**
 *  2019Oct03 QUick + Dirty way of getting animation json into my designer prototype
 * @returns {{author: {organization: string, name: string, email: string, username: string}, objects: *[]}}
 * 2019Nov05 Making Animation Structure more Sophisticated, tracking change and source.
 */
export default function collisionElastic3() {
    return {
        "author": {
            "email": "winters@ncssm.edu",
            "name": "Loren Winters",
            "organization": "NCSSM",
            "username": "winters1999"
        },
        "objects": [{
            "start": 0,
            "stop": 15,
            "change": 0.0999,
            "fps": 20,
            "objectType": "time"
        }, {
            "xmin": 0,
            "xmax": 15,
            "ymin": -5,
            "ymax": 5,
            "xgrid": 1,
            "ygrid": 1,
            "objectType": "graphWindow"
        }, {
            "xmin": -10,
            "xmax": 10,
            "ymin": -10,
            "ymax": 10,
            "xgrid": 1,
            "ygrid": 10,
            "xunit": "meters",
            "yunit": "meters",
            "objectType": "window"
        }, {
            "text": "Two gliders collide in an elastic collision. The x-coordinate of the center of mass of the system of gliders is shown as a black dot.  Play the animation.  Click Show Graph.  The velocities of the two objects and of the center of mass will be displayed as a function of time.  Try collisions for different values of mass and initial velocity.  After a while, you should be able to predict the final velocities, given any pair of initial velocities.",
            "objectType": "description"
        }, {
            "name": "mp",
            "text": "Mass of Red",
            "initialValue": 2,
            "units": "kg",
            "hidden": false,
            "objectType": "input"
        }, {
            "name": "mq",
            "text": "Mass of Blue",
            "initialValue": 1,
            "units": "kg",
            "hidden": false,
            "objectType": "input"
        }, {
            "name": "xp",
            "text": "Initial Position of Red",
            "initialValue": 0,
            "units": "m",
            "hidden": true,
            "objectType": "input"
        }, {
            "name": "xq",
            "text": "Initial Position of Blue",
            "initialValue": -4,
            "units": "m",
            "hidden": true,
            "objectType": "input"
        }, {
            "name": "vp",
            "text": "Initial velocity of Red",
            "initialValue": 1.5,
            "units": "m/s",
            "hidden": false,
            "objectType": "input"
        }, {
            "name": "vq",
            "text": "Initial velocity of Blue",
            "initialValue": 3,
            "units": "m/s",
            "hidden": false,
            "objectType": "input"
        }, {
            "name": "red",
            "shape": {
                "shapeType": "rectangle",
                "vectors": {
                    "xVel": false,
                    "yVel": false,
                    "xAccel": false,
                    "yAccel": false,
                    "Vel": false,
                    "Accel": false
                },
                "width": {
                    "calculator": {
                        "calcType": "parametric",
                        "value": "dp"
                    }
                },
                "height": {
                    "calculator": {
                        "calcType": "parametric",
                        "value": "dp"
                    }
                },
                "graphOptions": {
                    "graphVisible": true,
                    "initiallyOn": {
                        "xPos": false,
                        "xVel": true,
                        "xAccel": false,
                        "yPos": false,
                        "yVel": false,
                        "yAccel": false
                    }
                },
                "isGraphable": true,
                "drawTrails": false,
                "drawVectors": false
            },
            "color": {
                "red": 255,
                "green": 51,
                "blue": 51
            },
            "xpath": {
                "calculator": {
                    "calcType": "parametric",
                    "value": "(xp+vp*t)*step(to-t)+(xp+vp*to-vpf*to+vpf*t)*step(t-to)"
                }
            },
            "ypath": {
                "calculator": {
                    "calcType": "parametric",
                    "value": "dp/2"
                }
            },
            "objectType": "solid"
        }, {
            "name": "blue",
            "shape": {
                "shapeType": "rectangle",
                "vectors": {
                    "xVel": false,
                    "yVel": false,
                    "xAccel": false,
                    "yAccel": false,
                    "Vel": false,
                    "Accel": false
                },
                "width": {
                    "calculator": {
                        "calcType": "parametric",
                        "value": "dq"
                    }
                },
                "height": {
                    "calculator": {
                        "calcType": "parametric",
                        "value": "dq"
                    }
                },
                "graphOptions": {
                    "graphVisible": true,
                    "initiallyOn": {
                        "xPos": false,
                        "xVel": true,
                        "xAccel": false,
                        "yPos": false,
                        "yVel": false,
                        "yAccel": false
                    }
                },
                "isGraphable": true,
                "drawTrails": false,
                "drawVectors": false
            },
            "color": {
                "red": 51,
                "green": 51,
                "blue": 255
            },
            "xpath": {
                "calculator": {
                    "calcType": "parametric",
                    "value": "(xq+vq*t)*step(to-t)+(xq+vq*to-vqf*to+vqf*t)*step(t-to)"
                }
            },
            "ypath": {
                "calculator": {
                    "calcType": "parametric",
                    "value": "dq/2"
                }
            },
            "objectType": "solid"
        }, {
            "name": "cm",
            "shape": {
                "shapeType": "circle",
                "vectors": {
                    "xVel": false,
                    "yVel": false,
                    "xAccel": false,
                    "yAccel": false,
                    "Vel": false,
                    "Accel": false
                },
                "width": {
                    "calculator": {
                        "calcType": "parametric",
                        "value": ".2"
                    }
                },
                "height": {
                    "calculator": {
                        "calcType": "parametric",
                        "value": ".2"
                    }
                },
                "graphOptions": {
                    "graphVisible": true,
                    "initiallyOn": {
                        "xPos": false,
                        "xVel": true,
                        "xAccel": false,
                        "yPos": false,
                        "yVel": false,
                        "yAccel": false
                    }
                },
                "isGraphable": true,
                "drawTrails": false,
                "drawVectors": false
            },
            "color": {
                "red": 51,
                "green": 51,
                "blue": 51
            },
            "xpath": {
                "calculator": {
                    "calcType": "parametric",
                    "value": "vcm*t+xcmo"
                }
            },
            "ypath": {
                "calculator": {
                    "calcType": "parametric",
                    "value": ".5"
                }
            },
            "objectType": "solid"
        }, {
            "name": "dq",
            "text": "Side of Blue",
            "units": "m",
            "calculator": {
                "calcType": "parametric",
                "value": "(mq)^0.5"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "dp",
            "text": "Side of Red",
            "units": "m",
            "calculator": {
                "calcType": "parametric",
                "value": "(mp)^0.5"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "xcmo",
            "text": "Xcm initial",
            "units": "m",
            "calculator": {
                "calcType": "parametric",
                "value": "(mp*xp+mq*xq)/(mp+mq)"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "so",
            "text": "Initial Separation",
            "units": "m",
            "calculator": {
                "calcType": "parametric",
                "value": "abs(xp-xq)+(-1/2)*(dp+dq)"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "s",
            "text": "Separation",
            "units": "m",
            "calculator": {
                "calcType": "parametric",
                "value": "red.xpos-blue.xpos+(-1/2)*(dp+dq)"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "vr",
            "text": "Relative velocity",
            "units": "m/s",
            "calculator": {
                "calcType": "parametric",
                "value": "vq-vp"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "to",
            "text": "Initial time to collision",
            "units": "s",
            "calculator": {
                "calcType": "parametric",
                "value": "abs(so/vr)"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "tc",
            "text": "Time to collision",
            "units": "s",
            "calculator": {
                "calcType": "parametric",
                "value": "s/vr"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "vpf",
            "text": "Final velocity of Red",
            "units": "m/s",
            "calculator": {
                "calcType": "parametric",
                "value": "((mp-mq)*vp+2*mq*vq)/(mp+mq)"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "vqf",
            "text": "Final velocity of Blue",
            "units": "m/s",
            "calculator": {
                "calcType": "parametric",
                "value": "(2*mp*vp+(mq-mp)*vq)/(mp+mq)"
            },
            "hidden": true,
            "objectType": "output"
        }, {
            "name": "vcm",
            "text": "CM velocity",
            "units": "m/s",
            "calculator": {
                "calcType": "parametric",
                "value": "(mp*red.xvel+mq*blue.xvel)/(mp+mq)"
            },
            "hidden": false,
            "objectType": "output"
        }, {
            "name": "xcm",
            "text": "X-cm",
            "units": "m",
            "calculator": {
                "calcType": "parametric",
                "value": "cm.xpos"
            },
            "hidden": false,
            "objectType": "output"
        }]

    };
}
