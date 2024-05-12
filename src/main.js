
addEventListener('load', () => {
    const MAP = document.querySelector('.map');
    const MAPS = document.querySelector('.maps');
    const MAPS_WRAPPER = document.querySelector('.maps-wrapper');
    const MAP_RATIO = (MAPS_WRAPPER.clientHeight - 10) / MAPS_WRAPPER.clientWidth;

    let scale = 1;
    let normal_width;

    let pov = [window.innerWidth / 2, window.innerHeight / 2];

    let min_current_x, max_current_x,
        min_current_y, max_current_y;

    addEventListener('wheel', evt => {
        console.log(evt);
        let old_scale = scale;
        scale -= evt.deltaY / 100;
        if (scale < 1) {
            scale = 1;
        }

        let pointer = [evt.clientX, evt.clientY];

        pov[0] = pointer[0] + (pov[0] - pointer[0]) * (scale / old_scale);
        pov[1] = pointer[1] + (pov[1] - pointer[1]) * (scale / old_scale);
    });

    let starting_point = [0, 0];
    let moving = false;

    window.addEventListener('mousedown', evt => {
        console.log(evt);
        starting_point = [evt.clientX, evt.clientY];
        moving = true;
    });

    window.addEventListener('mousemove', evt => {
        console.log(evt);
        if (moving) {
            pov = [pov[0] - (starting_point[0] - evt.clientX), pov[1] - (starting_point[1] - evt.clientY)]
            starting_point = [evt.clientX, evt.clientY];
        }
    });

    window.addEventListener('mouseup', evt => {
        console.log(evt);
        moving = false;
    });

    window.addEventListener('touchstart', evt => {
        console.log(evt);
        starting_point = [evt.changedTouches[0].screenX, evt.changedTouches[0].screenY];
        moving = true;
    });

    window.addEventListener('touchmove', evt => {
        console.log(evt);

        let last_touch = evt.changedTouches[evt.changedTouches.length - 1];
        if (moving) {
            pov = [pov[0] - (starting_point[0] - last_touch.screenX), pov[1] - (starting_point[1] - last_touch.screenY)]
            starting_point = [last_touch.screenX, last_touch.screenY];
        }
    });

    let loop = () => {
        normal_width = MAP_RATIO > window.innerHeight / window.innerWidth ? window.innerWidth : window.innerHeight / MAP_RATIO;

        MAPS.style.width = normal_width * scale + 'px';
        MAPS.style.top = pov[1] + 'px';
        MAPS.style.left = pov[0] + 'px';

        requestAnimationFrame(loop);
    };

    loop();
});
