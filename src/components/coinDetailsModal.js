import React, { useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  paper: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    outline: 'none',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CoinDetailsModal = ({ open, handleClose, coin }) => {
  const classes = useStyles();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <div className={classes.paper}>
        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" className={classes.closeBtn}>
          <CloseIcon />
        </IconButton>
        <div>
          <h2>{coin.pair}</h2>
          <p>Symbol: {coin.symbol}</p>
          {/* Add more information about the coin here */}
        </div>
      </div>
    </Dialog>
  );
};

export default CoinDetailsModal;
