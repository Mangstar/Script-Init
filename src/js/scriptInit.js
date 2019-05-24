const scriptInit = (function(){

    /** 
        Создается новый экземпляр класса ScriptInit. У него есть 1 метод addAction, принимающий три параметра: коллбэк, объект с настройками и 
            аргументы для коллбэка. Задача класса - запускать скрипты в трех режимах: сразу же при парсинге JS, через setTimeout, либо же при прокрутке страницы
            до указанного элемента
        1) Запуск сразу же (по умолчанию). Требуются следующие параметры:
            @param {String} initTime: 'now'
        2) Запуск через заданное время. Требуются следующие параметры:
            @param {String} initTime: 'setTimeout'
            @param {Number} timeoutMSec - через сколько запустить функцию в миллисекундах (начальное значение 1000 мс)
        3) Запуск после прокрутки страницы на определенное число пикселей. Требуются следующие параметры:
            @param {String} initTime: 'scroll'
            @param {String|Element} scrollElement - выполнить функцию при прокрутке до этого элемента. Может быть либо строкой, которая будет передана в document.querySelector,
            либо ссылкой на DOM-элемент
            @param {Number} stock - какой запас прокрутки в пикселях до указанного scrollElement. Если значение 1000, то функция выполнится, когда прокрутка
            будет window.pageYOffset + 1000 >= scrollElement.offsetTop + timeoutMSec
            @param {Number} scrollDelayTime - ограничение на скролл страницы, через сколько мс выполнять проверку после очередной прокрутки 
        
        @return {Class}
        */

    class ScriptInit {
        /**
         * 
         * @param {Function} callback
         * @param {Object} settings
         * @param {...any} args
         */
        addAction(callback, settings, ...args){
            let {
                initTime = 'now',
                scrollElement = null,
                scrollDelayTime = 300,
                timeoutMSec = 1000,
                stock = 1500
            } = settings,
            scrollToElem,
            timer,
            handler;

            switch(initTime){
                case 'now':
                    callback(args);

                    break;
                case 'scroll':
                    // Определяем тип переданного элемента, до которого надо докрутить. Он может быть либо строкой,
                    // тогда передаем ее в document.querySelector, либо быть DOM элементом. Тогда просто указываем ссылку на этот DOM элемент
                    try {
                        if ( initTime === 'scroll' && scrollElement === null || scrollElement === undefined ) {

                            throw new Error(`Параметр "scrollElement" является обязательным`);

                        } else if( typeof scrollElement === 'string' ){

                            scrollToElem = document.querySelector(scrollElement).offsetTop;

                        } else if ( scrollElement instanceof HTMLElement ) {

                            scrollToElem = scrollElement.offsetTop;

                        } else {

                            throw new Error(`Параметр "scrollElement" имеет недопустимое значение`);

                        }
                    } catch(e){
                        console.error(e.message);
                    };

                    handler = () => {
                        
                        if ( timer !== undefined ) {
                            clearTimeout(timer);
                        }

                        timer = window.setTimeout(() => {

                            if ( window.pageYOffset + stock >= scrollToElem ) {
                                callback(args);

                                window.removeEventListener('scroll', handler);
                            }

                        }, scrollDelayTime);

                    };

                    window.addEventListener('scroll', handler);

                    break;
                case 'setTimeout':
                    window.setTimeout(() => {
                        callback(args);
                    }, timeoutMSec);

                    break;
                default:
                    callback(args);
            }

            return this;
        }
    }

    return ScriptInit;

}());