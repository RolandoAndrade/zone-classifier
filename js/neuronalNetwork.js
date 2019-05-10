class Layer
{
    constructor(numberOfNeurons, numberOfInputs, activationFunction = new Sigmoid())
    {
        this.neuronsWeights=[];
        this.neuronsBias=[];
        this.lastInput = [];
        for(let i=0;i<numberOfNeurons;i++)
        {
            let weights=[];
            for(let j=0;j<numberOfInputs;j++)
            {
                weights.push(Math.random()*2-1);
            }
            this.neuronsWeights.push(weights);
            this.neuronsBias.push([Math.random()*2-1]);
        }
        this.activationFunction=activationFunction;
    }

    getZ(input = this.lastInput)
    {
        let Wx=math.multiply(this.neuronsWeights,input);
        return math.add(Wx,this.neuronsBias);
    }

    dActivate()
    {
        let z=this.getZ();
        let Gx=[];
        for(let i=0;i<z.length;i++)
        {
            Gx.push([this.activationFunction.dF(z[i])]);
        }
        return Gx;
    }

    getOutput(input)
    {
        this.lastInput = input;
        let z=this.getZ(input);
        let Gx=[];
        for(let i=0;i<z.length;i++)
        {
            Gx.push([this.activationFunction.f(z[i])]);
        }
        return Gx;
    }
}


class NeuronalNetwork
{
    constructor(topology, learningRate = 0.1)
    {
        this.layers = [];
        let numberOfInputs = 2;
        for(let i=0;i<topology.length;i++)
        {
            this.layers.push(new Layer(topology[i],numberOfInputs));
            numberOfInputs=topology[i];
        }
        this.learningRate = learningRate;
    }

    getOutput(input)
    {
        for(let i=0;i<this.layers.length;i++)
        {
            input=this.layers[i].getOutput(input);
        }
        return input[0][0];
    }

    learn(input, expected)
    {
        let output = this.getOutput(input);
        let loss = output - expected;
        let error = [[loss*this.learningRate]];
        let delta,gradient;
        for(let i=this.layers.length-1;i>=0;i--)
        {
            //console.log("error", error);
            let dF = this.layers[i].dActivate();
            //console.log("derivada", dF);
            delta = math.transpose(math.dotMultiply(error,dF));
            //console.log("delta", delta);
            //console.log("weights", this.layers[i].neuronsWeights);
            gradient = math.transpose(math.multiply(this.layers[i].lastInput, delta));
            //console.log("gradiente", gradient);
            this.layers[i].neuronsWeights=math.subtract(this.layers[i].neuronsWeights,gradient);
            this.layers[i].neuronsBias=math.subtract(this.layers[i].neuronsBias,math.transpose(delta));
            error = math.transpose(math.multiply(delta, this.layers[i].neuronsWeights));

        }
        return loss;
    }
}