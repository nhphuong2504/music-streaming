import React, { useEffect, useState } from 'react'
import { getAllSongs } from '../api';
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';
import Header from "./Header"
import SongCard from './SongCard';
import Filter from "./Filter";
import { motion } from 'framer-motion';

const Home = () => {
  const [filteredSongs, setFilteredSongs] = useState(null);

  const [{ allSongs, artistFilter, albumFilter, languageFilter, filterTerm }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allSongs) {
      getAllSongs().then(data => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.song,
        })
      })
    }

  }, [])

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.artist === artistFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [artistFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter((data) => data.album === albumFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [albumFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.language === languageFilter);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [languageFilter]);

  useEffect(() => {
    const filtered = allSongs?.filter(
      (data) => data.category.toLowerCase() === filterTerm);
    if (filtered) {
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(null);
    }
  }, [filterTerm]);

  return (
    <div id="home" className='w-full h-auto flex flex-col items-center justify-center'>
      <Header />

      <div className="relative w-full my-4 p-4 py-16 border border-gray-300 rounded-md">
        <Filter setFilteredSongs={setFilteredSongs} />

        <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
      </div>
    </div>

  )
}

export const SongContainer = ({ data }) => {

  return (
    <div className="w-full h-auto flex items-center justify-evenly gap-4 flex-wrap p-4">
      {data && data.map((song, i) =>
        <motion.div key={data._id} whileTap={{ scale: 0.8 }} initial={{ opacity: 0, translateX: -50 }} animate={{ opacity: 1, translateX: 0 }} transition={{ duration: 0.3, delay: i * 0.1 }}>
          <SongCard  key={song._id} data={song} index={i} type="song" />
        </motion.div>
      )}
    </div>
  )
}
export default Home