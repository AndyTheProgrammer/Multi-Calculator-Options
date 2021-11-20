import axios from "axios"

export const getExchangeRates = async () => {
    try {
        const { status, data } = await axios.get('http://api.exchangeratesapi.io/latest?access_key=42197ecdd09c577e37a6b6b0489e860d')

        const { success, base, rates } = data
        if (success === true) {
            return { success: success, payload: { base, rates } }
        }
    } catch (error) {

    }
}