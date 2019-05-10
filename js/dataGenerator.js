class DataGenerator
{
    constructor()
    {
        /*this.m=Math.random()*10-5;
        this.b=Math.random()*10-5;
        this.m1=Math.random()*10-5;
        this.b1=Math.random()*10-5;
        //new Line().draw(15,30);
        //new Line().draw(this.m1,this.b1);*/
        this.m=0;
        this.b=0;
        this.m1=10000000000000;
        this.b1=0;

    }

    generateExpected(x,y)
    {
        //y=mx+b-> y-mx-b=0

        return (y-this.m*x-this.b>0&&y-this.m1*x-this.b1>0)||(y-this.m*x-this.b<0&&y-this.m1*x-this.b1<0)

    }

    generate(n,lim=10)
    {
        let data={inputs:[],outputs:[]};
        for(let i=0;i<n;i++)
        {
            let ax=[Math.floor(Math.random()*2*lim-lim+0.5),Math.floor(Math.random()*2*lim-lim+0.5)];
            data.inputs.push(ax);
            data.outputs.push(this.generateExpected(ax[0],ax[1]));
        }
        return data;
    }
}


