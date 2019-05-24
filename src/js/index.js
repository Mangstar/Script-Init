const init = new scriptInit();
const elem = document.querySelector('.scrollTo');

init
    .addAction(() => {
        
    }, {
        initTime: 'now'
    })
    .addAction(() => {
        new Glide('.glide').mount()
    }, {
        initTime: 'scroll',
        scrollElement: elem,
        scrollDelayTime: 300,
        stock: 1500
    })
    .addAction(_console, { initTime: 'now' }, 5);

function _console(n){
    
}