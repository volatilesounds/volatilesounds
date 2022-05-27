//random noise (audio worklet) processor


class RandomNoiseProcessor extends AudioWorkletProcessor
{
    constructor() {
        // The super constructor call is required.
        super();

        console.log("RandomNoiseProcessor: constructor called.");
    }
    
    process(inputs, outputs, parameters)
    {
        console.log("RandomNoiseProcessor: processing...");

        // const input = inputs[0];
        // const output = outputs[0];
        // for (let channel = 0; channel < input.length; ++channel) {
        //     const inputChannel = input[channel];
        //     const outputChannel = output[channel];
        //     for (let i = 0; i < inputChannel.length; ++i)
        //     {
        //         outputChannel[i] = Math.random() * 2 - 1;
        //     }
        // }

        const output = outputs[0];
        output.forEach(channel=>{
            for(let i=0; i<channel.length; i++)
            {
                channel[i] = Math.random() * 2 - 1;
            }
        });


        return true;
    }
}

registerProcessor('random-noise-processor', RandomNoiseProcessor);