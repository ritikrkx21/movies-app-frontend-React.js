import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { SettingsInputAntennaTwoTone } from '@mui/icons-material';
import {useState, useEffect} from 'react';
import axios from 'axios';
import {img_500,unavailable, unavailableLandscape ,} from '../../config/config.js';
import { ClassNames } from '@emotion/react';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './contentModal.css';
import Carousel from './Carousel/Carousel.js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  borderRadius: 10,
  color: "white",
  bgcolor: '#39445a',
  border: '2px solid #282c34',
  boxShadow: 24,
  p: 4,
};

export default function ContentModal({children, media_type, id, poster_path}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setvideo] = useState();

  const fetchData = async() => {
      const { data } = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setContent(data);
  }

  const fetchVideo = async() => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    console.log(data.results[0].key);
   setvideo(data.results[0].key);
  }
  
   useEffect(()=>{
       fetchData();
       fetchVideo();
   }, [media_type ,id]);

  return (
    <div>
      <div onClick={handleOpen} className = "media" > {children} </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
             {
               content && (
                 
                  <div className="ContentModal">
                  <img
                      alt={content.name || content.title} 
                      className="ContentModal_portrait"
                      src={
                        content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailable
                      }
                    />
                    <img
                      alt={content.name || content.title} 
                      className="ContentModal_landscape"
                      src={
                        content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailable
                      }
                    />
                    <div className="ContentModal_about">
                     <span className="ContentModal_title">
                       {
                         content.name || content.title
                       }
                        (
                         {
                           (
                           content.first_air_date || content.release_date || "-----" 
                           ).substring(0,4)
                         }
                        )
                     </span>
                     {
                       content.tagline && <i className="tagline">{content.tagline}</i>
                     }
                     <span className="ContentModal_discription">
                       {content.overview}
                     </span>

                     <div>
                       <Carousel media_type={media_type} id={id} />
                     </div>

                     <Button
                      variant="contained"
                      startIcon={<YouTubeIcon />}
                      color="error"
                      target="__blank"
                      href={`https://www.youtube.com/watch?v=${video}`}
                     >
                     Watch the trailer
                     </Button>
                    </div>
                  </div>
               )
             }
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
