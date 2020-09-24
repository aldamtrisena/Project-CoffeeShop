const formatting = value => {
    let num = value.toString().split('').reverse().join('')
    let angka = ''
    for(let i = 0; i < num.length; i++){
        if(i > 0 && i % 3 === 0){
            angka += '.' + num[i]
        }
        else{
            angka += num[i]
        }
    }
    angka = angka.split('').reverse().join('')
    let formatted = `Rp. ${angka}`
    return formatted
}

// console.log(formatting(123456789))

module.exports = formatting