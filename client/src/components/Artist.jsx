import React, { useEffect } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllArtists } from '../api';
import { actionType } from '../context/reducer';
import ArtistCard from './ArtistCard';
import Header from "./Header"


const DashboardArtists = () => {
    const [{ allArtists, dispatch }] = useStateValue();
    useEffect(() => {
        if (!allArtists) {
            getAllArtists().then(data => {
                dispatch({
                    type: actionType.SET_ALL_ARTISTS,
                    allArtists: data.artist,
                })
            })
        }
    }, [])

    return (
        <div className="w-full p-4 flex items-center justify-center flex-col">
            <Header />
            <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
                <ArtistContainer data={allArtists} />

            </div>
        </div>
    )
}

export const ArtistContainer = ({ data }) => {
    return (
        <div id="artistContainer" className="w-full flex flex-wrap gap-3 items-center justify-evenly">
            {data && data.map((artist, i) =>
                <ArtistCard id={artist._id} key={artist._id} data={artist} index={i} type="artist" />

            )}
        </div>

    )
}

export default DashboardArtists