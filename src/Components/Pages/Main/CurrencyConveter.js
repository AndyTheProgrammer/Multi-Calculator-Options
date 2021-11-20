import React, { useState } from 'react'
import { getExchangeRates } from '../../../Services/CurrencyConverterApi'

export default function CurrencyConveter() {
    const [rates, setRates] = useState([])


    React.useEffect(() => {
        const fetchRates = async () => {
            const { success, payload } = await getExchangeRates()
            if (success) {
                const { base, rates } = payload
                console.log(rates)

                const key = Object.keys(rates)
                console.log(key)
                setRates(key)
            }
        }
        fetchRates()


    }, [])
    return (
        <div>
            {rates.map(e => {
                return (
                    <div>
                        {e}
                    </div>
                )
            })}
        </div>
    )
}

