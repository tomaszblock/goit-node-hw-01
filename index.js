const {program: Command} = require('Commander')

program.option(
    "-f, --file [string]", "test", "result.txt"
)

const {file} = program.parse(process.argv).opts();

console.log(file)