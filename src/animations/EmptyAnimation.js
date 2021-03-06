/**
 * 2019Nov06 Empty Animation Initialziation
 */
export default function emptyAnimation() {
    return {
        "author": {
            "email": "",
            "name": "",
            "organization": "",
            "username": "anonymous"
        },
        "objects": [{
            "start": 0,
            "stop": 100,
            "change": 0.1,
            "fps": 20,
            "objectType": "time"
        }, {
            "xmin": 0,
            "xmax": 10,
            "ymin": -5,
            "ymax": 5,
            "xgrid": 2,
            "ygrid": 2,
            "objectType": "graphWindow"
        }, {
            "xmin": -10,
            "xmax": 10,
            "ymin": -10,
            "ymax": 10,
            "xgrid": 2,
            "ygrid": 2,
            "xunit": "meters",
            "yunit": "meters",
            "objectType": "window"
        }, {
            "text": "Default Description\nDescribe your scenario, instructions, or what your visitors should learn from this animation.",
            "objectType": "description"
        }]

    };
}
