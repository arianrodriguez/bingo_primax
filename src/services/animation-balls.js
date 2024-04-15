const range_letters = {
    "B": [1, 15],
    "I": [16, 30],
    "N": [31, 45],
    "G": [46, 60],
    "O": [61, 75]
};

const numbers_registered = {}

const animation_numbers_random = () => {
    const number = Math.floor(Math.random() * 75) + 1;
    return number
}

const generate_ball = () => {
    while(1) {
        let number = Math.floor(Math.random() * 75) + 1;

        if(Object.keys(numbers_registered).length === 5) return

        if(!numbers_registered[number]) {
            numbers_registered[number] = 1;
            return number;
        }
        console.log(numbers_registered)
    }
}

const clear_numbers_registered = () => {
    console.log('Numeros', numbers_registered);
    Object.keys(numbers_registered).forEach(i => delete numbers_registered[i]);
    console.log('Numeros reseteados', numbers_registered)
}

export {
    generate_ball,
    animation_numbers_random,
    clear_numbers_registered,
    range_letters,
}