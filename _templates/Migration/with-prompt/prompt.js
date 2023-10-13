// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What do you want to name this migration?',
    initial: 'migration'
  },
  {
    type: 'input',
    name: 'number',
    message: 'What number is this migration?',
    initial: '0'
  }
]
