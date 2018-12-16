window.onload = function() {
    const SPRITE_SELECTOR = '.sprite'
    function init(){
        const sprites = document.querySelectorAll(SPRITE_SELECTOR);
        for(const sprite of sprites) {
            const image = getAttr(sprite,'image');
            const width = getAttr(sprite, 'width', true);
            const height = getAttr(sprite, 'height', true);
            const columns = getAttr(sprite, 'columns', true);
            const rows = getAttr(sprite, 'rows', true);
            const max = getAttr(sprite, 'max', true);
            const loop = getAttr(sprite, 'loop', true);
            const frame = getAttr(sprite, 'frame', true);
            Object.assign(sprite.style, {
                width: width + 'px',
                height: height + 'px',
                backgroundImage: `url(${image})`,
                backgroundSize: `${width * columns}px ${height * rows}px`,
                backgroundPosition: '0 0'
            });
            let playing = false;
            const _play = function(){
                play({sprite, width, height, columns, rows, max, loop, frame, done: function(){
                        playing = false;
                    }
                });
                playing = true;
            }
            sprite.onmouseover = function(){
                if(playing === false) {
                    _play();                    
                }
            }
        }
    }
    function play({sprite, width, height, columns, rows, max, loop, frame, done}){
        const aSecond = 1000;
        const timePerSecond = aSecond / frame;
        let spriteInfo      = { x: 0, y: 0, loop: 0};
        let i = 0;
        const playTimer  = setInterval(()=>{
            i++;

            Object.assign(sprite.style, {
                backgroundPosition: `${spriteInfo.x}px ${spriteInfo.y}px`
            })
            if(i % columns == 0) {
                spriteInfo.x = 0;
                spriteInfo.y -= height;
            } else {
                spriteInfo.x -= width;
            } 
            if(i >= max) {
                spriteInfo.x = 0;
                spriteInfo.y = 0;
                i = 0;
                spriteInfo.loop++;
                if(spriteInfo.loop > loop ) {
                    clearInterval(playTimer);
                    if(typeof done ===  'function') {
                        done();
                    }
                }

            }
            
        },timePerSecond)
    }
    function getAttr(element, attrName, toNumber = false) {
        if(toNumber === true) {
            return parseInt(element.getAttribute(attrName));
        }
        return element.getAttribute(attrName);
    }
    init();
}
