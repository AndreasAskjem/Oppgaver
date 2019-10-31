class Box {
    constructor() {
        this._color = '#' + Math.floor(Math.random() * 16777215).toString(16);
        this._x = Math.floor(Math.random() * 600);
        this._y = Math.floor(Math.random() * 400);
        this._width = 100 + Math.floor(Math.random() * 500);
        this._height = 100 + Math.floor(Math.random() * 300);
    }
    getBoxData(){
        return({
            x: this._x,
            y: this._y,
            width: this._width,
            height: this._height,
            color: this._color
        })
    }
}



class BoxSet{
    constructor(){
        let length = Math.ceil(Math.random()*10);
        this._boxes = []
        for(let i=0; i<length; i++){
            this._boxes.push(new Box());
        }
    }

    getBoxes(){
        return(this._boxes);
    }

    remove(index){
        this._boxes.splice(index, 1);
    }
}


class BoxView {
    constructor(box) {
        this._box = box;
    }

    getHtml(index) {
        let data = this._box.getBoxData();
        //console.log(data);
        return(`
            <rect 
                width="${data.width}" 
                height="${data.height}" 
                x="${data.x}" 
                y="${data.y}" 
                fill="${data.color}"
                onclick="removeBox(${index})"> 
            </rect>`
        );
    }
}


class BoxSetView{
    constructor(){
        this._svg = document.getElementsByTagName('svg')[0];
    }

    show(){
        this._boxViews = [];
        let boxes = boxSet.getBoxes();
        for(let i in boxes){
            this._boxViews.push(new BoxView(boxes[i]));
        }

        let boxesHtml = '';
        for(let i in this._boxViews){
            
            boxesHtml += this._boxViews[i].getHtml(i);
        }
        this._svg.innerHTML = boxesHtml;
    }
}



let boxSet = new BoxSet();
let boxSetView = new BoxSetView(boxSet)
boxSetView.show();

function removeBox(index){
    boxSet.remove(index);
    boxSetView.show();
}