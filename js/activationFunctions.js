class Sigmoid
{
    f(x)
    {
        return 1/(1+Math.exp(-x));
    }

    dF(x)
    {
        return this.f(x)*(1-this.f(x));
    }
}
