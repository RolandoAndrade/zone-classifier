let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

function drawData(data)
{
    for(let i=0;i<data.inputs.length;i++)
    {
        if(data.outputs[i])
            new Circle(data.inputs[i][0]*25+250,data.inputs[i][1]*25*-1+250,1.5,"#616aff").draw();
        else
            new Circle(data.inputs[i][0]*25+250,data.inputs[i][1]*25*-1+250,1.5,"#ff566f").draw();
    }
    new Line().axis(250);
}

let dataGenerator=new DataGenerator();
let data;

function generate()
{
    data=dataGenerator.generate(100);
    drawData(data);
}

generate();

let error = document.getElementById('error');
let nn=new NeuronalNetwork([4,2,1],0.5);

function learn()
{

    let loss = 0;
    for(let j=0;j<data.inputs.length;j++)
        loss+=Math.abs(nn.learn([[data.inputs[j][0]],[data.inputs[j][1]]],data.outputs[j]));
    error.innerHTML=""+loss/100;
}

let rect = canvas.getBoundingClientRect();

canvas.onmousedown = function (event)
{
    let x=(event.clientX - rect.left);
    let y=(event.clientY - rect.top);
    let ex = x/25-10;
    let ey = -(y/25-10);
    console.log(ex,ey);
    let out = nn.getOutput([[ex],[ey]]);
    console.log(out);
    if(Math.round(out)===1)
        new Circle(x,y,1.5,"#616aff").draw();
    else
        new Circle(x,y,1.5,"#ff566f").draw();
};

window.setInterval(learn,300);




