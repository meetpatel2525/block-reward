// static function for genrate diffrent otp

export const generateOTP = () => {

    let otp = ""
    for (let i = 0; i <= 3; i++) {
        const randVal = Math.round(Math.random() * 9)
        otp = otp + randVal
        console.log(otp);
    }
    return otp
}