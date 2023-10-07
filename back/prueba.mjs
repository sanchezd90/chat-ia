import cohere from 'cohere-ai'

cohere.init("er1U1RuIL9jyI9xRachJOdkPGLHJekppfFaHdHiC")

const response = await cohere.generate({
    model: "command",
    prompt: "Hello there",
    max_tokens: 300,
    temperature: 0.9,
    k: 0,
    stop_sequences: [],
    return_likelihoods: 'NONE'
})
const cohereMsg = response.body.generations[0].text
console.log(cohereMsg);