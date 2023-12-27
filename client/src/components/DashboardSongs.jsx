import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { IoAdd, IoPause, IoPlay, IoTrash } from "react-icons/io5"
import { BsXCircleFill } from 'react-icons/bs';
import { useState } from 'react'
import { useStateValue } from '../context/StateProvider';
import { getAllSongs } from '../api'
import { actionType } from '../context/reducer'
import SongCard from './SongCard';


const DashboardSongs = () => {
  const [songFilter, setSongFilter] = useState("")
  const [{ allSongs, dispatch }] = useStateValue();
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then(data => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.songs,
        })
      })
    }
  }, [])

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="w-full flex justify-center items-center gap-20">
        <NavLink to={"/dashboard/newSong"} className="flex items-center justify-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-500 hover:shadow-md cursor-pointer">
          <IoAdd />
        </NavLink>

      </div>

      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold text-teal-400">
            <span>Number of songs: </span>
            {allSongs?.length}
          </p>
        </div>
        <SongContainer id="songContainer" data={allSongs} />
      </div>
    </div>
  )
}

export const SongContainer = ({ data }) => {
  return (
    <div className="w-full flex flex-wrap gap-3 items-center justify-evenly">
      {data && data.map((song, i) =>
        <SongCard id="songCard" key={song._id} data={song} index={i} type="song" />
      )}
    </div>
  )
}
export default DashboardSongs