//https://www.loginradius.com/blog/engineering/guest-post/http-streaming-with-nodejs-and-fetch-api/

fetch('http://localhost:3000/measurements.json')
    .then(async (response) => {
        let measurementsReceived = 0;
        for await (const measurement of parseJsonStream(response.body)) {
            measurementsReceived++;
            // To prevent the console from flooding we only show 1 in every 100 measurements
            if (measurementsReceived % 100 === 0) {
                console.log(`measurement with id {${measurement.id}} at time ${measurement.timestamp} has value [${measurement.value}]`);
            }
        }
    });

async function *parseJsonStream(readableStream) {
    for await (const line of readLines(readableStream.getReader())) {
        const trimmedLine = line.trim().replace(/,$/, '');

        if (trimmedLine !== '[' && trimmedLine !== ']') {
            yield JSON.parse(trimmedLine);
        }
    }
}

async function *readLines(reader) {
    const textDecoder = new TextDecoder();
    let partOfLine = '';
    for await (const chunk of readChunks(reader)) {
        const chunkText = textDecoder.decode(chunk);
        const chunkLines = chunkText.split('\n');
        if (chunkLines.length === 1) {
            partOfLine += chunkLines[0];
        } else if (chunkLines.length > 1) {
            yield partOfLine + chunkLines[0];
            for (let i=1; i < chunkLines.length - 1; i++) {
                yield chunkLines[i];
            }
            partOfLine = chunkLines[chunkLines.length - 1];
        }
    }
}

function readChunks(reader) {
    return {
        async* [Symbol.asyncIterator]() {
            let readResult = await reader.read();
            while (!readResult.done) {
                yield readResult.value;
                readResult = await reader.read();
            }
        },
    };
}