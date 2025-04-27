'use strict';

export default class GoblinGame {
    constructor(element) {
        if(typeof element === 'string') {
          element = document.querySelector(element);
        }
        // Присваиваем поданный на вход конструктора элемент  вёрстки
        // в переменную this._element
        this._element = element;
        this.createGame = this.createGame.bind(this);
       
    }

    // Заставка окончания игры 
     gameOver(){
        const gameOver = document.createElement('div');
        gameOver.className = 'game-over';
        gameOver.innerHTML = `<strong>GAME OVER</strong>`
        this._element.append(gameOver);;
        const gameOverElement = document.querySelector('div.game-over');
          setTimeout( ()=> {
            gameOverElement.remove();
        },1500);

    }



    createGame(){
        console.log(`Игра запущена на элементе  `, this._element);

        // создаём поле игры
        let holeGame = document.createElement('div')
        holeGame.className= "hole-game";
        this._element.append(holeGame);

        // создаём лунки:
        for (let i=0; i<16; i++){
            let hole = document.createElement('div');
            hole.className = "hole";
            holeGame.append(hole);
        };

        // Добавляем кнопку останова игры
        const btnStop = document.createElement('button');
        btnStop.className = 'btn-stop';
        btnStop.textContent = "Стоп-игра";
        holeGame.append(btnStop);

                           
        //    Создаём гоблина
    
        let holes = document.querySelectorAll("div.hole");
        // console.log(holes);

        // Располагаем гоблина в одной из 16 лунок рандомно
        holes[Math.floor(Math.random() * 16)].classList.add('hole_has-goblin');
      
        // Запускаем гоблина 
        // Поиск индекса элемента , отображающего картинку
        function getIndex() {
            for (let i = 0; i < 16; i++){
                if (holes[i].classList.contains( 'hole_has-goblin' )){
                    return i               
                }        
            }      
        }
    
        
        // Удаляем картинку из лунки:

        const deleteGoblin = () => holes[getIndex()].className = 'hole';
   
        // Задаём индекс элемента для следующего показа картинки .
        // Он не должен совпадать с предыдущим
        function nextIndex() {
            let previousIndex = getIndex();
            let index = Math.floor( Math.random() * 16 );
            // До тех пор , пока оба индекса совпадают, 
            // меняем значение индекса следующей лунки
            while(previousIndex == index) {
                index = Math.floor( Math.random() * 16 );
            };
            return index       
        }
    

    
    
        // Добавляем картинку в лунку 
        const addGoblin = () =>{
            holes[nextIndex()].classList.add("hole_has-goblin");
        } 
               
        //  Меняем разположение картинки каждую 1 секунду
        setInterval ( ()=> {
            deleteGoblin();
            addGoblin();       
        },1000 )
      

        // Создаем счётчик кликов по лунке click-holes

        const clickHoles = document.createElement('div');
        clickHoles.className = 'conter-holes';

        clickHoles.innerHTML =`  <div class="status">
        ПОПАЛ: <span class="caught">0</span><br>
        ПРОМАЗАЛ: <span class="miss">0</span><br>
        Количество кликов по лункам:<span class="count-click">0</span><br>
        </div>`

        holeGame.append(clickHoles);
        

        // Находим нужные счётчики
       
        let caught = document.querySelector('span.caught');
        let miss = document.querySelector('span.miss');
        let countClick = document.querySelector('span.count-click');
       
        // Увеличение счётчика по клику по лунке
        holeGame.addEventListener('click', (event)=> {
            const target = event.target;
            
            if (target.classList.contains("hole")){     
                countClick.textContent = Number(countClick.textContent) +1; 

                if (target.classList.contains( 'hole_has-goblin' )){
                    caught.textContent = Number(caught.textContent) +1;                                     
                    target.classList.add("boom");
                    setTimeout( ()=> {
                        target.classList.remove("boom");
                    },1000);
                    
    
                }  else {
                    miss.textContent = Number(miss.textContent) +1;
                }                    
            } 
            if (miss.textContent>5) stopGame()

        })
       
         
        // Удаление игры
        const stopGame = () => {
            holeGame.remove() ; 
            this.gameOver() ;
        
            console.log('Игра остановлена')}

        // Реакция кнопки btnStop на клик 
        btnStop.addEventListener('click', stopGame)

    }

}






    




