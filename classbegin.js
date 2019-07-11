class Teacher{
    constructor(){
        this.subscribers = new Map();

    }

    register(student,listener){
        this.subscribers.set(student,listener);
    }
    deliver(e){
        this.subscribers.forEach((listener) => {
            listener(e);
        });
    }

    Startclass(){
        setTimeout(()=>{
            this.deliver("Questions:XXX");
        }
        ,1500)
    }

    feedback(){
        let num = Math.floor(Math.random() * 10 + 1);
        if(num >=5){
            document.innerHTML("Feedback:good");
        }
        else if(num < 5 && num <= 3){
            document.innerHTML("Feedback:well");
        }
        else{
            document.innerHTML("Feedback:bad");
        }
    }
}


    class Students{
        constructor(name){
            this.name = name;
        }

        do(e){
            document.innerHTML(`answered by ${name},${e}`);
        }

    }


var studenta = new Students("student1");
var studentb = new Students("student2");

var teacher1 = new Teacher();
teacher1.register(studenta,1);
teacher1.register(studentb,2);
    //const btn = document.getElementsByClassName("button");

    //btn.addEventListener("click", Begins());
teacher1.Startclass();
    