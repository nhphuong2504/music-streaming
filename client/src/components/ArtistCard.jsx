import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { IoTrash } from 'react-icons/io5';
import { deleteAlbumById, deleteArtistById, deleteSongById, getAllArtists, getAllSongs, getAllAlbums } from '../api';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io5";
import { useLocation } from 'react-router-dom';

const SongCard = ({ data, index, type }) => {
    const [isDelete, setisDelete] = useState(false)
    const location = useLocation()
    const [{ allArtists, allAlbums, allSongs, isSongPlaying, songIndex }, dispatch] = useStateValue();
    const deleteObject = (data) => {
        if (type == "song") {
            deleteSongById(data._id).then((res) => {
                if (res.data) {

                    getAllSongs().then((data) => {
                        dispatch({
                            type: actionType.SET_ALL_SONGS,
                            allSongs: data.song
                        })
                    })
                }
            });
        }

        if (type == "artist") {
            deleteArtistById(data._id).then((res) => {
                if (res.data) {
                    getAllArtists().then((data) => {
                        dispatch({
                            type: actionType.SET_ALL_ARTISTS,
                            allArtists: data.artist
                        })
                    })

                }
            });
        }

        if (type == "album") {
            deleteAlbumById(data._id).then((res) => {
                if (res.data) {
                    getAllAlbums().then((data) => {
                        dispatch({
                            type: actionType.SET_ALL_ALBUMS,
                            allAlbums: data.album
                        })
                    })

                }
            });
        }

    }

    const addtoContext = () => {
        if (!isSongPlaying) {
            dispatch({
                type: actionType.SET_ISSONG_PLAYING,
                isSongPlaying: true,
            })
        }

        if (songIndex !== index) {
            dispatch({
                type: actionType.SET_SONG_INDEX,
                songIndex: index,
            })
        }
    }

    return (
        <motion.div id="artistCard" className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center" onClick={type === "song" && addtoContext}>
            <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
                <motion.img whileHover={{ scale: 1.05 }} src={data.imageURL} className="w-full h-full rounded-lg object-cover" />
            </div>

            <p className="text-base text-headingColor text-center font-semibold my-2">
                {data.name.length > 25 ? `${data.name.slice(0, 25)}..` : data.name}
                {data.artist && (
                    <span className="block text-sm text-gray-400 my-1 center">{data.artist}</span>)}

                <div className="flex items-center gap-10 p-3">
                    <a href={`http://${data.instagram}`} target="_blank">
                        <motion.i whileTap={{ scale: 0.75 }}>
                            <IoLogoInstagram className="text-gray-500 hover:text-headingColor text-xl" />
                        </motion.i>
                    </a>

                    <a href={`http://${data.twitter}`} target="_blank">
                        <motion.i whileTap={{ scale: 0.75 }}>
                            <IoLogoTwitter className="text-gray-500 hover:text-headingColor text-xl" />
                        </motion.i>
                    </a>
                </div>
            </p>
            <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
                <motion.i whileTap={{ scale: 0.75 }} className="text-base text-red-400 drop-shadow-md hover:text-red-600" onClick={() => setisDelete(true)}>
                    {location.pathname === "/dashboard/artists" ? <IoTrash /> : null}
                </motion.i>
            </div>

            {isDelete && (<motion.div className="absolute inset-0 backdrop-blur-md bg-cardOverlay flex items-center flex-col justify-center px-4 py-2 gap-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
                <p className="text-xl text-headingColor font-semibold text-center"> Do you want to delete it?</p>
                <div className="flex items-center gap-4">
                    <motion.button className="px-2 py-1 text-sm bg-green-500 hover:bg-green-600 cursor-pointer" whileTap={{ scale: 0.75 }} onClick={() => deleteObject(data)}>Yes</motion.button>
                    <motion.button className="px-2 py-1 text-sm bg-red-400 hover:bg-red-600 cursor-pointer" onClick={() => setisDelete(false)} whileTap={{ scale: 0.75 }}>No</motion.button>
                </div>
            </motion.div>)}
        </motion.div>

    )
};

export default SongCard