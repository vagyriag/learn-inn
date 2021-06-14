import {
  ClickAwayListener,
  createStyles,
  Fab,
  Grow,
  makeStyles,
  MenuList,
  Popper,
  Theme,
  Paper,
  Grid,
  Button,

} from "@material-ui/core";
import Video from "ractive-player";
import ReactPlayer from "react-player";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import MenuItem from "@material-ui/core/MenuItem";
import { CreateQuestion } from "../../components/CreateQuestion/CreateQuestion";
import Typography from "@material-ui/core/Typography";
import { EndVideo } from "../../components/CreateQuestion/EndVideo";

interface VideoEditProps {}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    video: {
      marginTop: "2rem",
      marginLeft: "2rem",
    },

    grid: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
    },

    paper: {
      marginRight: theme.spacing(2),
    },

    fab: {
      display: "flex",
      justifyItems: "flex-start",
      marginTop: "30em",
    },

    menuFab: {
      borderRadius: 30,
      color: "black",
    },

    menuPaper: {
      marginBottom: "1rem",
      marginTop: "1rem",
      background:
        "radial-gradient(103.25% 3909.97% at 1.85% 25.32%, rgba(87, 123, 249, 0.42) 0%, rgba(87, 123, 249, 0.06) 100%)",
      backdropFilter: "blur(120px)",
      borderRadius: 5,
    },

    buttonBlue: {
      display: "flex",
      justifyContent : "flex-start",
      marginLeft : "67em",
      marginTop : "1em"
      
    },

    h1: {
      
        fontSize: "1.5rem",
        marginBottom : ".7em"

    },

    floating: {
      marginTop: "9em",
      marginLeft: "2em",
    },
  })
);

export const VideoEdit: React.FC<VideoEditProps> = ({}) => {
  const classes = useStyle();

  const [isModalVisible, setIsModalVisible] = useState(false);
  

  const toggleModal = () => {
    setIsModalVisible((wasModalVisible) => !wasModalVisible);
  };


  const [isEndVideolVisible, setEndVideoVisible] = useState(false);
  

  const toggleEndVideo = () => {
    setEndVideoVisible((wasEndVideoVisible) => !wasEndVideoVisible);
  };

  
  
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Grid container className={classes.grid}>
      <Grid item className={classes.video} xs={10}>
        <Typography
        variant="h1" color="initial" className={classes.h1}
        >
          ¡Crea interacciones en el video para tus estudiantes!
        </Typography>
        <ReactPlayer
         /*  url="https://www.youtube.com/watch?v=t7gRyIENXEU&t" */
           url ='/videos/video1.mp4' 
          width="100%"
          height="85%"
          controls={true}
          loop={true}
        ></ReactPlayer>
        <CreateQuestion
          isModalVisible={isModalVisible}
          onBackDropClick={toggleModal}
        />

        <EndVideo
          isEndVideoVisible={isEndVideolVisible}
          onPopUpDropClick={toggleEndVideo}>

        </EndVideo>

        <Button
        className = {classes.buttonBlue}
        variant="contained"
        color="primary"
        disableElevation
        onClick = {toggleEndVideo}> 
        Finalizar Video
        </Button>
      </Grid>

      <Grid item xs={1} className={classes.floating}>
        <Fab
          color="primary"
          aria-label="add"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <AddIcon />
        </Fab>

        <Paper className={classes.paper}></Paper>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper className={classes.menuPaper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={toggleModal} className={classes.menuFab}>
                      Crear Pregunta
                    </MenuItem>
                    {/* <MenuItem onClick={togglePoll} className={classes.menuFab}>
                      Crear Encuesta
                    </MenuItem> */}
                  </MenuList>
                  
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
};
