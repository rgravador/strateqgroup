
/** answer for question #6 */
const removeDuplicates = (arr) => {
    return [...new Set(arr)];
}
let result = removeDuplicates([1, 2, 2, 2, 3, 3, 3, 4, 4, 5])
console.log("🚀 ~ file: question_6.js:8 ~ result:", result)

/** answer for question 5 */
const AppleOrange = () => {
    for (let i = 0; i <= 20; i++) {
        let answer = []
        if (i % 3 == 0) answer.push("Apple")
        if (i % 5 == 0) answer.push("Orange")
        if(answer.length > 0) {
            console.log(answer.concat([i]).join(" "))
        }else{
            console.log(`Looping ... number ${i}`)
        }

    }
}
AppleOrange();