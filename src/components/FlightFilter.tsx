import {Slider} from "@/components/ui/slider.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useEffect} from "react";
import {convertValueToTime} from "@/lib/ConvertValueToTime.ts";


import {convertValueToDuration} from "@/lib/ConvertValueToTime.ts";
import {useFlightContext} from "@/context/FlightContext.tsx";


export const FlightFilter = () => {
    const {
        isOneWay,
        departureRealTime,
        setDepartureRealTime,
        durationRealTime,
        setDurationRealTime,
        returnRealTime,
        setReturnRealTime,
        setDuration,
        setReturnTime,
        setDeparture,
        setSortValue,
        priceRange,
        setPriceRange
    } = useFlightContext()


    const handleDepartureChange = (newValues: number[]) => {
        setDepartureRealTime(newValues);
    };

    const handleArrivalChange = (newValues: number[]) => {
        setReturnRealTime(newValues);
    }

    const handleRealTimeDurationChange = (newValues: number[]) => {
        setDurationRealTime(newValues);
    };
    const handleDurationChange = (newValues: number[]) => {
        const newDuration = [convertValueToDuration(newValues[0]), convertValueToDuration(newValues[1])];
        setDuration(newDuration);
    }

    const handleDepartureTimeChange = (newValues: number[]) => {
        const newValue = [convertValueToTime(newValues[0]), convertValueToTime(newValues[1])];
        
        setDeparture(newValue);
    }

    const handlePriceRangeChange = (newValues: number[]) => {
        setPriceRange(newValues);
    }

    // if I don't do this on the initial load the flights are empty because they are not converted yet
    useEffect(() => {
        const newDuration = [
            convertValueToDuration(durationRealTime[0]),
            convertValueToDuration(durationRealTime[1]),
        ];

        const newValue = [convertValueToTime(departureRealTime[0]), convertValueToTime(departureRealTime[1])];
        setDeparture(newValue);
        setDuration(newDuration);
    }, []);

    return (<>
        {/* this is mobile filter*/}
        {/* <FilterSidebar/> */}
        {/* this is desktop filter*/}
        <aside className="w-[22%] sm:hidden">
            <Select onValueChange={setSortValue}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By"/>
                </SelectTrigger>
                <SelectContent className="bg-white">
                    <SelectItem className="hover:bg-gray-200" value="cheapest">Cheapest first</SelectItem>
                    <SelectItem className="hover:bg-gray-200" value="fastest">Fastest first</SelectItem>
                </SelectContent>
            </Select>

            <div className="mt-8">
                <h3 className="font-bold mb-4 text-xl">Times</h3>
                <h5 className="font-bold">Outbound Depature Time</h5>
                <p className="text-xs">{convertValueToTime(departureRealTime[0])} - {convertValueToTime(departureRealTime[1])}</p>
                <Slider
                    defaultValue={departureRealTime}
                    min={0}
                    max={48}
                    step={1}
                    onValueChange={handleDepartureChange}
                    onValueCommit={handleDepartureTimeChange}
                    minStepsBetweenThumbs={1}
                    className="w-[250px] h-10"
                />
                <h5 className="font-bold">Outbound Arrival Time</h5>
                <p className="text-xs">{convertValueToTime(departureRealTime[0])} - {convertValueToTime(departureRealTime[1])}</p>
                <Slider
                    defaultValue={departureRealTime}
                    min={0}
                    max={48}
                    step={1}
                    onValueChange={handleDepartureChange}
                    onValueCommit={handleDepartureTimeChange}
                    minStepsBetweenThumbs={1}
                    className="w-[250px] h-10"
                />
                {!isOneWay && <><h5 className="font-bold">Return Depature Time</h5><span
                    className="text-xs">{convertValueToTime(returnRealTime[0])} - {convertValueToTime(returnRealTime[1])}</span>
                    <Slider
                        defaultValue={returnRealTime}
                        min={0}
                        max={48}
                        step={1}
                        onValueChange={handleArrivalChange}
                        onValueCommit={setReturnTime}
                        minStepsBetweenThumbs={1}
                        className="w-[250px] h-10"/></>}
                {!isOneWay && <><h5 className="font-bold">Return Arrival Time</h5><span
                    className="text-xs">{convertValueToTime(returnRealTime[0])} - {convertValueToTime(returnRealTime[1])}</span>
                    <Slider
                        defaultValue={returnRealTime}
                        min={0}
                        max={48}
                        step={1}
                        onValueChange={handleArrivalChange}
                        onValueCommit={setReturnTime}
                        minStepsBetweenThumbs={1}
                        className="w-[250px] h-10"/></>}
            </div>

            <div className="mt-10">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Stops"/>
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem className="hover:bg-gray-200" value="Any number of stops">Any number of stops</SelectItem>
                        <SelectItem className="hover:bg-gray-200" value="Nonestop only">Nonestop only</SelectItem>
                        <SelectItem className="hover:bg-gray-200" value="1 stop or fewer">1 stop or fewer</SelectItem>
                        <SelectItem className="hover:bg-gray-200" value="2 stops or fewer">2 stops or fewer</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            

            <div className="mt-10">
                <h3 className="font-bold mb-1 text-xl">Price Range</h3>
                <span className="text-xs">${priceRange[0]} - ${priceRange[1]}</span>
                <Slider
                    defaultValue={priceRange}
                    min={10}
                    max={10000}
                    step={50}
                    onValueChange={handlePriceRangeChange}
                    className="w-[250px] h-10"
                />
            </div>

            <div className="mt-10">
                <h3 className="font-bold mb-1 text-xl">Flight Duration</h3>
                <span className="text-xs">{durationRealTime[0]} hours - {durationRealTime[1]} hours</span>
                <Slider
                    defaultValue={durationRealTime}
                    min={1.5}
                    max={11.5}
                    step={0.5}
                    onValueChange={handleRealTimeDurationChange}
                    onValueCommit={handleDurationChange}
                    className="w-[250px] h-10"
                />
            </div>
        </aside>
    </>);
};
