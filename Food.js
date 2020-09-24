class Food{
    constructor(){   
        this.foodStock = 0;
        this.lastFed;
        this.image = loadImage("Milk.png");
    }

    getFoodStock(){
        return this.foodStock;
    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
    }

    bedroom(){
        imageMode(CENTER);
        background(bedroom,550,600);
    }

    washroom(){
        imageMode(CENTER);
        background(washroom,550,500)
    }

    garden(){
        imageMode(CENTER);
        background(garden,550,500);
    }

    display(){
        imageMode(CENTER);
        var x = 80,y = 100;
        if(this.foodStock!==0){
            for(var i = 0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50
                }
                    image(this.image,x,y,50,50);
                    x=x+30;
            }
        }
    }

}
        



        
   
