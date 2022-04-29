import {FaSmileWink, FaFilm} from "react-icons/fa"
import {MdEmojiNature} from "react-icons/md"

export const categories = [
    {
        id:1,
        name: "Nature",
        iconSrc: <MdEmojiNature fontSize = {30} />
    },
    {
        id:2,
        name: "Movies",
        iconSrc: <FaFilm fontSize = {30} />
    },
    {
        id:3,
        name: "Funny",
        iconSrc: <FaSmileWink fontSize = {30} />
    },
]