// 1.	Создать классы для Renderer, Transformer и Provider(Fetcher)

// Renderer – получает данные и отображает их в DOM
// Renderer – Базовый класс он умеет отрисовывать футер и хедер. 
// От него наследуются три класса 5 дней погода, Исторические данные и погода на сегодня

// Transformer – преобразовывает данные из ответа сервера и отдает их Renderer
// Transformer – Базовый класс реализует метод получения строки и 
// преобразования её в json.

// Fetcher – получает данные со стороные сервера
// Fetcher – Базовый класс реализует получение данных, хранит базовый url

function Renderer(dataObject) {
    this.setDataObject = function(newDataObject) {
        dataObject = newDataObject;
    }
}

function Transformer() {
    var responseObject;
    this.setResponseObject = function(stringToParse) {
        responseObject = JSON.parse(stringToParse);
    }
}

function Fetcher(url) {
    this.fetch = fetch(urlToFetch);
    var responseText = 'TODO';
    this.getResponseText = function() {
        return responseText;
    }


}


// function Vehicle(speed) {
//     this.speed = speed;
// }

// function Bike(wheelsCount = 2) {
    
//     this.wheelsCount = wheelsCount;
// }

// Bike.prototype = Object.create(Vehicle.prototype); 
// Bike.prototype.constructor = Bike;

// function Car(wheelsCount, doorsCount) {
//     this.wheelsCount = wheelsCount;
//     this.doorsCount = doorsCount;
// }

// function MonsterTruck(wheelsSize) {
//     this.wheelsSize = wheelsSize;
// }
