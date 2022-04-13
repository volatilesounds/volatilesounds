//random noise (audio worklet) processor


class RandomNoiseProcessor extends AudioWorkletProcessor
{
    process(inputs, outputs, parameters)
    {
        const output = ouputs[0];
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