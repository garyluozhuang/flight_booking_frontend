import React, {createContext, useContext, useState} from 'react';


const FlightContext = createContext<any>("");

type Props = {
    children: React.ReactNode
}

export function FlightProvider({children}: Props) {
    const [isOneWay, setIsOneWay] = useState<boolean>(false)
    const [departureDate, setDepartureDate] = useState<Date>()
    const [returnDate, setReturnDate] = useState<Date>()
    const [departureRealTime, setDepartureRealTime] = useState([0, 48]);
    const [departure, setDeparture] = useState<number[]>([0, 48])
    const [returnRealTime, setReturnRealTime] = useState([0, 48]);
    const [returnTime, setReturnTime] = useState<number[]>([0, 48])
    const [durationRealTime, setDurationRealTime] = useState([1.5, 11.5])
    const [duration, setDuration] = useState<number[]>([1.5, 11.5])
    const [priceRange, setPriceRange] = useState<number[]>([10, 10000])
    const [from, setFrom] = useState<string>("")
    const [to, setTo] = useState<string>("")
    const [sortValue, setSortValue] = useState<string>("")
    return (
        <FlightContext.Provider value={{
            isOneWay,
            setIsOneWay,
            departureDate,
            setDepartureDate,
            returnDate,
            setReturnDate,
            departureRealTime,
            setDepartureRealTime,
            departure,
            setDeparture,
            returnRealTime,
            setReturnRealTime,
            returnTime,
            setReturnTime,
            durationRealTime,
            setDurationRealTime,
            duration,
            setDuration,
            from,
            setFrom,
            to,
            setTo,
            sortValue,
            setSortValue,
            priceRange,
            setPriceRange
        }}>
            {children}
        </FlightContext.Provider>
    )
}


export const useFlightContext = () => useContext(FlightContext)