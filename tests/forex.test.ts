const PipF=require('../src/middleware/pipFunction');
const SwapF=require('../src/middleware/swapFunction');

describe('ForexFunctionsTest',()=>{
    it('Testing PipFunction Buying',async()=>{
        let Pip=PipF({"Opening":1.36118,"Closure":1.36127},true,1)

        expect(Pip.PipQtd).toBe(-0.8999999999992347)
        expect(Pip.PipPrice).toBe(10)
        expect(Pip.Profit).toBe(-8.999999999992347)
    })
    it('Testing PipFunction selling',async()=>{
        let Pip=PipF({"Opening":1.36118,"Closure":1.36127},false,1)

        expect(Pip.PipQtd).toBe(0.8999999999992347)
        expect(Pip.PipPrice).toBe(10)
        expect(Pip.Profit).toBe(8.999999999992347)
    })
    it('Testing SwapFunction Short, 1 night',async()=>{
        let Swap=SwapF(7.346081232966275,false,1,0.05,1);

        expect(Swap).toBe(0.05);
    })
    it('Testing SwapFunction Short, 3 nights',async()=>{
        let Swap=SwapF(7.346081232966275,false,1,0.05,3);

        expect(Swap).toBe(0.15000000000000002);
    })
    it('Testing SwapFunction Long, 1 night',async()=>{
        let Swap=SwapF(7.346081232966275,true,1,0.10,1);

        expect(Swap).toBe(0.07346081232966276);
    })
    it('Testing SwapFunction Long, 3 nights',async()=>{
        let Swap=SwapF(7.346081232966275,true,1,0.10,3);

        expect(Swap).toBe(0.22038243698898827);
    }) 
})
