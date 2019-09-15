export const dice = [[5], [1, 9], [1, 5, 9], [1, 3, 7, 9], [1, 3, 5, 7, 9], [1, 3, 4, 6, 7, 9]];
export const diceList =
    [
        {
            label: 'die1',
            position: 0,
            value: 0,
            state: 'available',
            color: 'white'
        },
        {
            label: 'die2',
            position: 0,
            value: 0,
            state: 'available',
            color: 'white'
        },
        {
            label: 'die3',
            position: 0,
            value: 0,
            state: 'available',
            color: 'white'
        },
        {
            label: 'die4',
            position: 0,
            value: 0,
            state: 'available',
            color: 'white'
        },
        {
            label: 'die5',
            position: 0,
            value: 0,
            state: 'available',
            color: 'white'
        },
        {
            label: 'die6',
            position: 0,
            value: 0,
            state: 'available',
            color: 'white'
        }
    ]

/**
 * returns a randome number between 1 and 6 corresponding the faces of a dice
 * @param {int} num 
 */
export function roll() {
    let rNumber = Math.floor(Math.random() * 6) + 1;
    return rNumber;
}

export function createDice() {
    diceList.forEach((elem, index) => {
        let num = roll();
        elem.position = index;
        elem.value = num;
    });
    return diceList;
}



/*export function changStatus(pos) {

}
*/

